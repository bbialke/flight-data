declare module 'flight-data' {
  export default class flightdata {
    static flights(input: {
      API_TOKEN: string;
      options: {
        airline_name?: string;
        arr_iata?: string;
        arr_icao?: string;
        dep_iata?: string;
        dep_icao?: string;
        flight_date?: string;
        flight_iata?: string;
        flight_icao?: string;
        flight_number?: string;
        flight_status?: string;
        limit?: number;
      }
    }): Promise<{
      count: number;
      data: {
        flight_date: string;
        flight_status: string;
        departure: object;
        arrival: object;
        airline: object;
        flight: object;
        aircraft: object,
        live: object
      }[];
    }>;
  }
}
