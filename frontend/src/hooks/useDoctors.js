import { useState, useEffect } from 'react'
import { doctorAPI } from '../utils/api'

export const useDoctors = (params = {}) => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(null)

  const fetchDoctors = async (queryParams = params) => {
    try {
      setLoading(true)
      const response = await doctorAPI.getAll(queryParams)
      setDoctors(response.data.doctors)
      setPagination(response.data.pagination)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch doctors')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  return {
    doctors,
    loading,
    error,
    pagination,
    refetch: fetchDoctors,
  }
}

export const useDoctor = (id) => {
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDoctor = async () => {
    if (!id) return
    
    try {
      setLoading(true)
      const response = await doctorAPI.getById(id)
      setDoctor(response.data.doctor)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch doctor')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDoctor()
  }, [id])

  return {
    doctor,
    loading,
    error,
    refetch: fetchDoctor,
  }
}