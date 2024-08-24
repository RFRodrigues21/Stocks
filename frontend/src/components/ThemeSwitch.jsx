import React, { useState, useEffect } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

const ThemeSwitch = () => {
  // State to manage the theme mode
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  // Effect to apply theme class to the document
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Function to toggle theme mode
  const toggleColorMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="">
      
      <IconButton onClick={toggleColorMode} className="ml-2">
        {isDarkMode ? <Brightness7Icon className="text-gray-900 dark:text-gray-100" /> : <Brightness4Icon className="text-gray-900 dark:text-gray-100" />}
      </IconButton>
    </div>
  );
};

export default ThemeSwitch;
