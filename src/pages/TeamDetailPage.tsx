import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, Trophy, Target, Calendar, Users } from 'lucide-react';
import { useFavorites, FavoriteTeam } from '@/contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';

export const TeamDetailPage = () => {
  const { teamId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();

  const league = searchParams.get('league') || 'Unknown League';
  const position = parseInt(searchParams.get('position') || '0');

  // Mock team data - in a real app, this would come from an API
  const [teamData] = useState({
    id: teamId || '1',
    name: `Team ${teamId}`,
    logo: '/placeholder.svg',
    stats: {
      position,
      played: 20,
      won: 12,
      drawn: 5,
      lost: 3,
      goalsFor: 35,
      goalsAgainst: 18,
      goalDifference: 17,
      points: 41,
      form: ['W', 'W', 'D', 'W', 'L'],
      winPercentage: 60,
      cleanSheets: 8,
      yellowCards: 45,
      redCards: 3
    }
  });

  const isTeamFavorite = isFavorite(teamData.id);

  const handleToggleFavorite = () => {
    if (isTeamFavorite) {
      removeFromFavorites(teamData.id);
      toast({
        title: "Removed from favorites",
        description: `${teamData.name} has been removed from your favorites.`,
      });
    } else {
      const favoriteTeam: FavoriteTeam = {
        id: teamData.id,
        name: teamData.name,
        logo: teamData.logo,
        league,
        position: teamData.stats.position,
        points: teamData.stats.points,
        played: teamData.stats.played,
        won: teamData.stats.won,
        drawn: teamData.stats.drawn,
        lost: teamData.stats.lost,
        goalsFor: teamData.stats.goalsFor,
        goalsAgainst: teamData.stats.goalsAgainst,
        goalDifference: teamData.stats.goalDifference,
        dateAdded: new Date().toISOString()
      };

      addToFavorites(favoriteTeam);
      toast({
        title: "Added to favorites",
        description: `${teamData.name} has been added to your favorites.`,
      });
    }
  };

  const getPositionBadge = (pos: number) => {
    if (pos <= 4) return <Badge className="bg-football-yellow text-black">Champions League</Badge>;
    if (pos <= 6) return <Badge variant="secondary">Europa League</Badge>;
    if (pos >= 18) return <Badge variant="destructive">Relegation Zone</Badge>;
    return <Badge variant="outline">Mid Table</Badge>;
  };

  const getFormColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-football-green text-white';
      case 'D': return 'bg-football-yellow text-black';
      case 'L': return 'bg-destructive text-white';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Team Header */}
        <Card className="lg:col-span-3 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img
                src={teamData.logo}
                alt={teamData.name}
                className="h-20 w-20 object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold">{teamData.name}</h1>
                  <div className="flex items-center gap-2">
                    {getPositionBadge(position)}
                    <Badge variant="outline">#{position}</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{league}</p>
                <Button
                  onClick={handleToggleFavorite}
                  variant={isTeamFavorite ? "destructive" : "default"}
                  className="flex items-center gap-2"
                >
                  <Heart className={`h-4 w-4 ${isTeamFavorite ? 'fill-current' : ''}`} />
                  {isTeamFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* League Position & Points */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-football-yellow" />
              League Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">#{position}</div>
              <div className="text-2xl font-semibold mb-2">{teamData.stats.points} pts</div>
              <div className="text-sm text-muted-foreground">
                {teamData.stats.played} games played
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals Statistics */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-football-green" />
              Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Goals For</span>
                <span className="font-bold text-football-green">{teamData.stats.goalsFor}</span>
              </div>
              <div className="flex justify-between">
                <span>Goals Against</span>
                <span className="font-bold text-destructive">{teamData.stats.goalsAgainst}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Goal Difference</span>
                <span className={`font-bold ${teamData.stats.goalDifference >= 0 ? 'text-football-green' : 'text-destructive'}`}>
                  {teamData.stats.goalDifference > 0 ? '+' : ''}{teamData.stats.goalDifference}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Win/Loss Record */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Record
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Won</span>
                <span className="font-bold text-football-green">{teamData.stats.won}</span>
              </div>
              <div className="flex justify-between">
                <span>Drawn</span>
                <span className="font-bold text-football-yellow">{teamData.stats.drawn}</span>
              </div>
              <div className="flex justify-between">
                <span>Lost</span>
                <span className="font-bold text-destructive">{teamData.stats.lost}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Win Rate</span>
                <span className="font-bold">{teamData.stats.winPercentage}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Form */}
        <Card className="lg:col-span-2 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Recent Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              {teamData.stats.form.map((result, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getFormColor(result)}`}
                >
                  {result}
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Last 5 matches (most recent first)
            </div>
          </CardContent>
        </Card>

        {/* Additional Stats */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Additional Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Clean Sheets</span>
                <span className="font-bold">{teamData.stats.cleanSheets}</span>
              </div>
              <div className="flex justify-between">
                <span>Yellow Cards</span>
                <span className="font-bold text-football-yellow">{teamData.stats.yellowCards}</span>
              </div>
              <div className="flex justify-between">
                <span>Red Cards</span>
                <span className="font-bold text-destructive">{teamData.stats.redCards}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};