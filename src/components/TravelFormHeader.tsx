
import { motion } from 'framer-motion';
import { MapPin, Calendar, Sparkle, Compass, Globe, Wind } from 'lucide-react';

interface TravelFormHeaderProps {
  loading: boolean;
}

const TravelFormHeader = ({ loading }: TravelFormHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-8"
    >
      <div className="flex flex-col items-center text-center space-y-3 mb-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <motion.div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-3 shadow-md">
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkle className="h-9 w-9 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                animate={{ 
                  rotateZ: [0, 10, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              >
                <Compass className="h-9 w-9 text-primary" />
              </motion.div>
            )}
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-0 -right-3 h-4 w-4 bg-secondary rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          
          <motion.div 
            className="absolute -left-3 bottom-3 h-3 w-3 bg-primary rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </motion.div>
        
        <motion.h2 
          className="text-3xl font-display font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.span 
            className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            style={{ backgroundSize: '200% auto' }}
          >
            Create Your Dream Itinerary
          </motion.span>
        </motion.h2>
        
        <motion.p 
          className="text-muted-foreground max-w-lg text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Our AI will generate a personalized travel plan based on your preferences, 
          with real-time weather data and local recommendations
        </motion.p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
        <motion.div 
          className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.1)" }}
        >
          <MapPin className="h-4 w-4 text-primary" />
          <span>Select destination</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2 bg-secondary/5 px-3 py-1.5 rounded-full"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--secondary), 0.1)" }}
        >
          <Calendar className="h-4 w-4 text-secondary" />
          <span>Set preferences</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.1)" }}
        >
          <Sparkle className="h-4 w-4 text-primary" />
          <span>Get AI plan</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2 bg-secondary/5 px-3 py-1.5 rounded-full"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--secondary), 0.1)" }}
        >
          <Globe className="h-4 w-4 text-secondary" />
          <span>Explore locally</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.1)" }}
        >
          <Wind className="h-4 w-4 text-primary" />
          <span>Check weather</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TravelFormHeader;
