
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { TravelPreferences } from '@/services/geminiService';
import TravelFormHeader from './TravelFormHeader';
import { Calendar, DollarSign, Home, Utensils, Bus, MapPin } from 'lucide-react';

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

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <TravelFormHeader loading={loading} />
      
      <Card className="border-primary/10 shadow-lg">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <Label htmlFor="destination" className="font-medium">Where would you like to go?</Label>
                </div>
                <Input 
                  id="destination" 
                  placeholder="e.g., Paris, Tokyo, New York" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  className="border-primary/20 focus:border-primary/80 transition-colors h-11"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2 mt-6">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <Label htmlFor="budget" className="font-medium">Budget Type</Label>
                </div>
                <Select value={budgetType} onValueChange={setBudgetType}>
                  <SelectTrigger className="border-primary/20 focus:border-primary/80 transition-colors h-11">
                    <SelectValue placeholder="Select a budget type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Budget">Budget</SelectItem>
                    <SelectItem value="Mid-range">Mid-range</SelectItem>
                    <SelectItem value="Luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2 mt-6">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <Label className="font-medium">What activities are you interested in?</Label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                  {activities.map((activity) => (
                    <div 
                      key={activity} 
                      className={`flex items-center gap-2 p-2 rounded-md border ${selectedActivities.includes(activity) ? 'bg-primary/10 border-primary/30' : 'bg-background border-input'} transition-colors cursor-pointer`}
                      onClick={() => handleActivityToggle(activity)}
                    >
                      <Checkbox 
                        id={`activity-${activity}`} 
                        checked={selectedActivities.includes(activity)}
                        onCheckedChange={() => handleActivityToggle(activity)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                      <Label 
                        htmlFor={`activity-${activity}`} 
                        className="cursor-pointer text-sm font-medium"
                      >
                        {activity}
                      </Label>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="h-4 w-4 text-primary" />
                    <Label htmlFor="accommodation" className="font-medium">Accommodation Type</Label>
                  </div>
                  <Select value={accommodationType} onValueChange={setAccommodationType}>
                    <SelectTrigger className="border-primary/20 focus:border-primary/80 transition-colors h-11">
                      <SelectValue placeholder="Select accommodation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hostel">Hostel</SelectItem>
                      <SelectItem value="Hotel">Hotel</SelectItem>
                      <SelectItem value="Resort">Resort</SelectItem>
                      <SelectItem value="Airbnb">Airbnb</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Bus className="h-4 w-4 text-primary" />
                    <Label htmlFor="transport" className="font-medium">Transport Preference</Label>
                  </div>
                  <Select value={transportPreference} onValueChange={setTransportPreference}>
                    <SelectTrigger className="border-primary/20 focus:border-primary/80 transition-colors h-11">
                      <SelectValue placeholder="Select transport preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public Transport">Public Transport</SelectItem>
                      <SelectItem value="Car Rental">Car Rental</SelectItem>
                      <SelectItem value="Walking">Walking</SelectItem>
                      <SelectItem value="Ridesharing">Ridesharing</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Utensils className="h-4 w-4 text-primary" />
                    <Label htmlFor="dietary" className="font-medium">Dietary Preferences</Label>
                  </div>
                  <Select value={dietaryPreferences} onValueChange={setDietaryPreferences}>
                    <SelectTrigger className="border-primary/20 focus:border-primary/80 transition-colors h-11">
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
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <Label htmlFor="duration" className="font-medium">Trip Duration</Label>
                    </div>
                    <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {durationDays} days
                    </span>
                  </div>
                  <Slider 
                    id="duration"
                    defaultValue={[3]} 
                    min={1} 
                    max={10} 
                    step={1}
                    onValueChange={(value) => setDurationDays(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 day</span>
                    <span>10 days</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="border-t bg-muted/10 py-4">
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-95 transition-opacity" 
              onClick={handleSubmit}
              disabled={loading || !destination || selectedActivities.length === 0}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Itinerary...
                </span>
              ) : (
                'Create My Itinerary'
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TravelForm;
