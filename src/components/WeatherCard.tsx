
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/services/weatherService';
import { motion } from 'framer-motion';
import { Droplets, Wind, Thermometer, Cloud, Sun, CloudRain, CloudSnow, CloudFog } from 'lucide-react';

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
  
  // Select weather icon based on description
  const getWeatherIcon = (description: string, iconCode: string) => {
    const desc = description.toLowerCase();
    
    if (desc.includes('rain') || desc.includes('drizzle') || iconCode.includes('09') || iconCode.includes('10')) {
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    } else if (desc.includes('snow') || iconCode.includes('13')) {
      return <CloudSnow className="h-8 w-8 text-blue-300" />;
    } else if (desc.includes('fog') || desc.includes('mist') || iconCode.includes('50')) {
      return <CloudFog className="h-8 w-8 text-gray-400" />;
    } else if (desc.includes('cloud') || iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) {
      return <Cloud className="h-8 w-8 text-gray-500" />;
    } else {
      return <Sun className="h-8 w-8 text-yellow-500" />;
    }
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
      <Card className="overflow-hidden h-full border-primary/20 hover:border-primary/40 transition-colors shadow-md hover:shadow-lg">
        <CardHeader className="pb-2 bg-gradient-to-r from-primary/15 to-secondary/15">
          <CardTitle className="flex items-center justify-between">
            <motion.span 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-medium flex items-center gap-2"
            >
              <motion.div
                animate={{ 
                  y: [0, -3, 0] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              >
                {getWeatherIcon(weather.description, weather.icon)}
              </motion.div>
              Weather in {weather.cityName}
            </motion.span>
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-16 h-16 flex items-center justify-center"
            >
              <img 
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
                alt={weather.description}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              className="text-center p-3 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              >
                <Thermometer className="h-6 w-6 mx-auto mb-1 text-primary" />
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {Math.round(weather.temperature)}°C
                </p>
                <p className="text-sm text-muted-foreground mt-1 font-medium">{formatDescription(weather.description)}</p>
              </motion.div>
            </motion.div>
            <motion.div 
              className="space-y-4"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 bg-primary/5 p-3 rounded-md hover:bg-primary/10 transition-colors">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Humidity:</span>
                <motion.span 
                  className="text-sm font-medium ml-auto"
                  animate={{ 
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                >
                  {weather.humidity}%
                </motion.span>
              </div>
              <div className="flex items-center gap-2 bg-primary/5 p-3 rounded-md hover:bg-primary/10 transition-colors">
                <Wind className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-muted-foreground">Wind:</span>
                <motion.span 
                  className="text-sm font-medium ml-auto"
                  animate={{ 
                    x: [0, 3, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                >
                  {weather.windSpeed} m/s
                </motion.span>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WeatherCard;
