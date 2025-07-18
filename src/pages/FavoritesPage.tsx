import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites, FavoriteTeam } from '@/contexts/FavoritesContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Edit, Trash2, Search, Trophy, Target, Calendar, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const FavoritesPage = () => {
  const { favorites, removeFromFavorites, updateFavorite } = useFavorites();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTeam, setEditingTeam] = useState<FavoriteTeam | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    league: '',
    position: 0,
    points: 0,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0
  });

  const filteredFavorites = favorites.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.league.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (team: FavoriteTeam) => {
    setEditingTeam(team);
    setEditForm({
      name: team.name,
      league: team.league,
      position: team.position,
      points: team.points,
      played: team.played,
      won: team.won,
      drawn: team.drawn,
      lost: team.lost
    });
  };

  const handleSaveEdit = () => {
    if (!editingTeam) return;

    updateFavorite(editingTeam.id, editForm);
    setEditingTeam(null);
    toast({
      title: "Team updated",
      description: `${editForm.name} has been updated successfully.`,
    });
  };

  const handleDelete = (team: FavoriteTeam) => {
    removeFromFavorites(team.id);
    toast({
      title: "Team removed",
      description: `${team.name} has been removed from your favorites.`,
    });
  };

  const getPositionBadge = (position: number) => {
    if (position <= 4) return <Badge className="bg-football-yellow text-black">Top 4</Badge>;
    if (position <= 10) return <Badge variant="secondary">Top Half</Badge>;
    if (position >= 18) return <Badge variant="destructive">Bottom 3</Badge>;
    return <Badge variant="outline">Mid Table</Badge>;
  };

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Favorite Teams</h1>
          <p className="text-muted-foreground">
            Your saved favorite teams will appear here
          </p>
        </div>

        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No favorite teams yet</h3>
          <p className="text-muted-foreground mb-6">
            Start adding teams to your favorites from the league standings
          </p>
          <Button asChild>
            <Link to="/">Browse Leagues</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Heart className="h-8 w-8 text-destructive" />
          Favorite Teams
        </h1>
        <p className="text-muted-foreground">
          Manage your saved favorite teams • {favorites.length} team{favorites.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search favorite teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredFavorites.map((team) => (
          <Card key={team.id} className="hover:shadow-football transition-all duration-300 animate-fade-in">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="h-12 w-12 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{team.league}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(team)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Team Information</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Team Name</Label>
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="league">League</Label>
                          <Input
                            id="league"
                            value={editForm.league}
                            onChange={(e) => setEditForm({ ...editForm, league: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="position">Position</Label>
                            <Input
                              id="position"
                              type="number"
                              value={editForm.position}
                              onChange={(e) => setEditForm({ ...editForm, position: parseInt(e.target.value) || 0 })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="points">Points</Label>
                            <Input
                              id="points"
                              type="number"
                              value={editForm.points}
                              onChange={(e) => setEditForm({ ...editForm, points: parseInt(e.target.value) || 0 })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="won">Won</Label>
                            <Input
                              id="won"
                              type="number"
                              value={editForm.won}
                              onChange={(e) => setEditForm({ ...editForm, won: parseInt(e.target.value) || 0 })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="lost">Lost</Label>
                            <Input
                              id="lost"
                              type="number"
                              value={editForm.lost}
                              onChange={(e) => setEditForm({ ...editForm, lost: parseInt(e.target.value) || 0 })}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleSaveEdit} className="flex-1">
                            Save Changes
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setEditingTeam(null)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(team)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Position</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">#{team.position}</span>
                    {getPositionBadge(team.position)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-football-yellow" />
                    <span>{team.points} pts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-football-green" />
                    <span>{team.goalDifference > 0 ? '+' : ''}{team.goalDifference}</span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>W: {team.won}</span>
                    <span>D: {team.drawn}</span>
                    <span>L: {team.lost}</span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Added {new Date(team.dateAdded).toLocaleDateString()}
                </div>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Link to={`/team/${team.id}?league=${encodeURIComponent(team.league)}&position=${team.position}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFavorites.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No favorite teams found matching your search.</p>
        </div>
      )}
    </div>
  );
};