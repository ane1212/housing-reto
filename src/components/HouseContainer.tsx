import { fetchHousePrediction } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import House from "./House";
import type { HouseResponse } from "../services/types/house";

interface HouseContainerProps {
  queryString?: string;
  seriesId?: string;
  onSeriesLoaded?: (id: string, data: HouseResponse) => void;
}

export default function HouseContainer({
  queryString = "",
  seriesId = "Predicción",
  onSeriesLoaded,
}: HouseContainerProps) {
  // 1. Añadimos <HouseResponse> como genérico al useQuery
  const { data, isLoading, error, isSuccess, isError } =
    useQuery<HouseResponse>({
      queryKey: ["house-prediction", queryString],
      queryFn: () => fetchHousePrediction(queryString),
      retry: 1,
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    // 2. Al asegurar que data no es undefined, TypeScript se queda tranquilo
    if (isSuccess && data && onSeriesLoaded) {
      onSeriesLoaded(seriesId, data);
    }
  }, [isSuccess, data, seriesId, onSeriesLoaded]);

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(`Precio cargado: $${data.price}`);
    }

    if (isError && error) {
      toast.error(
        error instanceof Error ? error.message : "Error al consultar el precio",
      );
    }
  }, [isSuccess, isError, data, error]);

  if (isLoading) return <div>Cargando precio...</div>;
  if (isError) return <div>Error al cargar la predicción.</div>;

  return <House data={data!} />;
}
