export const ProvinceName = {
  ACoruna: "A Coruña",
  Alacant: "Alacant",
  Albacete: "Albacete",
  Almería: "Almería",
  Araba: "Araba",
  Asturias: "Asturias",
  Ávila: "Ávila",
  Badajoz: "Badajoz",
  Barcelona: "Barcelona",
  Bizkaia: "Bizkaia",
  Burgos: "Burgos",
  Cáceres: "Cáceres",
  Cádiz: "Cádiz",
  Cantabria: "Cantabria",
  Castelló: "Castelló",
  Ciudad_Real: "Ciudad Real",
  Córdoba: "Córdoba",
  Cuenca: "Cuenca",
  Gipuzkoa: "Gipuzkoa",
  Girona: "Girona",
  Granada: "Granada",
  Guadalajara: "Guadalajara",
  Huelva: "Huelva",
  Huesca: "Huesca",
  Illes_Balears: "Illes Balears",
  Jaén: "Jaén",
  La_Rioja: "La Rioja",
  Las_Palmas: "Las Palmas",
  León: "León",
  Lleida: "Lleida",
  Lugo: "Lugo",
  Madrid: "Madrid",
  Málaga: "Málaga",
  Murcia: "Murcia",
  Navarra: "Navarra",
  Ourense: "Ourense",
  Palencia: "Palencia",
  Pontevedra: "Pontevedra",
  Salamanca: "Salamanca",
  Santa_Cruz_Tenerife: "Santa Cruz de Tenerife",
  Segovia: "Segovia",
  Sevilla: "Sevilla",
  Soria: "Soria",
  Tarragona: "Tarragona",
  Teruel: "Teruel",
  Toledo: "Toledo",
  Valencia: "Valencia",
  Valladolid: "Valladolid",
  Zamora: "Zamora",
  Zaragoza: "Zaragoza",
} as const;

export type ProvinceName = (typeof ProvinceName)[keyof typeof ProvinceName];

export interface HouseResponse {
  prediction: number;
}

export interface HouseRequest {
  surface: number;
  bedrooms: number;
  restrooms: number;
  location_name: ProvinceName;
}
