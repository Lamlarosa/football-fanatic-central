import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { League } from '@/services/api';
import { useTheme } from '@/contexts/ThemeContext';

interface LeagueCardProps {
  league: League;
}

export const LeagueCard: React.FC<LeagueCardProps> = ({ league }) => {
  const { isDarkMode } = useTheme();

  return (
    <Link to={`/standings/${league.id}`}>
      <Card className="group hover:shadow-football transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-16 w-16 rounded-full bg-muted flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
              <img
                src={isDarkMode ? league.logos.dark : league.logos.light}
                alt={league.name}
                className="h-12 w-12 object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {league.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {league.abbr}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};