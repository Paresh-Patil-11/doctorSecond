import React from 'react'

const PageHeader = ({ title, subtitle, image }) => {
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary-light text-white py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      {image && (
        <div className="absolute inset-0">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-light/90"></div>
        </div>
      )}
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fadeInUp">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl max-w-3xl mx-auto text-gray-100 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path 
            fill="#f9fafb" 
            fillOpacity="1" 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default PageHeader