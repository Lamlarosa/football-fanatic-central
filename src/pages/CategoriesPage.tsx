import { useState, useEffect } from 'react';
import { footballApi, League } from '@/services/api';
import { LeagueCard } from '@/components/league/LeagueCard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Globe, MapPin, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CategoriesPage = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [filteredLeagues, setFilteredLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
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

  const categorizeLeagues = () => {
    const categories = {
      all: leagues,
      european: leagues.filter(league => 
        league.name.toLowerCase().includes('premier') ||
        league.name.toLowerCase().includes('la liga') ||
        league.name.toLowerCase().includes('bundesliga') ||
        league.name.toLowerCase().includes('serie a') ||
        league.name.toLowerCase().includes('ligue 1') ||
        league.name.toLowerCase().includes('champions') ||
        league.name.toLowerCase().includes('europa') ||
        league.name.toLowerCase().includes('england') ||
        league.name.toLowerCase().includes('spain') ||
        league.name.toLowerCase().includes('germany') ||
        league.name.toLowerCase().includes('italy') ||
        league.name.toLowerCase().includes('france') ||
        league.name.toLowerCase().includes('dutch') ||
        league.name.toLowerCase().includes('portugal')
      ),
      american: leagues.filter(league => 
        league.name.toLowerCase().includes('mls') ||
        league.name.toLowerCase().includes('liga mx') ||
        league.name.toLowerCase().includes('brasil') ||
        league.name.toLowerCase().includes('argentina') ||
        league.name.toLowerCase().includes('copa') ||
        league.name.toLowerCase().includes('america') ||
        league.name.toLowerCase().includes('libertadores')
      ),
      international: leagues.filter(league => 
        league.name.toLowerCase().includes('world') ||
        league.name.toLowerCase().includes('champions') ||
        league.name.toLowerCase().includes('euro') ||
        league.name.toLowerCase().includes('copa') ||
        league.name.toLowerCase().includes('nations') ||
        league.name.toLowerCase().includes('international')
      ),
      other: leagues.filter(league => {
        const name = league.name.toLowerCase();
        return !name.includes('premier') && !name.includes('la liga') && 
               !name.includes('bundesliga') && !name.includes('serie a') && 
               !name.includes('ligue 1') && !name.includes('mls') && 
               !name.includes('liga mx') && !name.includes('brasil') && 
               !name.includes('argentina') && !name.includes('world') && 
               !name.includes('champions') && !name.includes('euro') && 
               !name.includes('copa') && !name.includes('nations');
      })
    };

    return categories;
  };

  const categories = categorizeLeagues();

  useEffect(() => {
    const currentLeagues = categories[activeTab as keyof typeof categories] || [];
    const filtered = currentLeagues.filter(league =>
      league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league.abbr.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeagues(filtered);
  }, [searchTerm, activeTab, leagues]);

  const tabs = [
    { id: 'all', label: 'All Leagues', icon: Globe, count: categories.all.length },
    { id: 'european', label: 'European', icon: MapPin, count: categories.european.length },
    { id: 'american', label: 'American', icon: MapPin, count: categories.american.length },
    { id: 'international', label: 'International', icon: Trophy, count: categories.international.length },
    { id: 'other', label: 'Other', icon: Globe, count: categories.other.length }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">League Categories</h1>
        <p className="text-muted-foreground">
          Browse leagues organized by region and competition type
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leagues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                <span className="ml-1 text-xs bg-muted px-1 rounded">
                  {tab.count}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              <div className="mb-4 text-sm text-muted-foreground">
                {filteredLeagues.length} league{filteredLeagues.length !== 1 ? 's' : ''} found
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredLeagues.map((league) => (
                  <LeagueCard key={league.id} league={league} />
                ))}
              </div>

              {filteredLeagues.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No leagues found in this category.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};