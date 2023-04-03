import {
  SET_MODEL_OPTION,
  THROW_ERROR,
  CLEAR_ALERT,
  SUCCESS_MESSAGE,
  TOGGLE_DISPLAY_MODEL,
  SETUP_USER,
  LOGOUT_USER,
  SET_PASS_VALIDITY,
  NEW_DEVICE,
  ACCOUNT_VERIFICATION,
  MANAGE_SESSION,
  GET_SERVER_MESSAGE,
  LOGIN_SUCCESS,
  GET_USERS,
} from './action'
import { initialState } from './appContext'
const reducer = (state, action) => {
  if (action.type === MANAGE_SESSION) {
    return {
      ...state,
      token: action.payload.token,
      user: JSON.parse(action.payload.user),
    }
  }
  if (action.type === GET_USERS) {
    return {
      ...state,
      users: action.payload.result,
    }
  }
  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      isLoggedIn: true,
    }
  }
  if (action.type === NEW_DEVICE) {
    return {
      ...state,
      needVerify: action.payload.newDevice,
    }
  }
  if (action.type === GET_SERVER_MESSAGE) {
    return { ...state, twoFactor: false, serverMessage: action.payload.msg }
  }
  if (action.type === ACCOUNT_VERIFICATION) {
    return {
      ...state,
      needVerify: action.payload.status,
    }
  }
  if (action.type === SUCCESS_MESSAGE) {
    const message = action.payload.alertText
    const verificationSent = message.includes('Verification Email')
    const changedSuccess = message.includes('Password changed successfully')
    const resetSuccess = message.includes('Password Reset Successful')
    if (verificationSent) {
      return {
        ...state,
        verificationSent: true,
        alertType: 'success',
        alertText: action.payload.alertText,
      }
    } else if (changedSuccess || resetSuccess) {
      return {
        ...state,
        success: true,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.alertText,
      }
    } else {
      return {
        ...state,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.alertText,
      }
    }
  }
  if (action.type === SET_MODEL_OPTION) {
    return {
      ...state,
      isSignIn: action.payload.choice,
    }
  }
  if (action.type === SET_PASS_VALIDITY) {
    return {
      ...state,
      passwordValidity: action.payload.result,
    }
  }
  if (action.type === THROW_ERROR) {
    const isLoginNewDevice = action.payload.alertText.includes('New browser')
    if (isLoginNewDevice) {
      return {
        ...state,
        twoFactor: true,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.alertText,
      }
    } else {
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.alertText,
      }
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      verificationSent: false,
      success: false,
    }
  }
  if (action.type === TOGGLE_DISPLAY_MODEL) {
    return {
      ...state,
      model: !state.model,
    }
  }

  if (action.type === SETUP_USER) {
    return {
      ...state,
      token: action.payload.token,
      user: action.payload.user,
    }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      isLoggedIn: false,
    }
  }
}
export default reducer
