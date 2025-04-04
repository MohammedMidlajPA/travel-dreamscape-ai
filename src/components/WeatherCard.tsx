
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/services/weatherService';
import { motion } from 'framer-motion';
import { Droplets, Wind } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  // Format the weather description to be title case
  const formatDescription = (desc: string) => {
    return desc.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full border-primary/20 hover:border-primary/40 transition-colors">
        <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="flex items-center justify-between">
            <motion.span 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-medium"
            >
              Weather in {weather.cityName}
            </motion.span>
            <motion.img 
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
              alt={weather.description}
              className="w-16 h-16"
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="text-center"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-4xl font-bold text-primary">{Math.round(weather.temperature)}°C</p>
              <p className="text-sm text-muted-foreground mt-1">{formatDescription(weather.description)}</p>
            </motion.div>
            <motion.div 
              className="space-y-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 bg-primary/5 p-2 rounded-md">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Humidity:</span>
                <span className="text-sm font-medium ml-auto">{weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/5 p-2 rounded-md">
                <Wind className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Wind:</span>
                <span className="text-sm font-medium ml-auto">{weather.windSpeed} m/s</span>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WeatherCard;
