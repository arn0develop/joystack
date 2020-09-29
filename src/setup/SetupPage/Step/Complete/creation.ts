import {Session} from 'src/login/state'
import {Metadata, Error as GrpcError, StatusCode} from 'grpc-web'
import {createCallCredentials} from 'src/dashboard/state/common'
import {
  CreateRealmRequest,
  Realm
} from '@joystack/protocol/realm'
import {RealmDomainServicePromiseClient, UpsertRealmDomainRequest} from '@joystack/protocol/realm/domain'
import {RealmServicePromiseClient} from '@joystack/protocol/realm'
import {RealmPluginsServicePromiseClient} from '@joystack/protocol/realm/plugins'
import {Plugin, UpdatePluginsRequest} from '@joystack/protocol/realm/plugins'
import {Resource} from '@joystack/protocol/realm/resource'
import config from 'src/config'
import orThrow from 'src/util/orThrow'
import assertNotNull from 'src/util/assertNotNull'

interface Template {
  iconId: number
  typeId: number
  resources: Resource.AsObject[]
}

interface Clients {
  realmClient: RealmServicePromiseClient
  realmDomainClient: RealmDomainServicePromiseClient
  pluginsClient: RealmPluginsServicePromiseClient
}

function createBackendClients(): Clients {
  return {
    realmClient: new RealmServicePromiseClient(config.apiHost),
    realmDomainClient: new RealmDomainServicePromiseClient(config.apiHost),
    pluginsClient: new RealmPluginsServicePromiseClient(config.apiHost)
  }
}

interface Description {
  text: string
  name: string
  domain: string
  capacity: number
}

interface Parameters {
  session: Session
  template: Template
  description: Description
}

export interface Result {
  domainBindError?: DomainBindError
  pluginConfigurationError?: PluginConfigurationError
  realmCreationError?: RealmCreationError
}


export enum PluginConfigurationError {
  INVALID_PLUGIN,
  OTHER
}

function translatePluginConfigurationError(error: GrpcError): PluginConfigurationError {
  switch (error.code) {
  case StatusCode.NOT_FOUND:
    return PluginConfigurationError.INVALID_PLUGIN
  default:
    return PluginConfigurationError.OTHER
  }
}

export enum RealmCreationError {
  DUPLICATE,
  INVALID_REFERENCE,
  OTHER
}

function translateRealmCreationError(error: GrpcError): RealmCreationError {
  switch (error.code) {
  case StatusCode.ALREADY_EXISTS:
    return RealmCreationError.DUPLICATE
  case StatusCode.NOT_FOUND:
    return RealmCreationError.INVALID_REFERENCE
  default:
    return RealmCreationError.OTHER
  }
}

function createNotFoundError(): GrpcError {
  return {
    code: StatusCode.NOT_FOUND,
    message: 'returned realm was null'
  }
}

export enum DomainBindError {
  TAKEN,
  INVALID_STRUCTURE,
  INVALID_DOMAIN_NAME,
  OTHER
}

function translateDomainBindError(error: GrpcError): DomainBindError {
  switch (error.code) {
  case StatusCode.ALREADY_EXISTS:
    return DomainBindError.TAKEN
  case StatusCode.INVALID_ARGUMENT: {
    switch (error.message) {
    case 'domain-name':
      return DomainBindError.INVALID_DOMAIN_NAME
    default:
      return DomainBindError.INVALID_STRUCTURE
    }
  }
  default:
    return DomainBindError.OTHER
  }
}

class RealmCreation {
  private readonly session: Session
  private readonly callCredentials: Metadata
  private readonly template: Template
  private readonly description: Description
  private readonly realmClient: RealmServicePromiseClient
  private readonly realmDomainClient: RealmDomainServicePromiseClient
  private readonly pluginsClient: RealmPluginsServicePromiseClient
  private readonly result: Result
  private createdRealm: Realm | undefined

  constructor (
    parameters: Parameters,
    clients: Clients = createBackendClients()
  ) {
    this.session = parameters.session
    this.description = parameters.description
    this.template = parameters.template
    this.callCredentials = createCallCredentials(parameters.session)
    this.realmClient = clients.realmClient
    this.pluginsClient = clients.pluginsClient
    this.realmDomainClient = clients.realmDomainClient
    this.result = {}
  }

  async run(): Promise<Result> {
    await this.createRealm()
    if (this.createdRealm) {
      await this.createRelated()
    }
    return this.result
  }

  private async createRealm(): Promise<any> {
    const request = new CreateRealmRequest()
      .setName(this.description.name)
      .setDescriptionText(this.description.text)
      .setOwnerId(this.session.accountId)
      .setCapacity(this.description.capacity)
      .setIconId(this.template.iconId)
      .setTypeId(this.template.typeId)
    try {
      const response = await this.realmClient.create(request, this.callCredentials)
      this.createdRealm = orThrow(response?.getRealm(), createNotFoundError)
    } catch (error) {
      this.result.realmCreationError = translateRealmCreationError(error)
    }
  }

  private async createRelated(): Promise<any> {
    return Promise.all([this.bindDomain(), this.updatePlugins()])
  }

  private async bindDomain(): Promise<any> {
    const realmId = assertNotNull<number>('realm', this.createdRealm?.getId())
    const request = new UpsertRealmDomainRequest()
      .setRealmId(realmId)
      .setFullDomain(this.description.domain)
    try {
      await this.realmDomainClient.upsert(request, this.callCredentials)
    } catch (error) {
      this.result.domainBindError = translateDomainBindError(error)
    }
  }

  private listPlugins(): Plugin[] {
    const transform = (resource: Resource.AsObject) => new Plugin().setResourceId(resource.id)
    return this.template.resources.map(transform)
  }

  private async updatePlugins(): Promise<any> {
    const realmId = assertNotNull<number>('realm', this.createdRealm?.getId())
    const request = new UpdatePluginsRequest()
      .setRealmId(realmId)
      .setPluginsList(this.listPlugins())
    try {
      await this.pluginsClient.update(request, this.callCredentials)
    } catch (error) {
      this.result.pluginConfigurationError = translatePluginConfigurationError(error)
    }
  }
}

export async function createRealm(parameters: Parameters): Promise<Result> {
  return new RealmCreation(parameters).run()
}