import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { api, type LeaderboardEntry } from '@/services/api';
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  ArrowLeft,
  Crown,
  Star,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    loadLeaderboard();
  }, [navigate]);

  const loadLeaderboard = async () => {
    try {
      const data = await api.getLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load leaderboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankGradient = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-400 to-yellow-600";
      case 2:
        return "from-gray-300 to-gray-500";
      case 3:
        return "from-amber-400 to-amber-600";
      default:
        return "from-muted to-muted-foreground";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-surface-secondary to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const currentUser = localStorage.getItem('userName');
  const topThree = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface-secondary to-muted">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-display font-bold text-gradient">
                Leaderboard
              </h1>
              <Badge variant="secondary" className="px-3 py-1">
                Top Performers
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                Updated Live
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">
            🏆 Top Performers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how you stack up against other interns. Keep pushing to climb the ranks!
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12">
          <h3 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
            🥇 Champion's Circle
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {topThree.map((entry, index) => {
              const actualRank = entry.rank;
              const isCurrentUser = entry.name === currentUser;
              
              return (
                <Card 
                  key={entry.id} 
                  className={`card-glass relative overflow-hidden ${
                    actualRank === 1 ? 'ring-2 ring-yellow-400 scale-105' : ''
                  } ${isCurrentUser ? 'ring-2 ring-primary' : ''}`}
                >
                  {/* Rank Badge */}
                  <div className="absolute top-4 right-4">
                    {getRankIcon(actualRank)}
                  </div>
                  
                  {/* Current User Indicator */}
                  {isCurrentUser && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        You
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-8 text-center">
                    {/* Avatar */}
                    <div className="mb-6">
                      <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-surface shadow-lg">
                        <AvatarFallback className={`text-2xl font-bold bg-gradient-to-r ${getRankGradient(actualRank)} text-white`}>
                          {getInitials(entry.name)}
                        </AvatarFallback>
                      </Avatar>
                      
                      {actualRank === 1 && (
                        <div className="text-2xl mb-2">👑</div>
                      )}
                    </div>
                    
                    {/* Name and Info */}
                    <h4 className="text-xl font-display font-bold text-foreground mb-2">
                      {entry.name}
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2">
                        <DollarSign className="h-4 w-4 text-success" />
                        <span className="text-2xl font-bold text-success">
                          ₹{entry.donations.toLocaleString()}
                        </span>
                      </div>
                      
                      <Badge variant="secondary" className="px-3 py-1">
                        {entry.referralCode}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Rest of the Rankings */}
        {others.length > 0 && (
          <div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">
              🌟 Rising Stars
            </h3>
            
            <Card className="card-glass">
              <CardHeader>
                <CardTitle>Complete Rankings</CardTitle>
                <CardDescription>
                  All top performers in the intern program
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {others.map((entry) => {
                    const isCurrentUser = entry.name === currentUser;
                    
                    return (
                      <div 
                        key={entry.id}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                          isCurrentUser 
                            ? 'bg-primary/5 border-primary ring-1 ring-primary' 
                            : 'bg-surface/50 border-border/50 hover:bg-surface/80'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground font-bold">
                            #{entry.rank}
                          </div>
                          
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gradient-to-r from-secondary to-accent text-white font-semibold">
                              {getInitials(entry.name)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-foreground">
                                {entry.name}
                              </h4>
                              {isCurrentUser && (
                                <Badge className="bg-primary text-primary-foreground text-xs">
                                  You
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {entry.referralCode}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-success font-semibold">
                            <DollarSign className="h-4 w-4" />
                            ₹{entry.donations.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Total raised
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Motivational CTA */}
        <Card className="card-glass mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              Keep Climbing!
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Every donation counts towards your ranking. Share your referral code and watch your position rise!
            </p>
            <Link to="/dashboard">
              <Button variant="hero" size="lg" className="gap-2">
                <TrendingUp className="h-5 w-5" />
                View Your Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Leaderboard;
