
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { TravelPreferences } from '@/services/geminiService';

interface TravelFormProps {
  onSubmit: (preferences: TravelPreferences) => void;
  loading: boolean;
}

const activities = [
  "Beaches", "Museums", "Adventure", "Shopping", 
  "Hiking", "Food Tours", "Historical Sites", "Nightlife",
  "Cultural Experiences", "Nature"
];

const TravelForm = ({ onSubmit, loading }: TravelFormProps) => {
  const [destination, setDestination] = useState('');
  const [budgetType, setBudgetType] = useState('Mid-range');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [accommodationType, setAccommodationType] = useState('Hotel');
  const [transportPreference, setTransportPreference] = useState('Public Transport');
  const [dietaryPreferences, setDietaryPreferences] = useState('No preference');
  const [durationDays, setDurationDays] = useState(3);

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity) 
        : [...prev, activity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || selectedActivities.length === 0) {
      return;
    }
    
    onSubmit({
      destination,
      budgetType,
      activities: selectedActivities,
      accommodationType,
      transportPreference,
      dietaryPreferences,
      durationDays
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-display">Plan Your Dream Trip</CardTitle>
          <CardDescription>
            Tell us your preferences and we'll create a personalized itinerary just for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="destination">Where would you like to go?</Label>
              <Input 
                id="destination" 
                placeholder="e.g., Paris, Tokyo, New York" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Type</Label>
              <Select value={budgetType} onValueChange={setBudgetType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a budget type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Budget">Budget</SelectItem>
                  <SelectItem value="Mid-range">Mid-range</SelectItem>
                  <SelectItem value="Luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>What activities are you interested in?</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {activities.map((activity) => (
                  <div key={activity} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`activity-${activity}`} 
                      checked={selectedActivities.includes(activity)}
                      onCheckedChange={() => handleActivityToggle(activity)}
                    />
                    <Label htmlFor={`activity-${activity}`} className="cursor-pointer text-sm">
                      {activity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accommodation">Accommodation Type</Label>
              <Select value={accommodationType} onValueChange={setAccommodationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select accommodation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hostel">Hostel</SelectItem>
                  <SelectItem value="Hotel">Hotel</SelectItem>
                  <SelectItem value="Resort">Resort</SelectItem>
                  <SelectItem value="Airbnb">Airbnb</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transport">Transport Preference</Label>
              <Select value={transportPreference} onValueChange={setTransportPreference}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transport preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Public Transport">Public Transport</SelectItem>
                  <SelectItem value="Car Rental">Car Rental</SelectItem>
                  <SelectItem value="Walking">Walking</SelectItem>
                  <SelectItem value="Ridesharing">Ridesharing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dietary">Dietary Preferences</Label>
              <Select value={dietaryPreferences} onValueChange={setDietaryPreferences}>
                <SelectTrigger>
                  <SelectValue placeholder="Select dietary preferences" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No preference">No preference</SelectItem>
                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="Vegan">Vegan</SelectItem>
                  <SelectItem value="Halal">Halal</SelectItem>
                  <SelectItem value="Gluten-free">Gluten-free</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="duration">Trip Duration (days): {durationDays}</Label>
              </div>
              <Slider 
                id="duration"
                defaultValue={[3]} 
                min={1} 
                max={10} 
                step={1}
                onValueChange={(value) => setDurationDays(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 day</span>
                <span>10 days</span>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={loading || !destination || selectedActivities.length === 0}
          >
            {loading ? 'Generating Itinerary...' : 'Create My Itinerary'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TravelForm;
