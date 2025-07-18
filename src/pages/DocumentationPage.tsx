import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen, 
  User, 
  Key, 
  Globe, 
  Heart, 
  Search, 
  Filter,
  Database,
  Smartphone,
  Palette,
  Code
} from 'lucide-react';

export const DocumentationPage = () => {
  const features = [
    {
      icon: User,
      title: "Authentication",
      description: "Secure login system with demo account",
      details: ["Protected routes", "Session management", "Local storage"]
    },
    {
      icon: Globe,
      title: "API Integration",
      description: "Real-time football data from external API",
      details: ["League listings", "Team standings", "Season data"]
    },
    {
      icon: Heart,
      title: "Favorites Management",
      description: "Full CRUD operations for favorite teams",
      details: ["Add/Remove teams", "Edit team info", "Local storage"]
    },
    {
      icon: Search,
      title: "Search & Filter",
      description: "Advanced search and filtering capabilities",
      details: ["Team search", "League categories", "Real-time filtering"]
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first responsive design",
      details: ["Mobile navigation", "Touch-friendly", "Adaptive layouts"]
    },
    {
      icon: Palette,
      title: "Dark Mode",
      description: "System-wide theme switching",
      details: ["Theme persistence", "Smooth transitions", "Context API"]
    }
  ];

  const techStack = [
    { name: "React", version: "18.3.1", description: "UI Library" },
    { name: "TypeScript", version: "5.x", description: "Type Safety" },
    { name: "Tailwind CSS", version: "3.x", description: "Styling" },
    { name: "React Router", version: "6.x", description: "Navigation" },
    { name: "Axios", version: "Latest", description: "HTTP Client" },
    { name: "Vite", version: "Latest", description: "Build Tool" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          Football Hub Documentation
        </h1>
        <p className="text-muted-foreground">
          Complete guide and technical documentation for the Football Hub application
        </p>
      </div>

      {/* Demo Account Info */}
      <Card className="mb-8 border-football-yellow bg-gradient-to-r from-football-yellow/10 to-transparent animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-football-yellow" />
            Demo Account Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Login Credentials</h4>
              <div className="bg-background p-3 rounded-lg border">
                <div className="font-mono text-sm">
                  <div><strong>Username:</strong> demo</div>
                  <div><strong>Password:</strong> 12345</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quick Access</h4>
              <p className="text-sm text-muted-foreground">
                Use these credentials to access all protected features including favorites management, 
                team details, and full application functionality.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Information */}
      <Card className="mb-8 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-football-green" />
            API Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Data Source</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Base URL:</strong> https://api-football-standings.azharimm.site
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">GET</Badge>
                  <code>/leagues</code> - Fetch all available leagues
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">GET</Badge>
                  <code>/leagues/{"{id}"}/standings?season=2023</code> - League standings
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">GET</Badge>
                  <code>/leagues/{"{id}"}/seasons</code> - Available seasons
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <feature.icon className="h-5 w-5 text-primary" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {feature.description}
                </p>
                <ul className="text-xs space-y-1">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <Card className="mb-8 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-accent" />
            Technology Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-semibold">{tech.name}</div>
                  <div className="text-xs text-muted-foreground">{tech.description}</div>
                </div>
                <Badge variant="secondary">{tech.version}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Guide */}
      <Card className="mb-8 animate-fade-in">
        <CardHeader>
          <CardTitle>Application Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">🏠 Home Page</h4>
              <p className="text-sm text-muted-foreground">Browse all available football leagues with search functionality</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold">📊 Standings Page</h4>
              <p className="text-sm text-muted-foreground">View league tables with team rankings, stats, and add to favorites</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold">🗂️ Categories Page</h4>
              <p className="text-sm text-muted-foreground">Leagues organized by regions (European, American, International, etc.)</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold">👤 Team Details</h4>
              <p className="text-sm text-muted-foreground">Detailed team statistics, position, and performance metrics</p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold">❤️ Favorites</h4>
              <p className="text-sm text-muted-foreground">Manage your favorite teams with full CRUD operations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Football Hub - Built with React, TypeScript, and Tailwind CSS</p>
        <p className="mt-2">Final Exam Project - Comprehensive Football League Management System</p>
      </div>
    </div>
  );
};