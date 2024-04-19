import React, { useState, useRef, useEffect } from 'react';
import logo from './img/logo.svg';
import search from './img/search.svg';
import mode from './img/mode.svg';
import catalog from './img/catalog.svg';
import profile from './img/profile.svg';
import menu from './img/menu.svg';
import achievements from './img/achievements.svg';
import friends from './img/friends.svg';
import help from './img/help.svg';
import notifications from './img/notifications.svg';
import settings from './img/settings.svg';

import LoginPage from './pages/LoginPage.js';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import ValidationPage from './pages/ValidationPage';
import ProfilePage from './pages/ProfilePage';
import AddEventPage from './pages/AddEventPage';
import EventPage from './pages/EventPage';

import './App.css';

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {

  /*Icon description on hover*/
  const [iconDescription, setIconDescription] = useState('');
  const handleMouseEnter = (description) => {
    setIconDescription(description);
  };
  const handleMouseLeave = () => {
    setIconDescription('');
  };
 
  /*Dropdown menu*/
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    if (menuOpen) {
      document.getElementById('dropdown').style.display = 'block';
    } else {
      document.getElementById('dropdown').style.display = 'none';
    }
  }, [menuOpen]);

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
         {/* Logo */}
        <div className='logo'>
          <a href="/">
            <img className="logo-img" src={logo} alt="Logo"/>
          </a>  
          <a href="/">
            <h2 className='logo-text'>Franko Campus</h2>
          </a>
        </div>
        {/* Search */}
        <form className="search" role="search">
          <input className="search-input" type="search" placeholder="Пошук"/>
          <button className="search-button" type="submit">
            <img className="search-img" src={search} alt="Search"/>
          </button>
        </form>

        {/* Icons */}
        <div className='icons-bar'>
          <div className='icon' onMouseEnter={() => handleMouseEnter('Змінити тему сайту')} onMouseLeave={handleMouseLeave}>
            <button className="icon-button">
              <img className="icon-img" src={mode} alt="Mode"/>
            </button>
          </div>
          <div className='icon' onMouseEnter={() => handleMouseEnter('Каталог подій')} onMouseLeave={handleMouseLeave}>
            <a className="icon-link" href="#">
              <img className="icon-img" src={catalog} alt="Catalog"/>
            </a>
          </div>
          <div className='icon' onMouseEnter={() => handleMouseEnter('Профіль')} onMouseLeave={handleMouseLeave}>
            <a className="icon-link" href="/profile">
              <img className="icon-img" src={profile} alt="Profile"/>
            </a>
          </div>

          {/* Display icon description */}
          {iconDescription && (
            <div className="icon-description">
              {iconDescription}
            </div>
          )}

          {/* Dropdown menu */}
          <div className='icon'>
            <div className="dropdown" ref={menuRef}>
                <button className="icon-button dropdown-button" onClick={toggleMenu}>
                  <img className="icon-img" src={menu} alt="Menu"/>
                </button>
                  <div className="dropdown-content" id='dropdown'>
                    <div className="dropdown-list-item">
                      <img className="icon-img" src={settings} alt="Settings"/><a className="icon-link" href="#">Налаштування</a>
                    </div>
                    <div className="dropdown-list-item">
                      <img className="icon-img" src={friends} alt="Friends"/><a className="icon-link" href="#">Друзі</a>
                    </div>
                    <div className="dropdown-list-item">
                      <img className="icon-img" src={achievements} alt="Achievements"/><a className="icon-link" href="#">Досягнення</a>
                    </div>
                    <div className="dropdown-list-item">
                      <img className="icon-img" src={notifications} alt="Notifications"/><a className="icon-link" href="#">Сповіщення</a>
                    </div>
                    <div className="dropdown-list-item">
                      <img className="icon-img" src={help} alt="Help"/><a className="icon-link" href="#">Допомога</a>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </header>
     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />          
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/validation" element={<ValidationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/addevent" element={<AddEventPage />} />
          <Route path="/event/:id" element={<EventPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
