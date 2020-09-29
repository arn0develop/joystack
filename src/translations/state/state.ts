export type LanguageType = 'en' | 'de'

export interface State {
  language: LanguageType
}

export const initialState: State = {
  language: 'en'
}