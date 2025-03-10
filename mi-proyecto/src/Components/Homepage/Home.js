import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Home({ torres, setTorres }) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [modalTorre, setModalTorre] = useState({
    numTorres: 1,
    pisosPorTorre: 10,
    apartamentosPorPiso: 20,
    descripcion: 'Descripción de la Torre.',
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [torreToDelete, setTorreToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem('torres', JSON.stringify(torres));
  }, [torres]);

  const handleAddTorreClick = () => {
    setModalMode('add');
    setModalTorre({ numTorres: 1, pisosPorTorre: 10, apartamentosPorPiso: 20, descripcion: 'Descripción de la Torre.' });
    setShowModal(true);
  };

  const handleEditTorre = (torre) => {
    setModalMode('edit');
    setModalTorre(torre);
    setShowModal(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newTorres = [];
      for (let i = 0; i < modalTorre.numTorres; i++) {
        const newId = torres.length > 0 ? torres[torres.length - 1].id + 1 + i : 1 + i;
        const apartamentosTotales = modalTorre.pisosPorTorre * modalTorre.apartamentosPorPiso;
        newTorres.push({
          id: newId,
          nombre: `Torre ${newId}`,
          descripcion: modalTorre.descripcion,
          items: 0,
          pisos: modalTorre.pisosPorTorre,
          apartamentos: modalTorre.apartamentosPorPiso,
          apartamentosTotales: apartamentosTotales,
        });
      }
      setTorres([...torres, ...newTorres]);
    } else {
      const updatedTorres = torres.map((torre) =>
        torre.id === modalTorre.id ? modalTorre : torre
      );
      setTorres(updatedTorres);
    }
    setShowModal(false);
  };

  const handleDeleteTorre = (id) => {
    setTorreToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteTorre = () => {
    const updatedTorres = torres.filter((torre) => torre.id !== torreToDelete);
    setTorres(updatedTorres);
    setShowDeleteModal(false);
    setTorreToDelete(null);
  };

  const handleVerDetalles = (torreId) => {
    navigate(`/torre/${torreId}`);
  };

  return (
    <div className="homepage-container">
      <div>
        <Navbar />
      </div>
      <button className="add-torre-button" onClick={handleAddTorreClick}>Agregar Torre</button>
      <div className="torres-grid-container">
        <div className="torres-grid" style={{ justifyContent: torres.length < 3 ? 'center' : 'start' }}>
          {torres.map((torre) => (
            <div key={torre.id} className="torre-item">
              <FontAwesomeIcon icon={faBuilding} className="torre-icon" />
              <div className="torre-content">
                <h3>{torre.nombre}</h3>
                <p>{torre.descripcion}</p>
                <p>Items: {torre.items}</p>
                <div className="button-container">
                  <button className="torre-button" onClick={() => handleVerDetalles(torre.id)}>Ver Detalles</button>
                  <button className="edit-button" onClick={() => handleEditTorre(torre)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="edit-button" onClick={() => handleDeleteTorre(torre.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="form-overlay">
          <form className="torre-form" onSubmit={handleModalSubmit}>
            <h3>{modalMode === 'add' ? 'Agregar Torres' : 'Editar Torre'}</h3>
            {modalMode === 'add' && (
              <>
                <label>Número de Torres:</label>
                <input type="number" value={modalTorre.numTorres} onChange={(e) => setModalTorre({ ...modalTorre, numTorres: parseInt(e.target.value) })} />
                <label>Pisos por Torre:</label>
                <input type="number" value={modalTorre.pisosPorTorre} onChange={(e) => setModalTorre({ ...modalTorre, pisosPorTorre: parseInt(e.target.value) })} />
                <label>Apartamentos por Piso:</label>
                <input type="number" value={modalTorre.apartamentosPorPiso} onChange={(e) => setModalTorre({ ...modalTorre, apartamentosPorPiso: parseInt(e.target.value) })} />
                <label>Descripción:</label>
                <textarea value={modalTorre.descripcion} onChange={(e) => setModalTorre({ ...modalTorre, descripcion: e.target.value })} />
              </>
            )}
            {modalMode === 'edit' && (
              <>
                <label>Descripción:</label>
                <textarea value={modalTorre.descripcion} onChange={(e) => setModalTorre({ ...modalTorre, descripcion: e.target.value })} />
                <label>Pisos:</label>
                <input type="number" value={modalTorre.pisos} onChange={(e) => setModalTorre({ ...modalTorre, pisos: parseInt(e.target.value) })} />
                <label>Apartamentos:</label>
                <input type="number" value={modalTorre.apartamentos} onChange={(e) => setModalTorre({ ...modalTorre, apartamentos: parseInt(e.target.value) })} />
              </>
            )}
            <button type="submit">{modalMode === 'add' ? 'Agregar' : 'Guardar'}</button>
            <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
          </form>
        </div>
      )}

      {showDeleteModal && (
        <div className="form-overlay">
          <div className="torre-form">
            <h3>¿Estás seguro de que quieres eliminar esta torre?</h3>
            <div className="button-container">
              <button className="torre-form button" onClick={confirmDeleteTorre}>Sí, eliminar</button>
              <button className="torre-form button" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;