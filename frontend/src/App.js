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

import './App.css';

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { toggleDropdown } from './js/animation.js';

function App() {
  return (
    <div className="App">
      <header className="header">
         {/* Logo */}
        <div className='logo'>
          <a href="/">
            <img className="logo-img" src={logo} alt="Logo"></img>
          </a>  
          <a href="/">
            <h2 className='logo-text'>Franko Campus</h2>
          </a>
        </div>
        {/* Search */}
        <form className="search" role="search">
          <input className="search-input" type="search" placeholder="Пошук"/>
          <button className="search-button" type="submit">
            <img className="search-img" src={search} alt="Search"></img>
          </button>
        </form>

        {/* Icons */}
        <div className='icons-bar'>
          <div className='icon'>
            <button className="icon-button">
              <img className="icon-img" src={mode} alt="Mode"></img>
            </button>
          </div>
          <div className='icon'>
            <a className="icon-link" href="#">
              <img className="icon-img" src={catalog} alt="Catalog"></img>
            </a>
          </div>
          <div className='icon'>
            <a className="icon-link" href="#">
              <img className="icon-img" src={profile} alt="Profile"></img>
            </a>
          </div>
          {/* Dropdown menu */}
          <div className='icon'>
            <div className='dropdown'>
                <button className="icon-button dropdown-button" onclick="toggleDropdown()">
                  <img className="icon-img" src={menu} alt="Menu"></img>
                </button>
                  <div className="dropdown-content" id='dropdown'>
                    <div className="dropdown-list-item">
                      <a className="icon-link" href="#">Налаштування</a><img className="icon-img" src={settings} alt="Settings"></img>
                    </div>
                    <div className="dropdown-list-item">
                      <a className="icon-link" href="#">Друзі</a><img className="icon-img" src={friends} alt="Friends"></img>
                    </div>
                    <div className="dropdown-list-item">
                      <a className="icon-link" href="#">Досягнення</a><img className="icon-img" src={achievements} alt="Achievements"></img>
                    </div>
                    <div className="dropdown-list-item">
                      <a className="icon-link" href="#">Сповіщення</a><img className="icon-img" src={notifications} alt="Notifications"></img>
                    </div>
                    <div className="dropdown-list-item">
                      <a className="icon-link" href="#">Допомога</a><img className="icon-img" src={help} alt="Help"></img>
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
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
