import {
  FindRealmSettingsRequest,
  RealmSettings,
  RealmSettingsServicePromiseClient, UpdateRealmSettingsRequest
} from '@joystack/protocol/realm/settings'
import config from 'src/config'
import {Session} from 'src/login/state'
import {
  createCallCredentials, selectSession,
  translateCommonFailureCode
} from '../common'
import {errors} from 'src/errors'
import orThrow from 'src/util/orThrow'
import {put, select, call, takeEvery} from 'redux-saga/effects'
import {
  ActionType,
  FetchSettingsRequestAction, SettingsUpdate, UpdateSettingsRequestAction
} from 'src/dashboard/state/settings/actions'
import {Error as GrpcError, StatusCode} from 'grpc-web'
import {CombinedState} from '../../../state'
import {ChatColor} from '@joystack/protocol/realm/settings/settings_service_pb'

const client = new RealmSettingsServicePromiseClient(config.apiHost)

function translateFailureCode(code: number) {
  switch (code) {
  case StatusCode.NOT_FOUND:
    return errors.realm.notFound
  case StatusCode.ALREADY_EXISTS:
    return errors.realm.alreadyExists
  default:
    return translateCommonFailureCode(code)
  }
}

function translateFailure(error: any) {
  const code = (error as GrpcError).code
  return translateFailureCode(code)
}

async function fetchSettingsInSession(session: Session, realmId: number): Promise<RealmSettings.AsObject> {
  const request = new FindRealmSettingsRequest().setRealmId(realmId)
  const response = await client.find(request, createCallCredentials(session))
  return orThrow(response.getSettings()?.toObject(), () => new Error(errors.realm.notFound))
}

export function* fetchSettings({realmId}: FetchSettingsRequestAction) {
  const session = (yield select(selectSession)) as Session | null
  if (!session) {
    yield put({type: ActionType.FETCH_SETTINGS_ERROR, cause: errors.session.none})
    return
  }
  try {
    const settings = (yield call(fetchSettingsInSession, session, realmId)) as RealmSettings.AsObject
    yield put({type: ActionType.FETCH_SETTINGS_SUCCESS, settings, realmId})
  } catch (error) {
    yield put({type: ActionType.FETCH_SETTINGS_ERROR, realmId, cause: translateFailure(error)})
  }
}

export function *fetchSettingsSaga() {
  yield takeEvery<FetchSettingsRequestAction>(
    ActionType.FETCH_SETTINGS_REQUEST, fetchSettings)
}

function createChatColorFromObject(color: ChatColor.AsObject): ChatColor {
  return new ChatColor()
    .setEffectsList(color.effectsList)
    .setCode(color.code)
}

function createSettingsFromObject(settings: RealmSettings.AsObject): RealmSettings {
  const message = new RealmSettings()
    .setOperatorsList(settings.operatorsList)
    .setWhitelistList(settings.whitelistList)
    .setGameMode(settings.gameMode)
    .setEntitiesList(settings.entitiesList)
    .setFlagsList(settings.flagsList)
    .setResourcePackUrl(settings.resourcePackUrl)
    .setEnabledMessageTriggersList(settings.enabledMessageTriggersList)
    .setEnabledGameRulesList(settings.enabledGameRulesList)
    .setDimensionsList(settings.dimensionsList)
    .setViewDistance(settings.viewDistance)
    .setSpawnProtection(settings.spawnProtection)
    .setWeather(settings.weather)
    .setBuildHeightLimit(settings.buildHeightLimit)
    .setDifficulty(settings.difficulty)
  if (settings.colorsMap) {
    const targetMap = message.getColorsMap()
    settings.colorsMap.forEach(([key, color]) => {
      targetMap.set(key, createChatColorFromObject(color))
    })
  }
  return message
}

async function updateSettingsInSession(session: Session, realmId: number, settings: RealmSettings.AsObject): Promise<void> {
  const request = new UpdateRealmSettingsRequest()
    .setRealmId(realmId)
    .setSettings(createSettingsFromObject(settings))
  await client.update(request, createCallCredentials(session))
}

function applyUpdate(currentSettings: RealmSettings.AsObject, update: SettingsUpdate) {
  switch (update.name) {
  case 'full':
    return update.settings
  case 'partial':
    return {...currentSettings, ...update.properties}
  }
}

function selectSettings(state: CombinedState) {
  return state.dashboard.settings.value
}

export function* updateSettings({realmId, update}: UpdateSettingsRequestAction) {
  const session = (yield select(selectSession)) as Session | null
  if (!session) {
    yield put({type: ActionType.UPDATE_SETTINGS_ERROR, cause: errors.session.none})
    return
  }
  try {
    const settings = (yield select(selectSettings)) as RealmSettings.AsObject
    const updated = applyUpdate(settings, update)
    yield call(updateSettingsInSession, session, realmId, updated)
    yield put({type: ActionType.UPDATE_SETTINGS_SUCCESS, settings: updated, realmId})
  } catch (error) {
    console.log({message: 'failed to update settings', error})
    yield put({type: ActionType.UPDATE_SETTINGS_ERROR, realmId, cause: translateFailure(error)})
  }
}

export function *updateSettingsSaga() {
  yield takeEvery<UpdateSettingsRequestAction>(
    ActionType.UPDATE_SETTINGS_REQUEST, updateSettings)
}