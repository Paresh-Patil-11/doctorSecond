import { useState, useEffect } from 'react'
import { appointmentAPI } from '../utils/api'

export const useAppointments = (role, params = {}) => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(null)

  const fetchAppointments = async (queryParams = params) => {
    try {
      setLoading(true)
      const endpoint = role === 'user' ? '/appointments/user' : '/appointments/doctor'
      const response = await appointmentAPI.getAll(queryParams)
      setAppointments(response.data.appointments)
      setPagination(response.data.pagination)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch appointments')
    } finally {
      setLoading(false)
    }
  }

  const bookAppointment = async (appointmentData) => {
    try {
      const response = await appointmentAPI.book(appointmentData)
      setAppointments(prev => [response.data.appointment, ...prev])
      return { success: true, appointment: response.data.appointment }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to book appointment'
      setError(message)
      return { success: false, message }
    }
  }

  const updateAppointmentStatus = async (id, statusData) => {
    try {
      const response = await appointmentAPI.updateStatus(id, statusData)
      setAppointments(prev => 
        prev.map(apt => apt._id === id ? response.data.appointment : apt)
      )
      return { success: true, appointment: response.data.appointment }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update appointment'
      setError(message)
      return { success: false, message }
    }
  }

  const cancelAppointment = async (id, reason) => {
    try {
      await appointmentAPI.cancel(id, reason)
      setAppointments(prev => 
        prev.map(apt => apt._id === id ? { ...apt, status: 'cancelled', cancellationReason: reason } : apt)
      )
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to cancel appointment'
      setError(message)
      return { success: false, message }
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [role])

  return {
    appointments,
    loading,
    error,
    pagination,
    refetch: fetchAppointments,
    bookAppointment,
    updateAppointmentStatus,
    cancelAppointment,
  }
}

export const useAppointment = (id) => {
  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAppointment = async () => {
    if (!id) return
    
    try {
      setLoading(true)
      const response = await appointmentAPI.getById(id)
      setAppointment(response.data.appointment)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch appointment')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointment()
  }, [id])

  return {
    appointment,
    loading,
    error,
    refetch: fetchAppointment,
  }
}