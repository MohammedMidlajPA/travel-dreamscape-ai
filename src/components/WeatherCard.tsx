
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/services/weatherService';
import { motion } from 'framer-motion';

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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-2 bg-primary/10">
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg font-medium">Weather in {weather.cityName}</span>
            <img 
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
              alt={weather.description}
              className="w-12 h-12"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{Math.round(weather.temperature)}°C</p>
              <p className="text-sm text-muted-foreground">{formatDescription(weather.description)}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Humidity:</span>
                <span className="font-medium">{weather.humidity}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Wind:</span>
                <span className="font-medium">{weather.windSpeed} m/s</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WeatherCard;
