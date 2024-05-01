import React, { useState, useRef, useEffect } from 'react';

import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import HomePage from './pages/HomePage';
import ValidationPage from './pages/ValidationPage';
import ProfilePage from './pages/ProfilePage';
import AddEventPage from './pages/AddEventPage';
import EventPage from './pages/EventPage';
import SearchResultsPage from './pages/SearchResultsPage.js';


import HeaderComponent from './components/HeaderComponent.jsx';

import './App.css';

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {

  return (
    <div className="App">
      {/* Header */}
      <HeaderComponent />
      {/*Pages*/}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />          
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/auth/validation" element={<ValidationPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/addevent" element={<AddEventPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path='/search' element={<SearchResultsPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
