import React, { createContext, useContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

// Initial state
const initialState = {
  user: null,
  role: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
}

// Action types
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const AUTH_FAILURE = 'AUTH_FAILURE'
const LOGOUT = 'LOGOUT'
const SET_LOADING = 'SET_LOADING'
const UPDATE_USER = 'UPDATE_USER'

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      }
    case AUTH_FAILURE:
      return {
        ...state,
        user: null,
        role: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
        role: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      }
    default:
      return state
  }
}

// Create context
const AuthContext = createContext()

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Set axios default header
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [state.token])

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await axios.get('/api/auth/me')
          dispatch({
            type: AUTH_SUCCESS,
            payload: {
              user: response.data.user,
              role: response.data.role,
              token,
            },
          })
        } catch (error) {
          localStorage.removeItem('token')
          dispatch({ type: AUTH_FAILURE })
        }
      } else {
        dispatch({ type: SET_LOADING, payload: false })
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (credentials, role) => {
    try {
      dispatch({ type: SET_LOADING, payload: true })
      const response = await axios.post(`/api/auth/login/${role}`, credentials)
      
      const { token, user, doctor, admin } = response.data
      const userData = user || doctor || admin
      
      localStorage.setItem('token', token)
      
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          user: userData,
          role,
          token,
        },
      })
      
      toast.success(`Login successful! Welcome ${userData.name}`)
      return { success: true }
    } catch (error) {
      dispatch({ type: AUTH_FAILURE })
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // Register function
  const register = async (userData, role) => {
    try {
      dispatch({ type: SET_LOADING, payload: true })
      const response = await axios.post(`/api/auth/register/${role}`, userData)
      
      const { token, user, doctor } = response.data
      const registeredUser = user || doctor
      
      localStorage.setItem('token', token)
      
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          user: registeredUser,
          role,
          token,
        },
      })
      
      toast.success(`Registration successful! Welcome ${registeredUser.name}`)
      return { success: true }
    } catch (error) {
      dispatch({ type: AUTH_FAILURE })
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: LOGOUT })
    toast.success('Logged out successfully')
  }

  // Update user profile
  const updateUser = (userData) => {
    dispatch({
      type: UPDATE_USER,
      payload: userData,
    })
  }

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}