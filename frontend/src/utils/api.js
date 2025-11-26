import axios from 'axios'
import toast from 'react-hot-toast'

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login/user'
      toast.error('Session expired. Please login again.')
    }
    return Promise.reject(error)
  }
)

// API functions
export const authAPI = {
  login: (credentials, role) => api.post(`/auth/login/${role}`, credentials),
  register: (userData, role) => api.post(`/auth/register/${role}`, userData),
  getMe: () => api.get('/auth/me'),
}

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  updatePassword: (passwordData) => api.put('/users/password', passwordData),
  getStats: () => api.get('/users/stats'),
  getAppointments: (params) => api.get('/appointments/user', { params }),
}

export const doctorAPI = {
  getAll: (params) => api.get('/doctors', { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  getProfile: () => api.get('/doctors/profile'),
  updateProfile: (userData) => api.put('/doctors/profile', userData),
  updatePassword: (passwordData) => api.put('/doctors/password', passwordData),
  getSpecializations: () => api.get('/doctors/specializations/list'),
  getAvailability: (id) => api.get(`/doctors/availability/${id}`),
  getAppointments: (params) => api.get('/appointments/doctor', { params }),
}

export const appointmentAPI = {
  book: (appointmentData) => api.post('/appointments', appointmentData),
  getById: (id) => api.get(`/appointments/${id}`),
  updateStatus: (id, statusData) => api.put(`/appointments/${id}/status`, statusData),
  addPrescription: (id, prescriptionData) => api.put(`/appointments/${id}/prescription`, prescriptionData),
  cancel: (id, reason) => api.delete(`/appointments/${id}`, { data: { reason } }),
}

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  updateUserStatus: (id, statusData) => api.put(`/admin/users/${id}/status`, statusData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getDoctors: (params) => api.get('/admin/doctors', { params }),
  approveDoctor: (id) => api.put(`/admin/doctors/${id}/approve`),
  updateDoctorStatus: (id, statusData) => api.put(`/admin/doctors/${id}/status`, statusData),
  deleteDoctor: (id) => api.delete(`/admin/doctors/${id}`),
  getAppointments: (params) => api.get('/admin/appointments', { params }),
  getAppointmentById: (id) => api.get(`/admin/appointments/${id}`),
}

export default api