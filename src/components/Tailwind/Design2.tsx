import React, { useState, useEffect } from 'react';

const Design2 = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode class on the body element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
    <div className="min-h-screen bg-gray-900 dark:bg-gray-100 text-white dark:text-black flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8"></h1>

    </div>

    <button
        onClick={toggleDarkMode}
        className="px-4 py-2 bg-blue-500 text-white dark:bg-blue-700 rounded-md"
      >
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};

export default Design2;
