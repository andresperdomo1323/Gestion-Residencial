import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Homepage/Home';
import Login from './Components/login/Login';
import Details from './Components/Details/Details';

function App() {
  const [torres, setTorres] = useState(() => {
    const storedTorres = localStorage.getItem('torres');
    return storedTorres ? JSON.parse(storedTorres) : Array.from({ length: 7 }, (_, index) => ({
      id: index + 1,
      nombre: `Torre ${index + 1}`,
      descripcion: `Descripción de la Torre ${index + 1}. Información adicional.`,
      items: Math.floor(Math.random() * 20) + 1,
      pisos: 10,
      apartamentos: 20,
      apartamentosTotales: 10 * 20,
    }));
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home torres={torres} setTorres={setTorres} />} /> {/* Pasa torres y setTorres */}
        <Route path="/torre/:id" element={<Details torres={torres} />} /> {/* Agrega la ruta para TorreDetalles */}
      </Routes>
    </Router>
  );
}

export default App;