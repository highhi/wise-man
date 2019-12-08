import { action, ActionType, createReducer } from 'typesafe-actions'

export const userLogin = ({ id }: { id: string }) => action('user/login', { id })

export const userLogout = () => action('user/logout')

const actions = { userLogin, userLogout }

export type TUserctions = ActionType<typeof actions>

export type TInitialState = {
  id?: string
  name?: string
  loggedIn: boolean
}

const initialState: TInitialState = {
  id: undefined,
  name: undefined,
  loggedIn: false
}

export default createReducer<TInitialState, TUserctions>(initialState)
  .handleType('user/login', (_, action) => {
    const { id } = action.payload
    return { id, loggedIn: true }
  })
  .handleType('user/logout', () => {
    return { id: undefined, loggedIn: false }
  })
