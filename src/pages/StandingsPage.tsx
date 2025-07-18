import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { footballApi, Standing, League } from '@/services/api';
import { StandingsTable } from '@/components/standings/StandingsTable';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const StandingsPage = () => {
  const { leagueId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [standings, setStandings] = useState<Standing[]>([]);
  const [filteredStandings, setFilteredStandings] = useState<Standing[]>([]);
  const [league, setLeague] = useState<League | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [season, setSeason] = useState('2023');

  const fetchStandings = async () => {
    if (!leagueId) return;

    try {
      setIsLoading(true);
      const [standingsData, leaguesData] = await Promise.all([
        footballApi.getStandings(parseInt(leagueId), parseInt(season)),
        footballApi.getLeagues()
      ]);
      
      setStandings(standingsData);
      setFilteredStandings(standingsData);
      
      const currentLeague = leaguesData.find(l => l.id === parseInt(leagueId));
      setLeague(currentLeague || null);
    } catch (error) {
      toast({
        title: "Error loading standings",
        description: "Failed to fetch standings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, [leagueId, season]);

  useEffect(() => {
    const filtered = standings.filter(standing =>
      standing.team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      standing.team.shortDisplayName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStandings(filtered);
  }, [searchTerm, standings]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leagues
        </Button>
        
        <div className="flex items-center gap-4 mb-4">
          {league && (
            <img
              src={league.logos.light}
              alt={league.name}
              className="h-12 w-12 object-contain"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          )}
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Trophy className="h-8 w-8 text-football-yellow" />
              {league?.name || 'League Standings'}
            </h1>
            <p className="text-muted-foreground">
              Season {season} • {filteredStandings.length} teams
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={season} onValueChange={setSeason}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredStandings.length > 0 ? (
        <StandingsTable 
          standings={filteredStandings} 
          leagueName={league?.name || 'Unknown League'} 
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No teams found matching your search.</p>
        </div>
      )}
    </div>
  );
};