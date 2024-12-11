import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const LightDarkThemeBtn = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
//   background: linear-gradient(0deg, #000000, #000000),
// radial-gradient(144.17% 191.63% at -30.97% 127.22%, rgba(0, 72, 255, 0.31) 0%, rgba(0, 0, 0, 0.31) 56.38%, rgba(0, 173, 236, 0.31) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center w-14 h-6 rounded-full p-1 transition-all duration-300 ${
        isDarkMode
          ? 'bg-theme-btn-gradient'
          : 'bg-gradient-to-r from-blue-400 to-blue-600'
      }`}
    >
      {/* Toggle Ball */}
      <div
        className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
          isDarkMode ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDarkMode ? (
          // Moon Icon for Dark Mode
          <svg
            width="15"
            height="15"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.1438 7.50111C9.40653 9.34298 7.6052 10.644 5.5 10.644C2.73857 10.644 0.5 8.40544 0.5 5.64404C0.5 3.04526 2.48264 0.909559 5.01785 0.666992C4.28359 1.44335 3.83333 2.49112 3.83333 3.64404C3.83333 6.03731 5.77343 7.97738 8.16666 7.97738C8.87893 7.97738 9.551 7.80558 10.1438 7.50111Z"
              fill="white"
            />
          </svg>
        ) : (
          // Sun Icon for Light Mode
          <svg
            width="15"
            height="15"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="4.25" cy="4" rx="3.75" ry="4" fill="white" />
          </svg>
        )}
      </div>

      {/* Text */}
      <span
        className={`absolute text-[9px] font-medium transition-all duration-300 ${
          isDarkMode ? 'text-gray-300 left-2' : 'text-white right-2'
        }`}
      >
        {isDarkMode ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export default LightDarkThemeBtn;
