import React, { useReducer, useContext, useEffect } from 'react'
import reducer from './reducer'
import axios from 'axios'
import {
  SET_MODEL_OPTION,
  THROW_ERROR,
  CLEAR_ALERT,
  SUCCESS_MESSAGE,
  TOGGLE_DISPLAY_MODEL,
  LOGOUT_USER,
  SETUP_USER,
  SET_PASS_VALIDITY,
  ACCOUNT_VERIFICATION,
  MANAGE_SESSION,
  GET_SERVER_MESSAGE,
  LOGIN_SUCCESS,
  GET_USERS,
} from './action'
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  newDevice: false,
  twoFactor: false,
  verificationSent: false,
  isSignIn: true,
  showAlert: false,
  needVerify: false,
  model: false,
  alertText: '',
  alertType: '',
  user: null,
  token: null,
  passwordValidity: false,
  serverMessage: '',
  isLoggedIn: false,
  success: false,
  users: [],
}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setModelOption = (choice) => {
    dispatch({ type: SET_MODEL_OPTION, payload: { choice } })
  }
  const manageSession = () => {
    dispatch({ type: MANAGE_SESSION, payload: { user, token } })
  }
  const displayAlert = () => {
    dispatch({
      type: THROW_ERROR,
      payload: {
        alertText: 'Please provide all values',
      },
    })
    clearAlert()
  }
  const passwordValidityError = () => {
    dispatch({
      type: THROW_ERROR,
      payload: {
        alertText: 'Please fulfill the password requirements',
      },
    })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 2000)
  }
  const toggleModel = () => {
    dispatch({
      type: TOGGLE_DISPLAY_MODEL,
    })
  }
  const setPasswordValidity = (result) => {
    dispatch({
      type: SET_PASS_VALIDITY,
      payload: { result },
    })
  }
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  const passwordNotMatching = () => {
    dispatch({
      type: THROW_ERROR,
      payload: {
        alertText: 'Your password did not matched !!!',
      },
    })
    clearAlert()
  }
  const logoutUser = async () => {
    await axios.get('/api/auth/logout')
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const sendVerificationLink = async () => {
    try {
      const response = await axios.get(`/api/auth/send-verification-email`)
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: { alertText: response.data.msg },
      })
    } catch (error) {
      dispatch({
        type: THROW_ERROR,
        payload: { alertText: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const verifyAccount = async (vtoken) => {
    try {
      const response = await axios.patch(`/api/auth/verify/${vtoken}`)
      const { user, token } = response.data
      dispatch({
        type: SETUP_USER,
        payload: { user, token },
      })
      addUserToLocalStorage({ user, token })
      if (user) {
        if (user.verified) {
          dispatch({
            type: ACCOUNT_VERIFICATION,
            payload: { status: false },
          })
        }
      }
    } catch (error) {
      dispatch({
        type: THROW_ERROR,
        payload: { alertText: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const setupUser = async ({ endPoint, userData }) => {
    try {
      const response = await axios.post(`/api/auth/${endPoint}`, userData)
      const { user, token, msg } = response.data
      dispatch({
        type: SETUP_USER,
        payload: { user, token },
      })
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: { alertText: msg + ' redirecting...' },
      })
      addUserToLocalStorage({ user, token })
      if (user) {
        if (!user.verified) {
          dispatch({
            type: ACCOUNT_VERIFICATION,
            payload: { status: true },
          })
        }
      }
      if (response.status === 200) {
        dispatch({ type: LOGIN_SUCCESS })
      }
    } catch (error) {
      dispatch({
        type: THROW_ERROR,
        payload: { alertText: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const sendLoginCode = async (email) => {
    try {
      const response = await axios.get(`/api/auth/send-login-code/${email}`)
      const { msg } = response.data
      dispatch({ type: GET_SERVER_MESSAGE, payload: { msg } })
    } catch (error) {
      dispatch({
        type: THROW_ERROR,
        payload: { alertText: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const verifyWithCode = async (email, loginCode) => {
    try {
      const response = await axios.post(`/api/auth/login-with-code/${email}`, {
        loginCode,
      })
      const { user, token, msg } = response.data
      dispatch({
        type: SETUP_USER,
        payload: { user, token },
      })
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: { alertText: msg + ' redirecting...' },
      })
      dispatch({ type: LOGIN_SUCCESS })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: THROW_ERROR,
        payload: { alertText: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const changePassword = async (oPassword, nPassword) => {
    try {
      const response = await axios.post(`/api/auth/change-password`, {
        oPassword,
        nPassword,
      })
      const { msg } = response.data
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: { alertText: msg },
      })
    } catch (error) {
      dispatch({
        type: THROW_ERROR,
        payload: { alertText: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const forgotPassword = async (email) => {
    try {
      const response = await axios.get(`/api/auth/forgot-password/${email}`)
      const { msg } = response.data
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: { alertText: msg },
      })
    } catch (error) {
      dispatch({
        type: THROW_ERROR,
        payload: { alertText: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const resetPassword = async (password, resetToken) => {
    try {
      const response = await axios.patch(
        `/api/auth/reset-password/${resetToken}`,
        {
          password,
        }
      )
      const { msg } = response.data
      console.log(msg)
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: { alertText: msg },
      })
    } catch (error) {
      dispatch({
        type: THROW_ERROR,
        payload: { alertText: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const getUsers = async () => {
    try {
      const response = await axios.get(`/api/auth/users`)
      dispatch({
        type: GET_USERS,
        payload: { result: response.data },
      })
    } catch (error) {
      dispatch({
        type: THROW_ERROR,
        payload: { alertText: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const changeUserGroup = async (email, group) => {
    try {
      const response = await axios.patch(`/api/auth/change-group`, {
        email,
        group,
      })
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: { alertText: response.data.msg },
      })
    } catch (error) {
      dispatch({
        type: THROW_ERROR,
        payload: { alertText: error.response.data.msg },
      })
    }
    clearAlert()
  }

  useEffect(() => {
    manageSession()
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        setModelOption,
        displayAlert,
        setupUser,
        logoutUser,
        toggleModel,
        passwordNotMatching,
        setPasswordValidity,
        passwordValidityError,
        forgotPassword,
        resetPassword,
        changePassword,
        sendVerificationLink,
        verifyAccount,
        sendLoginCode,
        verifyWithCode,
        getUsers,
        changeUserGroup,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
const useAppContext = () => {
  return useContext(AppContext)
}
export { AppProvider, initialState, useAppContext }
