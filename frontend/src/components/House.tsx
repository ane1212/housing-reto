import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import "./ValoraLanding.css";

interface FormData {
  surface: string;
  bedrooms: string;
  restrooms: string;
}

interface HouseResponse {
  prediction: number;
}

export default function ValoraLanding() {
  const [formData, setFormData] = useState<FormData>({
    surface: "",
    bedrooms: "",
    restrooms: "",
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [data, setData] = useState<HouseResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.surface || !formData.bedrooms || !formData.restrooms) {
      alert("Por favor, completa todos los campos");
      return;
    }

    if (
      parseFloat(formData.surface) <= 0 ||
      parseFloat(formData.bedrooms) <= 0 ||
      parseFloat(formData.restrooms) <= 0
    ) {
      alert("Los valores deben ser mayores a 0");
      return;
    }

    setHasSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      surface: "",
      bedrooms: "",
      restrooms: "",
    });
    setHasSubmitted(false);
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!hasSubmitted) return;

    const fetchPrediction = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const queryString = `surface=${formData.surface}&bedrooms=${formData.bedrooms}&restrooms=${formData.restrooms}`;
        const response = await fetch(
          `http://localhost:5000/prediction?${queryString}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener la valoración");
        }

        const result: HouseResponse = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al obtener la valoración");
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrediction();
  }, [hasSubmitted, formData.surface, formData.bedrooms, formData.restrooms]);

  return (
    <div className="landing-container">
      <div className="hero-glow" />
      <div className="hero-grid" />

      <div className="landing-content">
        <div className="hero-badge">
          <div className="hero-badge-dot" />
        </div>

        <div className="header">
          <img src={logo} alt="Valora Logo" className="logo" />
          <h1 className="hero-name">
            VALORA<span>.</span>
          </h1>
          <p className="hero-tagline">Predicción de alquiler</p>
          <p className="hero-desc">
            Obtén una valoración estimada de tu inmueble en segundos utilizando nuestro modelo de machine learning avanzado
          </p>
        </div>

        <form onSubmit={handleSubmit} className="valuation-form">
          <div className="form-group">
            <label htmlFor="surface" className="field-label">
              Superficie (m²)
            </label>
            <input
              type="number"
              id="surface"
              name="surface"
              value={formData.surface}
              onChange={handleChange}
              placeholder="Ej: 100"
              className="input"
              step="0.01"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bedrooms" className="field-label">
              Habitaciones
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="Ej: 2"
              className="input"
              step="1"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="restrooms" className="field-label">
              Baños
            </label>
            <input
              type="number"
              id="restrooms"
              name="restrooms"
              value={formData.restrooms}
              onChange={handleChange}
              placeholder="Ej: 1"
              className="input"
              step="1"
              min="0"
            />
          </div>

          <div className="button-row">
            <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
              {isLoading ? "Valora..." : "VALORAR"}
            </button>
            <button type="button" className="btn btn-outline btn-lg" onClick={handleReset}>
              Limpiar
            </button>
          </div>
        </form>

        {data && !error && (
          <div className="price-card">
            <div className="price-label">Valoración Estimada</div>
            <div className="price-amount">
              €{data.prediction.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <button onClick={handleReset} className="btn btn-ghost btn-sm" style={{ marginTop: "20px" }}>
              Nueva valoración
            </button>
          </div>
        )}

        {error && (
          <div className="error-card">
            <div className="error-icon">⚠</div>
            <div className="error-title">Error en la valoración</div>
            <p className="error-message">{error}</p>
            <button onClick={handleReset} className="btn btn-amber btn-sm">
              Intentar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}