import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchFlights } from '../services/flightService';

interface FlightSearch {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: string;
}

interface FlightResult {
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

interface FlightContextType {
  searchParams: FlightSearch;
  setSearchParams: (params: FlightSearch) => void;
  searchResults: FlightResult[];
  isLoading: boolean;
  error: string | null;
  searchFlights: () => void;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const FlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useState<FlightSearch>({
    origin: '',
    destination: '',
    departureDate: '',
    passengers: 1,
    cabinClass: 'economy',
  });

  const { data: searchResults = [], isLoading, error, refetch } = useQuery({
    queryKey: ['flights', searchParams],
    queryFn: () => searchFlights(searchParams),
    enabled: false,
  });

  const handleSearchFlights = () => {
    if (searchParams.origin && searchParams.destination && searchParams.departureDate) {
      refetch();
    }
  };

  const value = {
    searchParams,
    setSearchParams,
    searchResults,
    isLoading,
    error: error?.message || null,
    searchFlights: handleSearchFlights,
  };

  return <FlightContext.Provider value={value}>{children}</FlightContext.Provider>;
};

export const useFlight = () => {
  const context = useContext(FlightContext);
  if (context === undefined) {
    throw new Error('useFlight must be used within a FlightProvider');
  }
  return context;
}; 