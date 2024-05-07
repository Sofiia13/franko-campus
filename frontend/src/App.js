import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ValidationPage from "./pages/ValidationPage";
import ProfilePage from "./pages/ProfilePage";
import AddEventPage from "./pages/AddEventPage";
import EventPage from "./pages/EventPage";
import SearchResultsPage from "./pages/SearchResultsPage.js";
import CataloguePage from './pages/CataloguePage.js';


import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="content-wrap">
          {/* Header */}
          <HeaderComponent />
          {/*Pages*/}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
            <Route path="/auth/validation" element={<ValidationPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/addevent" element={<AddEventPage />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/search/:query" element={<SearchResultsPage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
          </Routes>
          
        </div>
        {/* Footer */}
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
