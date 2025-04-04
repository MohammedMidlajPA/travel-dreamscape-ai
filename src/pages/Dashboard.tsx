
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import APIKeySetup from '@/components/APIKeySetup';
import TravelForm from '@/components/TravelForm';
import WeatherCard from '@/components/WeatherCard';
import ItineraryDisplay from '@/components/ItineraryDisplay';
import { Button } from '@/components/ui/button';
import { RefreshCw, MapPin, Calendar, Tag } from 'lucide-react';
import { areApiKeysSet } from '@/services/apiKeyService';
import { getWeather, WeatherData } from '@/services/weatherService';
import { generateItinerary, TravelPreferences, TravelItinerary } from '@/services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  const [apiKeysConfigured, setApiKeysConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [itinerary, setItinerary] = useState<TravelItinerary | null>(null);
  const [preferences, setPreferences] = useState<TravelPreferences | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API keys are set
    const keysSet = areApiKeysSet();
    setApiKeysConfigured(keysSet);
  }, []);

  const handleApiKeysConfigured = () => {
    setApiKeysConfigured(true);
  };

  const handleFormSubmit = async (formPreferences: TravelPreferences) => {
    setIsLoading(true);
    setPreferences(formPreferences);
    
    try {
      // Fetch weather data for the destination
      const weatherData = await getWeather(formPreferences.destination);
      setCurrentWeather(weatherData);
      
      // Generate the itinerary with weather information
      const weatherInfo = `${weatherData.description} with a temperature of ${weatherData.temperature}°C, humidity of ${weatherData.humidity}%, and wind speed of ${weatherData.windSpeed} m/s`;
      const generatedItinerary = await generateItinerary(formPreferences, weatherInfo);
      
      setItinerary(generatedItinerary);
      
      toast({
        title: 'Itinerary Generated',
        description: 'Your personalized travel plan is ready!',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate itinerary. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateItinerary = async () => {
    if (!preferences) return;
    
    setIsLoading(true);
    
    try {
      // Use the existing weather data if available, or fetch new data
      let weatherInfo = '';
      if (currentWeather) {
        weatherInfo = `${currentWeather.description} with a temperature of ${currentWeather.temperature}°C, humidity of ${currentWeather.humidity}%, and wind speed of ${currentWeather.windSpeed} m/s`;
      }
      
      const regeneratedItinerary = await generateItinerary(preferences, weatherInfo);
      setItinerary(regeneratedItinerary);
      
      toast({
        title: 'Itinerary Regenerated',
        description: 'Your new travel plan is ready!',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to regenerate itinerary. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!apiKeysConfigured) {
    return <APIKeySetup onComplete={handleApiKeysConfigured} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-center">
            Your <span className="text-primary">AI-Powered</span> Travel Planner
          </h1>
          <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
            Create a personalized travel itinerary with real-time weather data and local recommendations
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TravelForm onSubmit={handleFormSubmit} loading={isLoading} />
            
            <AnimatePresence>
              {currentWeather && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <WeatherCard weather={currentWeather} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {preferences && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Card className="p-4 bg-primary/5 border-primary/20">
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary" />
                    Trip Preferences
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span className="text-muted-foreground">Destination:</span> 
                      <span className="font-medium ml-auto">{preferences.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span className="text-muted-foreground">Duration:</span> 
                      <span className="font-medium ml-auto">{preferences.durationDays} days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-3.5 w-3.5 text-primary" />
                      <span className="text-muted-foreground">Budget:</span> 
                      <span className="font-medium ml-auto">{preferences.budgetType}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {itinerary ? (
                <motion.div 
                  key="itinerary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-display font-bold">Your Travel Itinerary</h2>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleRegenerateItinerary}
                      disabled={isLoading}
                      className="flex items-center gap-2 hover-lift"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                      Regenerate Itinerary
                    </Button>
                  </div>
                  <ItineraryDisplay itinerary={itinerary} />
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex items-center justify-center p-12 border rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 shadow-sm"
                >
                  <div className="text-center space-y-4 max-w-md">
                    <div className="h-24 w-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse" 
                        }}
                      >
                        <MapPin className="h-12 w-12 text-primary" />
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-display font-semibold">Plan Your Dream Journey</h3>
                    <p className="text-muted-foreground">
                      Fill out the form to get your AI-generated travel itinerary with personalized recommendations based on your preferences and current weather conditions.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
