import { FC, useState } from 'react'

interface GoogleIconButtonProps {
  onClick?: () => void
  disabled?: boolean
  className?: string
  tooltipText?: string
}

const GoogleIconButton: FC<GoogleIconButtonProps> = ({ 
  onClick, 
  disabled, 
  className = '',
  tooltipText = 'Sign in with Google'
}) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`relative overflow-hidden rounded-full w-10 h-10 flex items-center justify-center bg-white border border-gray-200 hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        type="button"
      >
        {/* 遮罩層 */}
        <div className="absolute inset-0 bg-gray-100 opacity-0 hover:opacity-30 transition-opacity duration-300" />
        
        {/* Google Logo */}
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 relative z-10">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          <path fill="none" d="M0 0h48v48H0z" />
        </svg>
      </button>
      
      {/* Tooltip */}
      {showTooltip && !disabled && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50 opacity-0 animate-fade-in pointer-events-none">
          {tooltipText}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800" />
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translate(-50%, -4px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default GoogleIconButton
