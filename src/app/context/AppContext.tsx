import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { NapSpot, MOCK_SPOTS } from '../types';

interface AppContextType {
  savedSpots: Set<string>;
  toggleSaveSpot: (spotId: string) => void;
  isSaved: (spotId: string) => boolean;
  filteredSpots: NapSpot[];
  applyFilters: (filters: FilterState) => void;
  resetFilters: () => void;
}

interface FilterState {
  noiseLevel?: string;
  seatingType?: string;
  availability?: string;
  maxWalkTime?: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
const BasePathContext = createContext('');

export function AppProvider({ children }: { children: ReactNode }) {
  const [savedSpots, setSavedSpots] = useState<Set<string>>(new Set(['2', '3']));
  const [filters, setFilters] = useState<FilterState>({});
  const [filteredSpots, setFilteredSpots] = useState<NapSpot[]>(MOCK_SPOTS);

  const toggleSaveSpot = (spotId: string) => {
    setSavedSpots(prev => {
      const newSet = new Set(prev);
      if (newSet.has(spotId)) {
        newSet.delete(spotId);
      } else {
        newSet.add(spotId);
      }
      return newSet;
    });
  };

  const isSaved = (spotId: string) => savedSpots.has(spotId);

  const applyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);

    let filtered = [...MOCK_SPOTS];

    if (newFilters.noiseLevel && newFilters.noiseLevel !== 'Any') {
      filtered = filtered.filter(spot => spot.noiseLevel === newFilters.noiseLevel);
    }

    if (newFilters.seatingType) {
      filtered = filtered.filter(spot => spot.seating === newFilters.seatingType);
    }

    if (newFilters.availability === 'Open Only') {
      filtered = filtered.filter(spot => spot.status === 'Open');
    }

    if (newFilters.maxWalkTime) {
      const maxMinutes = parseInt(newFilters.maxWalkTime);
      filtered = filtered.filter(spot => {
        const spotMinutes = parseInt(spot.walkTime);
        return spotMinutes <= maxMinutes;
      });
    }

    setFilteredSpots(filtered);
  };

  const resetFilters = () => {
    setFilters({});
    setFilteredSpots(MOCK_SPOTS);
  };

  return (
    <AppContext.Provider value={{ savedSpots, toggleSaveSpot, isSaved, filteredSpots, applyFilters, resetFilters }}>
      {children}
    </AppContext.Provider>
  );
}

export function BasePathProvider({ basePath, children }: { basePath: string; children: ReactNode }) {
  return <BasePathContext.Provider value={basePath}>{children}</BasePathContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export function useBasePath() {
  return useContext(BasePathContext);
}

export function useNav() {
  const navigate = useNavigate();
  const basePath = useBasePath();
  return useCallback(
    (to: string | number) => {
      if (typeof to === 'number') {
        navigate(to);
      } else {
        navigate(`${basePath}${to}`);
      }
    },
    [navigate, basePath],
  );
}
