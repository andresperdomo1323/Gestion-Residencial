import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParking, faBuilding, faCar } from '@fortawesome/free-solid-svg-icons';

function TorreDetalles({ torres }) {
  const { id } = useParams();
  const torre = torres.find((torre) => torre.id === parseInt(id));

  const [parqueaderos, setParqueaderos] = useState(() => {
    if (torre) {
      const storedParqueaderos = localStorage.getItem(`parqueaderos-${id}`);
      return storedParqueaderos ? JSON.parse(storedParqueaderos) : {};
    }
    return {};
  });

  useEffect(() => {
    if (torre) {
      localStorage.setItem(`parqueaderos-${id}`, JSON.stringify(parqueaderos));
    }
  }, [parqueaderos, id, torre]);

  if (!torre) {
    return <div>Torre no encontrada</div>;
  }

  const apartamentosPorPiso = {};
  for (let piso = 1; piso <= torre.pisos; piso++) {
    apartamentosPorPiso[piso] = [];
    for (let apartamento = 1; apartamento <= torre.apartamentos; apartamento++) {
      const numeroApartamento = `${piso}${apartamento.toString().padStart(2, '0')}`;
      apartamentosPorPiso[piso].push(numeroApartamento);
    }
  }

  const pisosArray = Object.keys(apartamentosPorPiso);

  const handleParqueaderoClick = (apartamento) => {
    const tipoVehiculo = prompt(`Ingrese el tipo de vehículo para el apartamento ${apartamento}:`);
    const placas = prompt(`Ingrese las placas del vehículo para el apartamento ${apartamento}:`);
    if (tipoVehiculo && placas) {
      setParqueaderos({ ...parqueaderos, [apartamento]: { tipoVehiculo, placas } });
    } else {
      const updatedParqueaderos = { ...parqueaderos };
      delete updatedParqueaderos[apartamento];
      setParqueaderos(updatedParqueaderos);
    }
  };

  return (
    <div className="torre-detalles-container">
      <div className="torre-nombre">
        <FontAwesomeIcon icon={faBuilding} className="torre-icon" />
        <h2>{torre.nombre}</h2>
      </div>
      <div className="apartamentos-lista">
        {pisosArray.map((piso, index) => {
          if (index % 2 === 0) {
            const siguientePiso = pisosArray[index + 1];
            return (
              <div key={piso} className="pisos-fila">
                <div className="apartamento-piso">
                  <h4>Piso {piso}</h4>
                  <div className="apartamentos-grid">
                    {apartamentosPorPiso[piso].map((apartamento) => (
                      <div
                        key={apartamento}
                        className={`apartamento-card ${parqueaderos[apartamento] ? 'ocupado' : ''}`}
                        onClick={() => handleParqueaderoClick(apartamento)}
                      >
                        <FontAwesomeIcon
                          icon={parqueaderos[apartamento] ? faCar : faParking}
                          className="parqueadero-icon"
                        />
                        {apartamento}
                        {parqueaderos[apartamento] && (
                          <div className="vehiculo-info">
                            {parqueaderos[apartamento].tipoVehiculo} - {parqueaderos[apartamento].placas}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {siguientePiso && (
                  <div className="apartamento-piso">
                    <h4>Piso {siguientePiso}</h4>
                    <div className="apartamentos-grid">
                      {apartamentosPorPiso[siguientePiso].map((apartamento) => (
                        <div
                          key={apartamento}
                          className={`apartamento-card ${parqueaderos[apartamento] ? 'ocupado' : ''}`}
                          onClick={() => handleParqueaderoClick(apartamento)}
                        >
                          <FontAwesomeIcon
                            icon={parqueaderos[apartamento] ? faCar : faParking}
                            className="parqueadero-icon"
                          />
                          {apartamento}
                          {parqueaderos[apartamento] && (
                            <div className="vehiculo-info">
                              {parqueaderos[apartamento].tipoVehiculo} - {parqueaderos[apartamento].placas}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default TorreDetalles;