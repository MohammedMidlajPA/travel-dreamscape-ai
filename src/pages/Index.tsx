
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SignInButton, SignUpButton, useAuth } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CalendarDays, Sparkles, ChevronRight, Globe, Sun, ArrowRight, Star } from "lucide-react";

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

  const features = [
    {
      icon: <MapPin className="h-10 w-10 text-primary" />,
      title: "Personalized Itineraries",
      description: "Get tailored travel plans based on your preferences, budget, and interests"
    },
    {
      icon: <Sun className="h-10 w-10 text-secondary" />,
      title: "Real-time Weather",
      description: "Plan with confidence using accurate weather forecasts for your destination"
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Local Recommendations",
      description: "Discover hidden gems and authentic experiences recommended by our AI"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <motion.a 
            href="/" 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <MapPin className="h-6 w-6 text-primary" />
              <motion.div
                className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-secondary"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
            </div>
            <span className="font-display font-bold text-xl">Travel Dreamscape AI</span>
          </motion.a>
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isSignedIn ? (
              <Button 
                onClick={() => navigate("/dashboard")} 
                className="relative overflow-hidden group bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  Dashboard
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </span>
              </Button>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button 
                    variant="ghost" 
                    className="hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button 
                    className="bg-gradient-to-r from-primary to-secondary hover:shadow-md transition-all duration-300"
                  >
                    <span className="flex items-center">
                      Sign Up
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse" 
                        }}
                        className="ml-2"
                      >
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                    </span>
                  </Button>
                </SignUpButton>
              </>
            )}
          </motion.div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div 
              className="absolute top-20 right-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute bottom-20 left-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute top-40 left-1/3 h-6 w-6 rounded-full bg-primary"
              animate={{ 
                y: [0, 50, 0],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute bottom-40 right-1/3 h-4 w-4 rounded-full bg-secondary"
              animate={{ 
                y: [0, -30, 0],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          </div>

          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                  <motion.span
                    animate={{ 
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                    className="flex items-center"
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-2" />
                    AI-Powered Travel Planning
                  </motion.span>
                </div>
                
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                    style={{ backgroundSize: '200% auto' }}
                  >
                    Dream • Plan • Travel
                  </motion.span>
                  <br />
                  Your Perfect Journey Awaits
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-muted-foreground max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Get personalized travel itineraries with real-time weather data and local recommendations to make your journey unforgettable.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {isSignedIn ? (
                    <Button 
                      size="lg" 
                      onClick={() => navigate("/dashboard")}
                      className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 text-white font-medium"
                    >
                      <span className="flex items-center">
                        Create Your Itinerary
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse" 
                          }}
                        >
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </motion.div>
                      </span>
                    </Button>
                  ) : (
                    <SignUpButton mode="modal">
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 text-white font-medium"
                      >
                        <span className="flex items-center">
                          Get Started Free
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ 
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "reverse" 
                            }}
                          >
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </motion.div>
                        </span>
                      </Button>
                    </SignUpButton>
                  )}
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-primary/20 hover:border-primary/50 transition-colors"
                  >
                    <span className="flex items-center">
                      Watch Demo
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse" 
                        }}
                        className="ml-2"
                      >
                        <Globe className="h-5 w-5 text-primary" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
                
                <motion.div 
                  className="pt-6 flex items-center space-x-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div 
                        key={i} 
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-background shadow-sm"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        whileHover={{ y: -5, zIndex: 10 }}
                      >
                        {i}
                      </motion.div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div 
                          key={star}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + (star * 0.1) }}
                        >
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Trusted by 1,000+ travelers worldwide
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl -rotate-2 scale-[0.98] blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl rotate-1 scale-[0.96] blur-sm"></div>
                
                <motion.div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[4/3] bg-gradient-to-tr from-primary to-secondary flex items-center justify-center p-8 text-white">
                    <div className="text-center space-y-6 max-w-md">
                      <motion.div 
                        className="flex justify-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <div className="relative">
                          <motion.div
                            animate={{ 
                              y: [0, -10, 0]
                            }}
                            transition={{ 
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "reverse" 
                            }}
                            className="bg-white/20 backdrop-blur-sm rounded-full p-4"
                          >
                            <Globe className="h-16 w-16" />
                          </motion.div>
                          <motion.div
                            className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full"
                            animate={{ 
                              scale: [1, 1.1, 1],
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse" 
                            }}
                          >
                            AI
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      <motion.h3 
                        className="text-3xl font-display font-bold"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        Discover Your Perfect Trip
                      </motion.h3>
                      
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-white/80"
                      >
                        Let our AI create a personalized travel plan just for you in seconds
                      </motion.p>
                      
                      <motion.div 
                        className="pt-6"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        {isSignedIn ? (
                          <Button 
                            variant="secondary" 
                            size="lg" 
                            onClick={() => navigate("/dashboard")}
                            className="font-semibold"
                          >
                            Plan Your Trip Now
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
                      
                      <motion.div
                        className="mt-6 grid grid-cols-3 gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        {['Paris', 'Tokyo', 'New York'].map((city, index) => (
                          <motion.div
                            key={city}
                            className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-sm"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9 + (index * 0.1) }}
                            whileHover={{ y: -3, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                          >
                            {city}
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="text-center mb-16"
            >
              <motion.h2 variants={item} className="text-3xl md:text-4xl font-display font-bold mb-4">How It Works</motion.h2>
              <motion.p variants={item} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to create your perfect travel itinerary with AI
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={item}
                  whileHover={{ y: -10, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)" }}
                  className="p-8 rounded-xl border bg-card text-card-foreground shadow transition-all duration-300"
                >
                  <div className="mb-6 relative">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto">
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 6,
                          repeat: Infinity,
                          repeatType: "reverse" 
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 h-6 w-6 bg-secondary/20 rounded-full flex items-center justify-center text-sm font-bold text-secondary"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 + (index * 0.2) }}
                    >
                      {index + 1}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                  
                  <Button variant="ghost" size="sm" className="mt-6 mx-auto text-primary block">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {isSignedIn ? (
                <Button 
                  size="lg" 
                  onClick={() => navigate("/dashboard")}
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300"
                >
                  Start Planning Your Trip
                </Button>
              ) : (
                <SignUpButton mode="modal">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300"
                  >
                    Create Your Free Account
                  </Button>
                </SignUpButton>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-display font-bold">Travel Dreamscape AI</span>
            <p className="text-sm text-muted-foreground ml-4">© 2025 All rights reserved.</p>
          </motion.div>
          <motion.div 
            className="flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Support</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
