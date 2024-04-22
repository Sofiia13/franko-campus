import React, { useState, useRef, useEffect } from 'react';

const DropdownComponent = ({ icon, buttonText, menuItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
        const newState = !prev;
        console.log("Menu state:", newState);
        return newState;
      });
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

  return (
    <div className="dropdown" ref={menuRef}>
      <button className="icon-button dropdown-button" onClick={toggleMenu}>
      {icon ? <span className="dropdown-icon">{icon}</span> : buttonText}
      </button>
      <div className={`dropdown-content ${menuOpen ? 'show' : ''}`}>
        {menuItems}
      </div>
    </div>
  );
  
};

export default DropdownComponent;
