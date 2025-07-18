import React, { createContext, useContext, useState, useEffect } from 'react';

export interface FavoriteTeam {
  id: string;
  name: string;
  logo: string;
  league: string;
  position: number;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  dateAdded: string;
}

interface FavoritesContextType {
  favorites: FavoriteTeam[];
  addToFavorites: (team: FavoriteTeam) => void;
  removeFromFavorites: (teamId: string) => void;
  updateFavorite: (teamId: string, updatedTeam: Partial<FavoriteTeam>) => void;
  isFavorite: (teamId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteTeam[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('football-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('football-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (team: FavoriteTeam) => {
    const newTeam = {
      ...team,
      dateAdded: new Date().toISOString()
    };
    setFavorites(prev => [...prev, newTeam]);
  };

  const removeFromFavorites = (teamId: string) => {
    setFavorites(prev => prev.filter(team => team.id !== teamId));
  };

  const updateFavorite = (teamId: string, updatedTeam: Partial<FavoriteTeam>) => {
    setFavorites(prev => 
      prev.map(team => 
        team.id === teamId ? { ...team, ...updatedTeam } : team
      )
    );
  };

  const isFavorite = (teamId: string) => {
    return favorites.some(team => team.id === teamId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      updateFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};