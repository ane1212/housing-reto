import React from 'react';
import './Reader.css';

interface ReaderProps {
  prediction: number | null;
  loading: boolean;
  error: string | null;
  inputs: {
    surface: string;
    bedrooms: string;
    restrooms: string;
    province: string;
  };
}

const Reader: React.FC<ReaderProps> = ({ prediction, loading, error, inputs }) => {
  
  if (loading) {
    return (
      <div className="read-container loading">
        <div className="spinner"></div>
        <p>Calculando la predicción</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="read-container error-box">
        <span className="error-icon"></span>
        <h3>Error en la lectura</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (prediction === null) {
    return (
      <div className="read-container placeholder">
        <p>Introduce la provincia y datos del inmueble</p>
      </div>
    );
  }

  const formattedProvince = inputs.province 
    ? inputs.province.charAt(0).toUpperCase() + inputs.province.slice(1).toLowerCase()
    : 'No especificada';

  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(prediction);

  return (
    <div className="read-container success-box">
      <div className="read-header">
        <span className="badge">Análisis completado</span>
        <h3>Precio Estimado en {formattedProvince}</h3>
        <div className="price-tag">{formattedPrice}</div>
      </div>

      <div className="read-summary">
        <h4>Métricas de lectura</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Provincia</span>
            <span className="summary-value province-highlight">{formattedProvince}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Superficie</span>
            <span className="summary-value">{inputs.surface} m²</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Habitaciones</span>
            <span className="summary-value">{inputs.bedrooms}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Baños</span>
            <span className="summary-value">{inputs.restrooms}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reader;