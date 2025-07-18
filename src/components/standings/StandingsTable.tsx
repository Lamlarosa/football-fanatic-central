import { Link } from 'react-router-dom';
import { Standing } from '@/services/api';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Heart, Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';

interface StandingsTableProps {
  standings: Standing[];
  leagueName: string;
}

export const StandingsTable: React.FC<StandingsTableProps> = ({ standings, leagueName }) => {
  const { addToFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();

  const getStatValue = (stats: Standing['stats'], abbreviation: string): number => {
    const stat = stats.find(s => s.abbreviation === abbreviation);
    return stat ? stat.value : 0;
  };

  const getPositionIcon = (position: number) => {
    if (position <= 4) return <Trophy className="h-4 w-4 text-football-yellow" />;
    if (position <= 6) return <TrendingUp className="h-4 w-4 text-football-green" />;
    if (position >= standings.length - 2) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return null;
  };

  const handleAddToFavorites = (standing: Standing, position: number) => {
    const teamId = standing.team.id.toString();
    
    if (isFavorite(teamId)) {
      toast({
        title: "Already in favorites",
        description: `${standing.team.name} is already in your favorites!`,
        variant: "destructive"
      });
      return;
    }

    const favoriteTeam = {
      id: teamId,
      name: standing.team.name,
      logo: standing.team.logo,
      league: leagueName,
      position,
      points: getStatValue(standing.stats, 'PTS'),
      played: getStatValue(standing.stats, 'GP'),
      won: getStatValue(standing.stats, 'W'),
      drawn: getStatValue(standing.stats, 'D') || getStatValue(standing.stats, 'T'),
      lost: getStatValue(standing.stats, 'L'),
      goalsFor: getStatValue(standing.stats, 'GF'),
      goalsAgainst: getStatValue(standing.stats, 'GA'),
      goalDifference: getStatValue(standing.stats, 'GD'),
      dateAdded: new Date().toISOString()
    };

    addToFavorites(favoriteTeam);
    toast({
      title: "Added to favorites!",
      description: `${standing.team.name} has been added to your favorites.`,
    });
  };

  return (
    <div className="rounded-lg border bg-card animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-center">GP</TableHead>
            <TableHead className="text-center">W</TableHead>
            <TableHead className="text-center">D</TableHead>
            <TableHead className="text-center">L</TableHead>
            <TableHead className="text-center">GF</TableHead>
            <TableHead className="text-center">GA</TableHead>
            <TableHead className="text-center">GD</TableHead>
            <TableHead className="text-center">PTS</TableHead>
            <TableHead className="w-20">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standings.map((standing, index) => {
            const position = index + 1;
            const teamId = standing.team.id.toString();
            
            return (
              <TableRow key={standing.team.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <span>{position}</span>
                    {getPositionIcon(position)}
                  </div>
                </TableCell>
                <TableCell>
                  <Link 
                    to={`/team/${standing.team.id}?league=${leagueName}&position=${position}`}
                    className="flex items-center space-x-3 hover:text-primary transition-colors group"
                  >
                    <img
                      src={standing.team.logo}
                      alt={standing.team.name}
                      className="h-8 w-8 object-contain group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <span className="font-medium">{standing.team.name}</span>
                  </Link>
                </TableCell>
                <TableCell className="text-center">{getStatValue(standing.stats, 'GP')}</TableCell>
                <TableCell className="text-center">{getStatValue(standing.stats, 'W')}</TableCell>
                <TableCell className="text-center">{getStatValue(standing.stats, 'D') || getStatValue(standing.stats, 'T')}</TableCell>
                <TableCell className="text-center">{getStatValue(standing.stats, 'L')}</TableCell>
                <TableCell className="text-center">{getStatValue(standing.stats, 'GF')}</TableCell>
                <TableCell className="text-center">{getStatValue(standing.stats, 'GA')}</TableCell>
                <TableCell className="text-center">{getStatValue(standing.stats, 'GD')}</TableCell>
                <TableCell className="text-center font-bold">{getStatValue(standing.stats, 'PTS')}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddToFavorites(standing, position)}
                    className={`hover:bg-accent ${isFavorite(teamId) ? 'text-destructive' : 'text-muted-foreground hover:text-football-yellow'}`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite(teamId) ? 'fill-current' : ''}`} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};