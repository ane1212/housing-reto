import React, { useState } from 'react';
// Importamos la interfaz y el objeto con los nombres correctos
import { ProvinceName, type HouseRequest } from '../services/types/house';

const Formulario = () => {
    const [params, setParams] = useState<HouseRequest>({
        surface: 0,
        bedrooms: 0,
        restrooms: 0,
        location_name: ProvinceName.Bizkaia
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const finalValue = e.target.type === 'number' && value !== '' ? Number(value) : value;

        setParams((prev) => ({
            ...prev,
            [name]: finalValue,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!params.surface || params.bedrooms === '' as any || params.restrooms === '' as any) {
            alert('Por favor, rellena todos los campos numéricos.');
            return;
        }

        console.log('Datos listos para enviar:', params);

        const queryParams = new URLSearchParams({
            surface: params.surface.toString(),
            bedrooms: params.bedrooms.toString(),
            restrooms: params.restrooms.toString(),
            location_name: params.location_name,
        });

        const finalUrl = `http://localhost:5000/prediction?${queryParams.toString()}`;
        console.log('URL Generada:', finalUrl);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
            <div>
                <label htmlFor="surface">Metros (m²): </label>
                <input
                    type="number"
                    id="surface"
                    name="surface"
                    value={params.surface}
                    onChange={handleChange}
                    min="1"
                    required
                />
            </div>

            <div>
                <label htmlFor="bedrooms">Bedrooms: </label>
                <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    value={params.bedrooms}
                    onChange={handleChange}
                    min="0"
                    required
                />
            </div>

            <div>
                <label htmlFor="restrooms">Restrooms: </label>
                <input
                    type="number"
                    id="restrooms"
                    name="restrooms"
                    value={params.restrooms}
                    onChange={handleChange}
                    min="0"
                    required
                />
            </div>

            <div>
                <label htmlFor="location_name">Provincia: </label>
                <select
                    id="location_name"
                    name="location_name"
                    value={params.location_name}
                    onChange={handleChange}
                    required
                >
                    {Object.entries(ProvinceName).map(([key, value]) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit">Enviar Predicción</button>
        </form>
    );
};

export default Formulario;