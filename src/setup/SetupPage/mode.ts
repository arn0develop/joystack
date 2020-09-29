export default interface Mode {
  isDashboard: boolean
  path: string
}

export const dashboardMode = {
  isDashboard: true,
  path: '/dashboard/new'
}

export const signUpMode = {
  isDashboard: false,
  path: '/start'
}

export const editMode = {
  isDashboard: true,
  path: '/dashboard/edit'
}