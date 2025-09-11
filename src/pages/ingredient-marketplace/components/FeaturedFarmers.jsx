import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedFarmers = ({ onFarmerClick }) => {
  const featuredFarmers = [
    {
      id: 1,
      name: "Ramesh Kumar",
      location: "Rajasthan",
      speciality: "Organic Bajra & Traditional Spices",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      products: 23,
      story: `Third-generation farmer preserving ancient grain varieties in the Thar Desert. Ramesh has been cultivating indigenous bajra using traditional methods passed down through generations.`,
      certifications: ["Organic", "Fair Trade"],
      seasonalSpecial: "Desert Honey & Wild Sesame Oil"
    },
    {
      id: 2,
      name: "Lakshmi Devi",
      location: "Kerala",
      speciality: "Coconut Oil & Spice Blends",
      image: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e2?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      products: 18,
      story: `Master of traditional coconut oil extraction and spice processing. Lakshmi's family has been creating authentic Kerala spice blends for over 50 years.`,
      certifications: ["Organic", "Traditional Methods"],
      seasonalSpecial: "Monsoon Cardamom & Fresh Pepper"
    },
    {
      id: 3,
      name: "Suresh Patil",
      location: "Maharashtra",
      speciality: "Jowar & Organic Pulses",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      products: 31,
      story: `Pioneer in sustainable farming practices, Suresh grows drought-resistant jowar and indigenous pulse varieties using zero-chemical methods.`,
      certifications: ["Organic", "Pesticide Free"],
      seasonalSpecial: "Harvest Festival Jowar & Black Gram"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">Featured Farmers</h2>
          <p className="text-sm text-muted-foreground">Meet the guardians of indigenous ingredients</p>
        </div>
        <Button variant="outline" size="sm">
          View All Farmers
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredFarmers?.map((farmer) => (
          <div
            key={farmer?.id}
            className="bg-background border border-border rounded-lg p-4 hover:shadow-warm-md transition-all duration-200 cursor-pointer"
            onClick={() => onFarmerClick(farmer)}
          >
            {/* Farmer Header */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <Image
                  src={farmer?.image}
                  alt={farmer?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background flex items-center justify-center">
                  <Icon name="Check" size={8} color="white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-body font-semibold text-foreground">{farmer?.name}</h3>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{farmer?.location}</span>
                </div>
              </div>
            </div>

            {/* Speciality */}
            <p className="text-sm text-foreground mb-2 font-medium">{farmer?.speciality}</p>

            {/* Story */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{farmer?.story}</p>

            {/* Stats */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-warning fill-current" />
                <span className="text-sm font-medium text-foreground">{farmer?.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">{farmer?.products} products</span>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-1 mb-3">
              {farmer?.certifications?.map((cert, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-success/10 text-success text-xs font-caption font-medium rounded"
                >
                  {cert}
                </span>
              ))}
            </div>

            {/* Seasonal Special */}
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-2 mb-3">
              <div className="flex items-center space-x-1 mb-1">
                <Icon name="Sparkles" size={12} className="text-warning" />
                <span className="text-xs font-caption font-medium text-warning">Seasonal Special</span>
              </div>
              <p className="text-sm text-foreground">{farmer?.seasonalSpecial}</p>
            </div>

            {/* Action Button */}
            <Button
              variant="outline"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
              className="w-full"
            >
              View Products
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedFarmers;