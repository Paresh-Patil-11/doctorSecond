import { useState, useEffect } from 'react'
import { userAPI } from '../utils/api'

export const useUserProfile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await userAPI.getProfile()
      setProfile(response.data.user)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (userData) => {
    try {
      const response = await userAPI.updateProfile(userData)
      setProfile(response.data.user)
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update profile'
      setError(message)
      return { success: false, message }
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile,
  }
}