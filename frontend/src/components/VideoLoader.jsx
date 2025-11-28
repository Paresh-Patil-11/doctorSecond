import React, { useState, useEffect } from 'react'
import { Stethoscope } from 'lucide-react'

const VideoLoader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            onLoadComplete()
          }, 300)
          return 100
        }
        const newProgress = oldProgress + 2
        return Math.min(newProgress, 100)
      })
    }, 60) // 3 seconds total (100 / 2 * 60ms = 3000ms)

    return () => {
      clearInterval(timer)
    }
  }, [onLoadComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary to-primary-light flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8 animate-pulse">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <Stethoscope className="w-16 h-16 text-primary" />
          </div>
        </div>

        {/* Hospital Name */}
        <h1 className="text-4xl font-bold text-white mb-2">
          Shashwati Healthcare
        </h1>
        <p className="text-xl text-gray-100 mb-8">
          Your Health is Our Priority
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-white/30 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white mt-3 text-sm">Loading... {progress}%</p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default VideoLoader