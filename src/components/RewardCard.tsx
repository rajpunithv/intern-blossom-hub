import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RewardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isUnlocked: boolean;
  requirement?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

const RewardCard = ({ title, description, icon: Icon, isUnlocked, requirement, rarity = 'common' }: RewardCardProps) => {
  const rarityColors = {
    common: 'from-muted to-muted-foreground',
    rare: 'from-secondary to-secondary-light',
    epic: 'from-accent to-accent-light',
    legendary: 'from-warning to-warning-light'
  };

  const rarityBadgeColors = {
    common: 'bg-muted text-muted-foreground',
    rare: 'bg-secondary text-secondary-foreground',
    epic: 'bg-accent text-accent-foreground',
    legendary: 'bg-warning text-white'
  };

  return (
    <Card className={`stats-card group ${isUnlocked ? 'ring-2 ring-success' : 'opacity-75'} transition-all duration-300`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${rarityColors[rarity]} shadow-lg ${!isUnlocked && 'grayscale'}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <Badge className={rarityBadgeColors[rarity]} variant="secondary">
            {rarity}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-bold font-display text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          
          {!isUnlocked && requirement && (
            <div className="p-3 bg-muted/50 rounded-lg border border-border/50">
              <p className="text-xs font-medium text-muted-foreground">
                <span className="text-foreground">Requirement:</span> {requirement}
              </p>
            </div>
          )}
          
          {isUnlocked && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs font-semibold text-success">Unlocked!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardCard;