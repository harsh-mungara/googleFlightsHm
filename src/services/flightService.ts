import axios from 'axios';

const RAPID_API_KEY = '7f460cd226msh5ce7314c922e423p1700bajsn5784fc3efd3c';
const RAPID_API_HOST = 'sky-scrapper.p.rapidapi.com';

const api = axios.create({
  baseURL: `https://${RAPID_API_HOST}`,
  headers: {
    'X-RapidAPI-Key': RAPID_API_KEY,
    'X-RapidAPI-Host': RAPID_API_HOST,
  },
});

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: string;
}

export interface FlightResult {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
  };
  arrival: {
    airport: string;
    time: string;
  };
  duration: string;
  price: number;
  stops: number;
}

export const searchFlights = async (params: FlightSearchParams): Promise<FlightResult[]> => {
  try {
    const response = await api.get('/api/v1/flights/searchFlights', {
      params: {
        originSkyId: params.origin,
        destinationSkyId: params.destination,
        originEntityId: '27544008',
        destinationEntityId: '27537542',
        date: params.departureDate,
        returnDate: params.returnDate,
        adults: params.passengers,
        cabinClass: params.cabinClass,
        currency: 'USD',
      },
    });

    return response.data.data?.map((flight: any) => ({
      id: flight.id || Math.random().toString(),
      airline: flight.legs?.[0]?.carriers?.marketing?.[0]?.name || 'Unknown',
      flightNumber: flight.legs?.[0]?.carriers?.marketing?.[0]?.flightNumber || '',
      departure: {
        airport: flight.legs?.[0]?.origin?.name || '',
        time: flight.legs?.[0]?.departure || '',
      },
      arrival: {
        airport: flight.legs?.[0]?.destination?.name || '',
        time: flight.legs?.[0]?.arrival || '',
      },
      duration: flight.legs?.[0]?.duration || '',
      price: flight.pricingOptions?.[0]?.price?.amount || 0,
      stops: (flight.legs?.[0]?.stopCount || 0) - 1,
    })) || [];
  } catch (error) {
    console.error('Error searching flights:', error);
    throw new Error('Failed to search flights');
  }
};

export const getAirportSuggestions = async (query: string) => {
  try {
    const response = await api.get('/api/v1/flights/airports', {
      params: {
        query,
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error('Error getting airport suggestions:', error);
    return [];
  }
}; 