import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-l-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-500" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button>
    </div>
  )
}

export default ThemeToggle