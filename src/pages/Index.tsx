import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Users, 
  Target, 
  Sparkles, 
  ArrowRight,
  DollarSign,
  Gift,
  Star,
  TrendingUp
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const features = [
    {
      icon: Trophy,
      title: "Compete & Win",
      description: "Climb the leaderboard and earn recognition for your fundraising efforts",
      gradient: "from-yellow-400 to-yellow-600"
    },
    {
      icon: DollarSign,
      title: "Track Donations",
      description: "Monitor your donation progress with real-time analytics and insights",
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: Gift,
      title: "Unlock Rewards",
      description: "Earn badges and achievements as you reach new fundraising milestones",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      icon: Users,
      title: "Referral System",
      description: "Share your unique code and build your network of supporters",
      gradient: "from-blue-400 to-blue-600"
    }
  ];

  const stats = [
    { label: "Active Interns", value: "150+", icon: Users },
    { label: "Total Raised", value: "₹2.5M+", icon: DollarSign },
    { label: "Achievements", value: "500+", icon: Star },
    { label: "Growth Rate", value: "23%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface-secondary to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Badge */}
            <Badge className="mb-6 px-4 py-2 text-sm bg-gradient-to-r from-primary to-secondary text-white">
              <Sparkles className="h-4 w-4 mr-2" />
              Intern Portal 2025
            </Badge>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
              Your <span className="text-gradient">Internship</span>
              <br />
              Journey Starts Here
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Track your progress, compete with peers, earn rewards, and make a real impact through our modern internship dashboard.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/signup">
                <Button variant="hero" size="hero" className="gap-2 min-w-[200px]">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/login">
                <Button variant="outline" size="hero" className="gap-2 min-w-[200px]">
                  Sign In
                  <Users className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50 bg-surface/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold font-display text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Everything You Need to <span className="text-gradient-secondary">Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and insights you need to excel in your internship program.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-glass group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join hundreds of interns who are already making a difference. Start your journey today and unlock your potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="hero" size="hero" className="gap-2 min-w-[240px]">
                <Target className="h-5 w-5" />
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-surface/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-display font-bold text-gradient mb-4">
              Intern Portal
            </h3>
            <p className="text-muted-foreground mb-6">
              Empowering the next generation of changemakers
            </p>
            <div className="flex justify-center gap-6">
              <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="text-muted-foreground hover:text-primary transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
