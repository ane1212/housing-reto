import type { HouseResponse } from "../services/types/house";

export default function House({ data: data }: { data: HouseResponse }) {
  return (
    <>
      <div>
        <h2>Predicción de Precio</h2>
        <p>El precio estimado es: {data.price}</p>
      </div>
    </>
  );
}
