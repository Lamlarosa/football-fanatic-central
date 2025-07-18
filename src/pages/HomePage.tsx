import { useState, useEffect } from 'react';
import { footballApi, League } from '@/services/api';
import { LeagueCard } from '@/components/league/LeagueCard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const HomePage = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const fetchLeagues = async () => {
    try {
      setIsLoading(true);
      const data = await footballApi.getLeagues();
      setLeagues(data);
      setFilteredLeagues(data);
    } catch (error) {
      toast({
        title: "Error loading leagues",
        description: "Failed to fetch leagues. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  useEffect(() => {
    const filtered = leagues.filter(league =>
      league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league.abbr.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeagues(filtered);
  }, [searchTerm, leagues]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Football Leagues</h1>
        <p className="text-muted-foreground">
          Discover and explore football leagues from around the world
        </p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leagues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={fetchLeagues}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            {filteredLeagues.length} league{filteredLeagues.length !== 1 ? 's' : ''} found
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLeagues.map((league) => (
              <LeagueCard key={league.id} league={league} />
            ))}
          </div>

          {filteredLeagues.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No leagues found matching your search.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};