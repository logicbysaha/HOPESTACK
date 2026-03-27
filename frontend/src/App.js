// App.js — Main app with routing between pages
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import JournalEntry from './components/JournalEntry';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const bgUrl = "https://i.imgur.com/G5gE5vX.png"; // Placeholder for the actual asset path if needed, or point to local
  // NOTE: I'll use the generated image path locally if I could, but for React I'll use the relative path.
  // Assuming the user will move the asset to public/assets/ or similar later, 
  // for now I'll just set the inline style in the div.

  return (
    <Router>
      <div className="App">
        {/* Global Peaceful Background */}
        <div id="app-bg" style={{ 
          backgroundImage: `url('/abstract_peaceful_wellness_bg_1774577012631.png')`, // Standard public folder reference
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 
        }} />
        
        <ThemeToggle />
        <LanguageSwitcher />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<JournalEntry />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;