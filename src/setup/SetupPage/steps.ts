export enum StepKind {
  BEGIN = 0,
  ADDONS = 0,
  DOMAIN_SETUP = 1,
  WORLD_SETUP = 2,
  SUMMARY = 3
}

function createEntriesForPrefix(prefix: string) {
  return {
    prefix: StepKind.BEGIN,
    [`${prefix}/addons`]: StepKind.BEGIN,
    [`${prefix}/domain`]: StepKind.DOMAIN_SETUP,
    [`${prefix}/world`]: StepKind.WORLD_SETUP,
    [`${prefix}/summary`]: StepKind.SUMMARY
  }
}

const routeToKind = new Map(Object.entries({
  ...createEntriesForPrefix('dashboard/new'),
  ...createEntriesForPrefix('start'),
  ...createEntriesForPrefix('dashboard/edit')
}))

export function findRouteForLocation(location: string = window.location.toString()): StepKind {
  const relativePath = location.replace(/^(?:\/\/|[^/]+)*\//, '')
  return routeToKind.get(relativePath) || StepKind.BEGIN
}
