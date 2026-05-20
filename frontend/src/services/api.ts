import type { HouseResponse } from "./types/house";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000";

export async function fetchHousePrediction(
  queryString: string = "",
): Promise<HouseResponse> {
  const baseUrl = BACKEND_URL.endsWith("/")
    ? BACKEND_URL.slice(0, -1)
    : BACKEND_URL;
  const url = `${baseUrl}/prediction${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || `Error HTTP ${res.status}`);
  }

  if (json.error_message) {
    throw new Error(json.error_message);
  }

  return json;
}
