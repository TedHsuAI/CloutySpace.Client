import React from 'react'

interface FloatingInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}

const FloatingInput: React.FC<FloatingInputProps> = ({ label, value, onChange, type = 'text' }) => {
  return (
    <>
      <div className="input-container">
        <input
          type={type}
          id={label.toLowerCase().replace(/\s+/g, '-')}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <label htmlFor={label.toLowerCase().replace(/\s+/g, '-')} className="label">{label}</label>
        <div className="underline"></div>
      </div>

      <style>{`
        .input-container {
          position: relative;
          margin: 12px 0;
          width: 100%;
        }

        .input-container input {
          font-size: 16px;
          width: 100%;
          border: none;
          border-bottom: 2px solid #ccc;
          padding: 8px 0;
          background-color: transparent;
          outline: none;
          /* font-family 由 global.css 控制 */
        }

        .input-container .label {
          position: absolute;
          top: 0;
          left: 0;
          color: #ccc;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .input-container input:focus ~ .label,
        .input-container input:valid ~ .label {
          top: -20px;
          font-size: 13px;
          color: #333;
        }

        .input-container .underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 100%;
          background-color: #333;
          transform: scaleX(0);
          transition: all 0.3s ease;
        }

        .input-container input:focus ~ .underline,
        .input-container input:valid ~ .underline {
          transform: scaleX(1);
        }
      `}</style>
    </>
  )
}

export default FloatingInput
