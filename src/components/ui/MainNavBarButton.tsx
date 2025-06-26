import React, { useRef, useLayoutEffect, useState } from 'react'

const MainNavBarButton: React.FC<{ text: string; onClick?: () => void }> = ({ text, onClick }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useLayoutEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, [text]);

  return (
    <>
      <button onClick={onClick} className="main-button">
        <span className="box">
          <span className="text" ref={textRef}>
            {text}
            <span
              className="text-bg"
              aria-hidden="true"
              style={{
                width: textWidth ? `calc(${textWidth}px + 0.5em)` : undefined
              }}
            ></span>
          </span>
        </span>
      </button>

      <style>{`
        .main-button {
          color: #444;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          outline: none;
        }
        .box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 12px 24px;
          min-width: 80px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 1px;
          background: transparent;
        }
        .text {
          position: relative;
          z-index: 1;
          padding: 0 2px;
          color: #444;
          display: inline-block;
        }
        .text-bg {
          position: absolute;
          left: 50%;
          top: 50%;
          height: 50%;
          background: #e5e5e5;
          border-radius: 0 0 4px 4px;
          z-index: 0;
          opacity: 0.7;
          transform: translate(-50%, 0) scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
          pointer-events: none;
        }
        .main-button:hover .text-bg,
        .main-button:focus-visible .text-bg {
          transform: translate(-50%, 0) scaleX(1);
        }
        .main-button:active .text-bg {
          /* 點擊時也顯示底色，但不會殘留 */
          transform: translate(-50%, 0) scaleX(1);
        }
        /* 移除黑色底線動畫 */
        /* .box::after {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #222;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
          z-index: 3;
        }
        .main-button:hover .box::after,
        .main-button:focus .box::after {
          transform: scaleX(1);
        } */
        .main-button:hover .text,
        .main-button:focus .text {
          color: #666;
        }
      `}</style>
    </>
  )
}

export default MainNavBarButton
