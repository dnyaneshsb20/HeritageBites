import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import PersonalInfoSection from './components/PersonalInfoSection';
import HealthGoalsSection from './components/HealthGoalsSection';
import DietaryRestrictionsSection from './components/DietaryRestrictionsSection';
import TastePreferencesSection from './components/TastePreferencesSection';
import RegionalFavoritesSection from './components/RegionalFavoritesSection';
import RecipeHistorySection from './components/RecipeHistorySection';
import AchievementBadgesSection from './components/AchievementBadgesSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserProfileHealthGoals = () => {
  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    healthGoals: false,
    dietaryRestrictions: false,
    tastePreferences: false,
    regionalFavorites: false,
    recipeHistory: false,
    achievements: false
  });

  const [userData, setUserData] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    gender: "female",
    ageGroup: "26-35",
    location: "Mumbai, Maharashtra",
    height: "165",
    weight: "58",
    activityLevel: "moderately-active",
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    joinDate: "March 2024"
  });

  const [healthGoals, setHealthGoals] = useState([
    'weight-loss',
    'diabetes-friendly',
    'heart-health'
  ]);

  const [dietaryRestrictions, setDietaryRestrictions] = useState([
    'vegetarian',
    'low-sodium'
  ]);

  const [tastePreferences, setTastePreferences] = useState({
    'heat-level': 3,
    'sweetness': 2,
    'sourness': 3,
    'saltiness': 2,
    favoriteIngredients: ['ginger', 'turmeric', 'cumin', 'coriander', 'coconut']
  });

  const [regionalFavorites, setRegionalFavorites] = useState([
    'maharashtra',
    'gujarat',
    'punjab'
  ]);

  const [profileCompleteness, setProfileCompleteness] = useState(0);

  // Calculate profile completeness
  useEffect(() => {
    let completedSections = 0;
    const totalSections = 6;

    // Personal Info (always considered complete if basic fields are filled)
    if (userData?.name && userData?.email) completedSections++;
    
    // Health Goals
    if (healthGoals?.length > 0) completedSections++;
    
    // Dietary Restrictions (optional, but if set, counts as complete)
    completedSections++; // Always count as complete since it's optional
    
    // Taste Preferences
    if (tastePreferences?.favoriteIngredients && tastePreferences?.favoriteIngredients?.length > 0) {
      completedSections++;
    }
    
    // Regional Favorites
    if (regionalFavorites?.length > 0) completedSections++;
    
    // Recipe History (always complete as it's auto-populated)
    completedSections++;

    setProfileCompleteness(Math.round((completedSections / totalSections) * 100));
  }, [userData, healthGoals, dietaryRestrictions, tastePreferences, regionalFavorites]);

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev?.[sectionKey]
    }));
  };

  const handleUserDataUpdate = (newData) => {
    setUserData(newData);
  };

  const handleHealthGoalsUpdate = (newGoals) => {
    setHealthGoals(newGoals);
  };

  const handleDietaryRestrictionsUpdate = (newRestrictions) => {
    setDietaryRestrictions(newRestrictions);
  };

  const handleTastePreferencesUpdate = (newPreferences) => {
    setTastePreferences(newPreferences);
  };

  const handleRegionalFavoritesUpdate = (newFavorites) => {
    setRegionalFavorites(newFavorites);
  };

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-accent';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="User" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Profile & Health Goals
              </h1>
              <p className="text-muted-foreground">
                Personalize your culinary journey with traditional Indian recipes
              </p>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-card rounded-lg border border-border p-4 shadow-warm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-body font-medium text-foreground">
                Profile Completion
              </h3>
              <span className={`font-body font-semibold ${getCompletionColor(profileCompleteness)}`}>
                {profileCompleteness}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                style={{ width: `${profileCompleteness}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Complete your profile to get better recipe recommendations tailored to your taste and health goals.
            </p>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="space-y-6">
          {/* Personal Information */}
          <PersonalInfoSection
            isExpanded={expandedSections?.personalInfo}
            onToggle={() => toggleSection('personalInfo')}
            userData={userData}
            onUpdate={handleUserDataUpdate}
          />

          {/* Health Goals */}
          <HealthGoalsSection
            isExpanded={expandedSections?.healthGoals}
            onToggle={() => toggleSection('healthGoals')}
            healthGoals={healthGoals}
            onUpdate={handleHealthGoalsUpdate}
          />

          {/* Dietary Restrictions */}
          <DietaryRestrictionsSection
            isExpanded={expandedSections?.dietaryRestrictions}
            onToggle={() => toggleSection('dietaryRestrictions')}
            restrictions={dietaryRestrictions}
            onUpdate={handleDietaryRestrictionsUpdate}
          />

          {/* Taste Preferences */}
          <TastePreferencesSection
            isExpanded={expandedSections?.tastePreferences}
            onToggle={() => toggleSection('tastePreferences')}
            preferences={tastePreferences}
            onUpdate={handleTastePreferencesUpdate}
          />

          {/* Regional Favorites */}
          <RegionalFavoritesSection
            isExpanded={expandedSections?.regionalFavorites}
            onToggle={() => toggleSection('regionalFavorites')}
            favorites={regionalFavorites}
            onUpdate={handleRegionalFavoritesUpdate}
          />

          {/* Recipe History */}
          <RecipeHistorySection
            isExpanded={expandedSections?.recipeHistory}
            onToggle={() => toggleSection('recipeHistory')}
          />

          {/* Achievement Badges */}
          <AchievementBadgesSection
            isExpanded={expandedSections?.achievements}
            onToggle={() => toggleSection('achievements')}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Button 
            variant="outline" 
            size="lg"
            iconName="Download"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Export Profile Data
          </Button>
          <Button 
            variant="default" 
            size="lg"
            iconName="Sparkles"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Get Personalized Recommendations
          </Button>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={16} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-body font-medium text-foreground mb-1">
                Privacy & Data Security
              </h4>
              <p className="text-sm text-muted-foreground">
                Your personal information and preferences are securely stored and used only to enhance your 
                recipe discovery experience. We never share your data with third parties without your consent. 
                You can export or delete your data at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHealthGoals;