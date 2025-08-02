import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatsCard from '@/components/StatsCard';
import RewardCard from '@/components/RewardCard';
import { api, type InternData, type Achievement } from '@/services/api';
import { 
  DollarSign, 
  Users, 
  Trophy, 
  TrendingUp, 
  Share2, 
  Gift,
  LogOut,
  User,
  Star,
  Crown,
  Target,
  Award,
  Copy,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [internData, setInternData] = useState<InternData | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      const [internDataRes, achievementsRes] = await Promise.all([
        api.getInternData(),
        api.getAchievements()
      ]);
      
      setInternData(internDataRes);
      setAchievements(achievementsRes);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const copyReferralCode = async () => {
    if (internData) {
      await navigator.clipboard.writeText(internData.referralCode);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard"
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons = { user: User, star: Star, trophy: Trophy, crown: Crown };
    return icons[iconName as keyof typeof icons] || User;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-surface-secondary to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!internData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-surface-secondary to-muted flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Failed to load dashboard</p>
          <Button onClick={loadDashboardData} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const nextAchievement = achievements.find(a => !a.isUnlocked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface-secondary to-muted">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-display font-bold text-gradient">
                Intern Portal
              </h1>
              <Badge variant="secondary" className="px-3 py-1">
                Dashboard
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/leaderboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Trophy className="h-4 w-4" />
                  Leaderboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-display font-bold text-foreground mb-2">
                Welcome back, {internData.name}! 👋
              </h2>
              <p className="text-lg text-muted-foreground">
                Here's your performance overview
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Your Rank</p>
              <p className="text-3xl font-bold text-gradient">
                #{internData.rank}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Donations"
            value={`₹${internData.donations.toLocaleString()}`}
            icon={DollarSign}
            description="Amount raised this month"
            gradient="from-primary to-primary-light"
            trend={{ value: "23.5%", isPositive: true }}
          />
          
          <StatsCard
            title="Current Rank"
            value={`#${internData.rank}`}
            icon={Trophy}
            description={`Out of ${internData.totalInterns} interns`}
            gradient="from-secondary to-secondary-light"
          />
          
          <StatsCard
            title="Achievements"
            value={unlockedAchievements.length.toString()}
            icon={Award}
            description="Rewards unlocked"
            gradient="from-accent to-accent-light"
          />
          
          <StatsCard
            title="Referral Code"
            value={internData.referralCode}
            icon={Share2}
            description="Share to earn more"
            gradient="from-success to-success-light"
          />
        </div>

        {/* Referral Code Section */}
        <Card className="card-glass mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Your Referral Code
            </CardTitle>
            <CardDescription>
              Share this code with others to boost your donations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border border-border/50">
              <code className="text-lg font-mono font-bold text-primary flex-1">
                {internData.referralCode}
              </code>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyReferralCode}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Achievement */}
        {nextAchievement && (
          <Card className="card-glass mb-8 border-2 border-dashed border-warning/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <Target className="h-5 w-5" />
                Next Achievement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-warning to-warning-light shadow-lg">
                  {(() => {
                    const IconComponent = getIconComponent(nextAchievement.icon);
                    return <IconComponent className="h-6 w-6 text-white" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-display">{nextAchievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{nextAchievement.description}</p>
                  <p className="text-xs text-warning font-semibold mt-1">
                    {nextAchievement.requirement}
                  </p>
                </div>
                <Badge className="bg-warning text-white">
                  {nextAchievement.rarity}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Achievements Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-display font-bold text-foreground">
              Your Achievements
            </h3>
            <Badge variant="secondary" className="px-3 py-1">
              {unlockedAchievements.length} / {achievements.length} Unlocked
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <RewardCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                icon={getIconComponent(achievement.icon)}
                isUnlocked={achievement.isUnlocked}
                requirement={achievement.requirement}
                rarity={achievement.rarity}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="card-glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="hero" className="h-12 gap-2">
                <Share2 className="h-4 w-4" />
                Share Referral Code
              </Button>
              <Link to="/leaderboard" className="flex">
                <Button variant="secondary" className="h-12 gap-2 flex-1">
                  <Trophy className="h-4 w-4" />
                  View Leaderboard
                </Button>
              </Link>
              <Button variant="outline" className="h-12 gap-2">
                <TrendingUp className="h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;