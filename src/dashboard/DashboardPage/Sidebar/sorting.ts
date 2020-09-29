import {Project} from '../../state/sidebar/state'

export interface SortCriteria {
  (left: Project, right: Project): number
}

const tie = 0
const leftWins = -1
const rightWins = 1
// TODO: We need to get a {RealmStatus, Project} type to compare
export function sortByName(left: Project, right: Project): number {
  return left.name.localeCompare(right.name)
}

export function sortByPlayers(left: Project, right: Project): number {
  // return left.status.playerCount - right.status.playerCount
  return 0
}

export function sortByOnline(left: Project, right: Project): number {
  /*if (left.status.online && right.status.online) {
    return tie
  }
  return left.status.online ? leftWins : rightWins*/
  return 0
}