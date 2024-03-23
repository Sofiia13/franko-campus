import logo from './img/logo_img.png';
import achievements from './img/achievements.svg';
import friends from './img/friends.svg';
import help from './img/help.svg';
import notifications from './img/notifications.svg';
import settings from './img/settings.svg';

import LoginPage from './pages/LoginPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import ValidationPage from './pages/ValidationPage';

import './App.css';
import './css/header.css';
import './css/form.css';
import './css/cards.css';

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <header className="header">
        <nav id="header-nav" className="navbar">
          <div className="container-fluid">
            {/* Logo image */}
            <a href="index.html" className="float-start d-none d-sm-block">
              <div>
                <img id="logo-img" src={logo} alt="Logo image"></img>
              </div>
            </a>

            {/* Logo text */}
            <div className="navbar-brand">
              <a href="index.html">
                <h1>Franko Campus</h1>
              </a>
            </div>

            {/* Search */}
            <form className="d-flex" role="search">
              <input className="form-control me-2 nav-item__search" type="search" placeholder="Пошук" aria-label="Search" />
              <button className="btn btn-outline-success nav-item__search" type="submit">Пошук</button>
            </form>

            {/* Menu button */}
            <button className="navbar-toggler float-end" type="button" data-bs-toggle="collapse" data-bs-target="#collapsable-nav"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsable-nav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#">Налаштування</a><img className="nav-item__img-drop" src={settings} alt="Settings image"></img>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Друзі</a><img className="nav-item__img-drop" src={friends} alt="Friends image"></img>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Досягнення</a><img className="nav-item__img-drop" src={achievements} alt="Achievements image"></img>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Сповіщення</a><img className="nav-item__img-drop" src={notifications} alt="Notifications image"></img>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Допомога</a><img className="nav-item__img-drop" src={help} alt="Help image"></img>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2 nav-item__search-drop" type="search" placeholder="Пошук" aria-label="Search"></input>
                <button className="btn btn-outline-success nav-item__search-drop" type="submit">Пошук</button>
              </form>
            </div>
          </div>
        </nav>
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
