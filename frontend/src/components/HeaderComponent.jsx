import React, { useState } from 'react';
import logo from '../img/logo.svg';
import search from '../img/search.svg';
import mode from '../img/mode.svg';
import catalog from '../img/catalog.svg';
import profile from '../img/profile.svg';
import menu from '../img/menu.svg';
import achievements from '../img/achievements.svg';
import friends from '../img/friends.svg';
import help from '../img/help.svg';
import notifications from '../img/notifications.svg';
import settings from '../img/settings.svg';

import DropdownComponent from './DropdownComponent';

const HeaderComponent = () => {
  const [iconDescription, setIconDescription] = useState('');

  const handleMouseEnter = (description) => {
    setIconDescription(description);
  };

  const handleMouseLeave = () => {
    setIconDescription('');
  };

  const menuItems = (
    <>
      <div className="dropdown-list-item">
        <img className="icon-img" src={settings} alt="Settings" />
        <a className="icon-link" href="#">Налаштування</a>
      </div>
      <div className="dropdown-list-item">
        <img className="icon-img" src={friends} alt="Friends" />
        <a className="icon-link" href="#">Друзі</a>
      </div>
      <div className="dropdown-list-item">
        <img className="icon-img" src={achievements} alt="Achievements" />
        <a className="icon-link" href="#">Досягнення</a>
      </div>
      <div className="dropdown-list-item">
        <img className="icon-img" src={notifications} alt="Notifications" />
        <a className="icon-link" href="#">Сповіщення</a>
      </div>
      <div className="dropdown-list-item">
        <img className="icon-img" src={help} alt="Help" />
        <a className="icon-link" href="#">Допомога</a>
      </div>
    </>
  );

  return (
    <header className="header">
      {/* Logo */}
      <div className='logo'>
        <a href="/">
          <img className="logo-img" src={logo} alt="Логотип" />
        </a>
        <a href="/">
          <h2 className='logo-text'>Franko Campus</h2>
        </a>
      </div>

      {/* Search */}
      <form className="search" role="search">
        <input className="search-input" type="search" placeholder="Пошук" />
        <button className="search-button" type="submit">
          <img className="search-img" src={search} alt="Пошук" />
        </button>
      </form>

      {/* Icons */}
      <div className='icons-bar'>
        <div className='icon' onMouseEnter={() => handleMouseEnter('Змінити тему сайту')} onMouseLeave={handleMouseLeave}>
          <button className="icon-button">
            <img className="icon-img" src={mode} alt="Змінити тему сайту" />
          </button>
        </div>
        
        <div className='icon' onMouseEnter={() => handleMouseEnter('Каталог подій')} onMouseLeave={handleMouseLeave}>
          <a className="icon-link" href="#">
            <img className="icon-img" src={catalog} alt="Каталог подій" />
          </a>
        </div>

        <div className='icon' onMouseEnter={() => handleMouseEnter('Профіль')} onMouseLeave={handleMouseLeave}>
          <a className="icon-link" href="/profile">
            <img className="icon-img" src={profile} alt="Профіль" />
          </a>
        </div>

        {/* Icon Description on Hover */}
        {iconDescription && (
          <div className="icon-description">
            {iconDescription}
          </div>
        )}

        {/* Dropdown Menu */}
        <div className='icon'>
          <DropdownComponent 
            icon={<img className="icon-img" src={menu} alt="Меню" />} 
            menuItems={menuItems} 
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
