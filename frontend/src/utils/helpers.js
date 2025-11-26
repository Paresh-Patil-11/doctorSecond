import { format, addDays, isWeekend, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns'

// Format date for display
export const formatDate = (date, formatString = 'PPP') => {
  return format(new Date(date), formatString)
}

// Format time for display
export const formatTime = (time) => {
  return format(new Date(`2000-01-01T${time}`), 'h:mm a')
}

// Generate time slots for appointments
export const generateTimeSlots = (startHour = 9, endHour = 17, interval = 30) => {
  const slots = []
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      slots.push(time)
    }
  }
  return slots
}

// Check if a date is in the future
export const isFutureDate = (date) => {
  return isAfter(new Date(date), new Date())
}

// Check if a date is today
export const isToday = (date) => {
  const today = new Date()
  const checkDate = new Date(date)
  return today.toDateString() === checkDate.toDateString()
}

// Get next available date (excluding weekends)
export const getNextAvailableDate = (daysAhead = 1) => {
  let date = addDays(new Date(), daysAhead)
  while (isWeekend(date)) {
    date = addDays(date, 1)
  }
  return date
}

// Generate available dates for next 30 days (excluding weekends)
export const generateAvailableDates = (days = 30) => {
  const dates = []
  const today = new Date()
  
  for (let i = 1; i <= days; i++) {
    const date = addDays(today, i)
    if (!isWeekend(date)) {
      dates.push(date)
    }
  }
  
  return dates
}

// Validate appointment time
export const validateAppointmentTime = (date, time) => {
  const appointmentDateTime = new Date(`${date}T${time}`)
  const now = new Date()
  
  return isAfter(appointmentDateTime, now)
}

// Format appointment status
export const formatAppointmentStatus = (status) => {
  const statusMap = {
    pending: { text: 'Pending', color: 'yellow' },
    approved: { text: 'Approved', color: 'green' },
    cancelled: { text: 'Cancelled', color: 'red' },
    completed: { text: 'Completed', color: 'blue' },
  }
  
  return statusMap[status] || { text: status, color: 'gray' }
}

// Calculate age from date of birth
export const calculateAge = (dateOfBirth) => {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

// Format phone number
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

// Validate email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Validate phone number
export const isValidPhone = (phone) => {
  const re = /^[0-9]{10}$/
  return re.test(phone)
}

// Format currency
export const formatCurrency = (amount, currency = '₹') => {
  return `${currency}${amount.toLocaleString('en-IN')}`
}

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Get initials from name
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2)
}

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9)
}

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

// Check if device is mobile
export const isMobile = () => {
  return window.innerWidth < 768
}

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy: ', err)
    return false
  }
}