
import { motion } from 'framer-motion';
import { MapPin, Calendar, Sparkle, Compass } from 'lucide-react';

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
          className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-3 shadow-md"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkle className="h-8 w-8 text-primary" />
            </motion.div>
          ) : (
            <Compass className="h-8 w-8 text-primary" />
          )}
        </motion.div>
        <motion.h2 
          className="text-3xl font-display font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Create Your Dream Itinerary
        </motion.h2>
        <motion.p 
          className="text-muted-foreground max-w-lg text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Our AI will generate a personalized travel plan based on your preferences, with real-time weather data and accommodation recommendations
        </motion.p>
      </div>
      <div className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.05, color: "var(--primary)" }}
        >
          <MapPin className="h-4 w-4 text-primary" />
          <span>Choose destinations</span>
        </motion.div>
        <span className="text-muted-foreground/40 hidden md:inline">•</span>
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          whileHover={{ scale: 1.05, color: "var(--primary)" }}
        >
          <Calendar className="h-4 w-4 text-primary" />
          <span>Set preferences</span>
        </motion.div>
        <span className="text-muted-foreground/40 hidden md:inline">•</span>
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileHover={{ scale: 1.05, color: "var(--primary)" }}
        >
          <Sparkle className="h-4 w-4 text-primary" />
          <span>Get personalized plan</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TravelFormHeader;
