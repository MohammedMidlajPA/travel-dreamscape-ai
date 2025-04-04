
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SignInButton, SignUpButton, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <span className="font-display font-bold text-xl">Travel Dreamscape AI</span>
          </a>
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Sign Up</Button>
                </SignUpButton>
              </>
            )}
          </div>
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
              Your AI Travel Planner for Unforgettable Adventures
            </h1>
            <p className="text-xl text-muted-foreground">
              Get personalized travel itineraries powered by AI, with real-time weather data to make your journey perfect.
            </p>
            <div className="space-x-4">
              {isSignedIn ? (
                <Button size="lg" onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
                </Button>
              ) : (
                <SignUpButton mode="modal">
                  <Button size="lg">Get Started</Button>
                </SignUpButton>
              )}
              <Button size="lg" variant="outline">Learn More</Button>
            </div>
            <div className="pt-4 flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border-2 border-background">
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join 1,000+ travelers planning their trips with AI
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-video bg-travel-gradient flex items-center justify-center p-8 text-white">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-display font-bold">Dream • Plan • Travel</h3>
                <p>Your personalized AI travel companion</p>
                <div className="pt-4">
                  {isSignedIn ? (
                    <Button variant="secondary" size="lg" onClick={() => navigate("/dashboard")}>
                      Create Your Plan
                    </Button>
                  ) : (
                    <SignUpButton mode="modal">
                      <Button variant="secondary" size="lg">
                        Try It Free
                      </Button>
                    </SignUpButton>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-display font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tell us your preferences",
                description: "Input your destination, budget, activities, and dietary preferences."
              },
              {
                title: "AI generates your itinerary",
                description: "Our advanced AI creates a personalized travel plan just for you."
              },
              {
                title: "Enjoy your perfect trip",
                description: "Get real-time weather updates and adjust your plans accordingly."
              }
            ].map((step, index) => (
              <div key={index} className="p-6 rounded-lg border bg-card text-card-foreground shadow">
                <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 Travel Dreamscape AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
