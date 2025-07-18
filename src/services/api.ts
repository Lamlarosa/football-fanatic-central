import axios from 'axios';

const BASE_URL = 'https://api-football-standings.azharimm.site';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export interface League {
  id: number;
  name: string;
  slug: string;
  abbr: string;
  logos: {
    light: string;
    dark: string;
  };
}

export interface Standing {
  team: {
    id: number;
    name: string;
    slug: string;
    shortDisplayName: string;
    logo: string;
  };
  stats: Array<{
    name: string;
    displayName: string;
    shortDisplayName: string;
    description: string;
    abbreviation: string;
    type: string;
    value: number;
    displayValue: string;
  }>;
}

export interface Season {
  year: number;
  startDate: string;
  endDate: string;
  displayName: string;
  types: Array<{
    id: string;
    name: string;
    abbreviation: string;
  }>;
}

export const footballApi = {
  getLeagues: async (): Promise<League[]> => {
    try {
      const response = await api.get('/leagues');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching leagues:', error);
      throw new Error('Failed to fetch leagues');
    }
  },

  getStandings: async (leagueId: number, season: number = 2023): Promise<Standing[]> => {
    try {
      const response = await api.get(`/leagues/${leagueId}/standings?season=${season}`);
      return response.data.data.standings;
    } catch (error) {
      console.error('Error fetching standings:', error);
      throw new Error('Failed to fetch standings');
    }
  },

  getSeasons: async (leagueId: number): Promise<Season[]> => {
    try {
      const response = await api.get(`/leagues/${leagueId}/seasons`);
      return response.data.data.seasons;
    } catch (error) {
      console.error('Error fetching seasons:', error);
      throw new Error('Failed to fetch seasons');
    }
  }
};