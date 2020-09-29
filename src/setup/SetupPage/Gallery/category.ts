import {Resource} from '@joystack/protocol/realm/resource'

export interface Category {
  id: number
  name: string
  filter: (resource: Resource.AsObject) => boolean
}

function isPlugin(resource: Resource.AsObject) {
  return resource.type === Resource.Type.PLUGIN
}

function isWorld(resource: Resource.AsObject) {
  return resource.type === Resource.Type.MAP
}

export const pluginCategories: Category[] = [
  {
    id: 1,
    name: 'All',
    filter: resource => isPlugin(resource) && resource.featured,
  },
  {
    id: 2,
    name: 'Bauen',
    filter: resource => isPlugin(resource) && resource.category === 'building'
  },
  {
    id: 3,
    name: 'Administration',
    filter: resource => isPlugin(resource) && resource.category === 'administration'
  },
  {
    id: 4,
    name: 'Technisch',
    filter: resource => isPlugin(resource) && resource.category === 'technical'
  },
  {
    id: 5,
    name: 'Kosmetisch',
    filter: resource => isPlugin(resource) && resource.category === 'cosmetic'
  },
]

export const worldCategories: Category[] = [
  {
    id: 1,
    name: 'Alle',
    filter: resource => isWorld(resource)
  },
  {
    id: 3,
    name: 'Adventure',
    filter: resource => isWorld(resource) && resource.category === 'adventure'
  },
  {
    id: 4,
    name: 'Parkour',
    filter: resource => isWorld(resource) && resource.category === 'parkour'
  },
  {
    id: 5,
    name: 'Survival',
    filter: resource => isWorld(resource) && resource.category === 'survival'
  },
  {
    id: 6,
    name: 'Hubs',
    filter: resource => isWorld(resource) && resource.category === 'hub'
  },
  {
    id: 7,
    name: 'Games',
    filter: resource => isWorld(resource) && resource.category === 'game'
  },
]