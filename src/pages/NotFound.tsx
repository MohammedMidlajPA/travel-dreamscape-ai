
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md p-8"
      >
        <h1 className="text-9xl font-display font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="space-x-4">
          <Button onClick={() => navigate("/")} size="lg">
            Return Home
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)} size="lg">
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
