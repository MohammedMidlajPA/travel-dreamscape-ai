
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SignInButton, SignUpButton, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { MapPin, CalendarDays, Sparkles, ChevronRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <motion.a 
            href="/" 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MapPin className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-xl">Travel Dreamscape AI</span>
          </motion.a>
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isSignedIn ? (
              <Button onClick={() => navigate("/dashboard")} className="relative overflow-hidden group">
                <span className="relative z-10">Dashboard</span>
                <span className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
              </Button>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" className="hover:text-primary transition-colors">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="relative overflow-hidden group">
                    <span className="relative z-10">Sign Up</span>
                    <span className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
                  </Button>
                </SignUpButton>
              </>
            )}
          </motion.div>
        </div>
      </header>

      <main className="flex-1 container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              <span className="text-primary">AI-Powered</span> Travel Planner for Unforgettable Adventures
            </h1>
            <p className="text-xl text-muted-foreground">
              Get personalized travel itineraries with real-time weather data and hotel recommendations to make your journey perfect.
            </p>
            <motion.div 
              className="space-x-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isSignedIn ? (
                <Button 
                  size="lg" 
                  onClick={() => navigate("/dashboard")}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  Go to Dashboard
                </Button>
              ) : (
                <SignUpButton mode="modal">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </Button>
                </SignUpButton>
              )}
              <Button size="lg" variant="outline" className="border-primary/20 hover:border-primary/50 transition-colors">
                Learn More
              </Button>
            </motion.div>
            
            <motion.div 
              className="pt-4 flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-background shadow-sm"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join 1,000+ travelers planning their trips with AI
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-video bg-gradient-to-tr from-primary to-secondary flex items-center justify-center p-8 text-white">
              <div className="text-center space-y-6">
                <motion.h3 
                  className="text-3xl font-display font-bold"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Dream • Plan • Travel
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Your personalized AI travel companion
                </motion.p>
                <motion.div 
                  className="pt-4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {isSignedIn ? (
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      onClick={() => navigate("/dashboard")}
                      className="font-semibold"
                    >
                      Create Your Plan
                    </Button>
                  ) : (
                    <SignUpButton mode="modal">
                      <Button 
                        variant="secondary" 
                        size="lg"
                        className="font-semibold"
                      >
                        Try It Free
                      </Button>
                    </SignUpButton>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-24 text-center"
        >
          <motion.h2 variants={item} className="text-3xl font-display font-bold mb-12">How It Works</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="h-6 w-6 text-primary" />,
                title: "Tell us your preferences",
                description: "Input your destination, budget, activities, and dietary preferences."
              },
              {
                icon: <Sparkles className="h-6 w-6 text-secondary" />,
                title: "AI generates your itinerary",
                description: "Our advanced AI creates a personalized travel plan just for you."
              },
              {
                icon: <CalendarDays className="h-6 w-6 text-primary" />,
                title: "Enjoy your perfect trip",
                description: "Get real-time weather updates and adjust your plans accordingly."
              }
            ].map((step, index) => (
              <motion.div 
                key={index} 
                variants={item}
                whileHover={{ y: -5 }}
                className="p-6 rounded-lg border bg-card text-card-foreground shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 h-14 w-14 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 text-primary flex items-center justify-center text-xl font-bold mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                <Button variant="ghost" size="sm" className="mt-4 text-primary">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className="border-t py-6 md:py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-muted-foreground">© 2025 Travel Dreamscape AI. All rights reserved.</p>
          </motion.div>
          <motion.div 
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
