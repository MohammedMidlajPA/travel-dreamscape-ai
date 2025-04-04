
import { motion } from 'framer-motion';
import { MapPin, Calendar, Sparkle } from 'lucide-react';

interface TravelFormHeaderProps {
  loading: boolean;
}

const TravelFormHeader = ({ loading }: TravelFormHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <div className="flex flex-col items-center text-center space-y-2 mb-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2"
        >
          {loading ? 
            <Sparkle className="h-6 w-6 text-primary animate-pulse" /> : 
            <MapPin className="h-6 w-6 text-primary" />
          }
        </motion.div>
        <h2 className="text-2xl font-display font-bold">Create Your Dream Itinerary</h2>
        <p className="text-muted-foreground max-w-md">
          Our AI will generate a personalized travel plan based on your preferences
        </p>
      </div>
      <div className="flex justify-center gap-4 text-sm text-muted-foreground">
        <motion.div 
          className="flex items-center gap-1.5"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MapPin className="h-4 w-4 text-primary" />
          <span>Choose destinations</span>
        </motion.div>
        <span className="text-muted-foreground/40">•</span>
        <motion.div 
          className="flex items-center gap-1.5"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Calendar className="h-4 w-4 text-primary" />
          <span>Set preferences</span>
        </motion.div>
        <span className="text-muted-foreground/40">•</span>
        <motion.div 
          className="flex items-center gap-1.5"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Sparkle className="h-4 w-4 text-primary" />
          <span>Get personalized plan</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TravelFormHeader;
