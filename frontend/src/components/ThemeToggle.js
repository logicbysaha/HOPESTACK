import React, { useState, useEffect } from 'react';

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={styles.btn}
      title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

const styles = {
  btn: {
    position: 'absolute',
    top: '20px',
    right: '160px', // Shifted left to make room for LanguageSwitcher
    padding: '8px 12px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(8px)',
    cursor: 'pointer',
    fontSize: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    zIndex: 1000
  }
};

export default ThemeToggle;
