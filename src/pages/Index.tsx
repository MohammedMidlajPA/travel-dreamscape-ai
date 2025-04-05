
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SignInButton, SignUpButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import AnimatedButton from '@/components/AnimatedButton';

const Index = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [isHovered, setIsHovered] = useState(false);

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-300 dark:bg-blue-900 opacity-30 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-purple-300 dark:bg-purple-900 opacity-30 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Travel Dreamscape
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                AI-powered travel planning tailored just for you. Discover your next adventure with personalized itineraries and real-time weather insights.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <SignedOut>
                  <SignUpButton mode="modal">
                    <AnimatedButton 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg"
                    >
                      Sign Up Free
                    </AnimatedButton>
                  </SignUpButton>
                  
                  <SignInButton mode="modal">
                    <AnimatedButton variant="ghost" className="px-8 py-3">
                      Sign In
                    </AnimatedButton>
                  </SignInButton>
                </SignedOut>
                
                <SignedIn>
                  <AnimatedButton 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg"
                    onClick={handleGetStarted}
                  >
                    Go to Dashboard
                  </AnimatedButton>
                </SignedIn>
              </motion.div>
            </motion.div>
            
            {/* Image/Illustration */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 blur-xl"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, 0] 
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
                <motion.img 
                  src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Travel destinations" 
                  className="rounded-xl shadow-2xl w-full relative z-10 object-cover aspect-video"
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-5 -left-5 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-20"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <div className="text-sm font-medium">Paris, France</div>
                  <div className="text-xs text-gray-500">Popular Destination</div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-20"
                  animate={{ 
                    y: [0, 10, 0],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <div className="text-sm font-medium">Bali, Indonesia</div>
                  <div className="text-xs text-gray-500">Trending Now</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Plan Your Perfect Trip
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Itineraries",
                description: "Our advanced AI creates personalized travel plans based on your preferences and interests.",
                icon: "✨"
              },
              {
                title: "Real-time Weather",
                description: "Stay informed with up-to-date weather conditions for your destination.",
                icon: "🌦️"
              },
              {
                title: "Hotel Recommendations",
                description: "Discover the perfect accommodations that fit your style and budget.",
                icon: "🏨"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container px-4 mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to start your journey?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join today and transform the way you travel with AI-powered recommendations tailored just for you.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <SignedOut>
              <SignUpButton mode="modal">
                <AnimatedButton 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg shadow-lg text-lg"
                >
                  Create Free Account
                </AnimatedButton>
              </SignUpButton>
            </SignedOut>
            
            <SignedIn>
              <AnimatedButton 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg shadow-lg text-lg"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </AnimatedButton>
            </SignedIn>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
