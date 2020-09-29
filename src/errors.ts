export const errors = {
  unknown: 'errors.unknown',
  backend: {
    unavailable: 'errors.backend.unavailable',
    internal: 'errors.backend.failure',
    timeout: 'errors.backend.timeout'
  },
  session: {
    none: 'errors.session.none',
    invalid: 'errors.session.invalid',
    notPermitted: 'errors.session.notPermitted'
  },
  realm: {
    notFound: 'errors.realm.notFound',
    alreadyExists: 'errors.realm.alreadyExist'
  },
  wizard: {
    conflicts: 'errors.wizard.conflicts'
  },
  dashboard: {
    noActiveRealm: 'errors.dashboard.noActiveRealm'
  }
}