export default interface State {
  fetchError: string
  updateError: string
  plugins: number[]
}

export const initialState: State = {
  fetchError: '',
  updateError: '',
  plugins: []
}