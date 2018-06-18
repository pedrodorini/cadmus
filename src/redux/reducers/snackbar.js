import Immutable from 'seamless-immutable'

import { createReducer } from 'reduxsauce'

import { Types } from './../actions'

export const INITIAL_STATE = Immutable({
  open: false,
  message: '',
  error: false
})

export const openSnackbar = (state = INITIAL_STATE, { message }) => Object.assign({}, state, { open: true, error: false, message })

export const openSnackbarError = (state = INITIAL_STATE, { message }) => Object.assign({}, state, { open: true, error: true, message })

export const closeSnackbar = (state = INITIAL_STATE) => Object.assign({}, state, { open: false, error: false })

const HANDLERS = {
  [Types.OPEN_SNACKBAR]: openSnackbar,
  [Types.OPEN_SNACKBAR_ERROR]: openSnackbarError,
  [Types.CLOSE_SNACKBAR]: closeSnackbar
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)

export default reducer
