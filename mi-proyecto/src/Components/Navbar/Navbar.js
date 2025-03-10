import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'; // Importa el icono de lápiz

function Navbar() {
  const [nombreConjunto, setNombreConjunto] = useState(() => {
    const storedNombre = localStorage.getItem('nombreConjunto');
    return storedNombre ? storedNombre : 'Mi Conjunto Residencial';
  });
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    localStorage.setItem('nombreConjunto', nombreConjunto);
  }, [nombreConjunto]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleNombreClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setNombreConjunto(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDAbAWFhOJs94yaaJrjZgdN2K_CO8c8OBHg&s"
          alt="Edificio Icono"
          style={{ height: '60px', width: '80px', marginRight: '5px' }}
        />
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={nombreConjunto}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            style={{ width: '150px' }}
          />
        ) : (
          <span style={{ display: 'inline', alignItems: 'center' }}>
            {nombreConjunto}
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ marginLeft: '5px', cursor: 'pointer' }}
              onClick={handleNombreClick} // Agrega el evento onClick al icono
            />
          </span>
        )}
      </a>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar}
        aria-controls="navbarNav"
        aria-expanded={!isCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`}
        id="navbarNav"
      >
        <ul className="navbar-nav ms-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Inicio <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/perfil">
              Perfil
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contacto">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;