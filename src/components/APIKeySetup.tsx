
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { saveGeminiApiKey, saveWeatherApiKey } from '@/services/apiKeyService';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface APIKeySetupProps {
  onComplete: () => void;
}

const APIKeySetup = ({ onComplete }: APIKeySetupProps) => {
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [weatherApiKey, setWeatherApiKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!geminiApiKey || !weatherApiKey) {
      toast({
        title: "Missing API Keys",
        description: "Please enter both API keys to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate validation
    setTimeout(() => {
      saveGeminiApiKey(geminiApiKey);
      saveWeatherApiKey(weatherApiKey);
      
      toast({
        title: "API Keys Saved",
        description: "Your API keys have been saved successfully."
      });
      
      setIsSubmitting(false);
      onComplete();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-4"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-display">Welcome to Travel Dreamscape</CardTitle>
          <CardDescription>Enter your API keys to get started with personalized travel planning.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="gemini-api-key">Gemini API Key</Label>
              <Input 
                id="gemini-api-key" 
                type="password" 
                placeholder="Enter your Gemini Flash 2 API key" 
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Get your Gemini API key from <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a>
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weather-api-key">OpenWeatherMap API Key</Label>
              <Input 
                id="weather-api-key" 
                type="password" 
                placeholder="Enter your OpenWeatherMap API key" 
                value={weatherApiKey}
                onChange={(e) => setWeatherApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Get your OpenWeatherMap API key from <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenWeatherMap</a>
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save API Keys'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default APIKeySetup;
