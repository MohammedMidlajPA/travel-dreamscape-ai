
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import APIKeySetup from '@/components/APIKeySetup';
import TravelForm from '@/components/TravelForm';
import WeatherCard from '@/components/WeatherCard';
import ItineraryDisplay from '@/components/ItineraryDisplay';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { areApiKeysSet } from '@/services/apiKeyService';
import { getWeather, WeatherData } from '@/services/weatherService';
import { generateItinerary, TravelPreferences, TravelItinerary } from '@/services/geminiService';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <TravelForm onSubmit={handleFormSubmit} loading={isLoading} />
            
            {currentWeather && (
              <WeatherCard weather={currentWeather} />
            )}
          </div>
          
          <div className="lg:col-span-2">
            {itinerary ? (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRegenerateItinerary}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate Itinerary
                  </Button>
                </div>
                <ItineraryDisplay itinerary={itinerary} />
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center p-12 border rounded-lg bg-muted/20"
              >
                <div className="text-center space-y-4 max-w-md">
                  <h3 className="text-2xl font-display font-semibold">Create Your Travel Plan</h3>
                  <p className="text-muted-foreground">
                    Fill out the form to get your personalized travel itinerary powered by AI and enhanced with real-time weather data.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
