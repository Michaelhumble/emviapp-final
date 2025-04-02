
export interface Badge {
  name: string;
  description: string;
  icon: string;
}

export interface BadgesSectionProps {
  badges?: Badge[];
}

const BadgesSection = ({ badges }: BadgesSectionProps) => {
  // Helper function to render badges
  const renderBadges = () => {
    // If no badges, show default placeholder badge
    if (!badges || badges.length === 0) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-400 italic">No badges earned yet.</p>
        </div>
      );
    }
    
    // Show up to 2 badges
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {badges.slice(0, 2).map((badge, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg border border-purple-700/30">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{badge.icon || '🏆'}</span>
              <h4 className="font-bold text-purple-300">{badge.name}</h4>
            </div>
            <p className="text-sm text-gray-300">{badge.description}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-purple-300">Your Badges</h3>
      {renderBadges()}
      <p className="text-sm text-gray-400 italic mt-4">
        Want more? Earn credits to unlock limited badges.
      </p>
    </div>
  );
};

export default BadgesSection;
