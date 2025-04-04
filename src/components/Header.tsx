
import { UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Bell, Settings, MapPin, Search, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40"
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <a href="/" className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-xl hidden sm:inline-block">Travel Dreamscape AI</span>
            <span className="font-display font-bold text-xl sm:hidden">TDA</span>
          </a>
        </motion.div>

        <motion.div 
          className={`${isSearchOpen ? 'w-full md:w-96' : 'w-0 md:w-96'} transition-all duration-300 overflow-hidden mx-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isSearchOpen && (
            <div className="relative w-full">
              <input 
                className="w-full rounded-full py-2 pl-10 pr-4 border border-input bg-background" 
                placeholder="Search destinations..." 
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="relative hover:bg-primary/10 transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-primary/10 transition-colors"
            onClick={() => navigate("/settings")}
          >
            <Settings className="h-5 w-5" />
          </Button>
          <UserButton 
            afterSignOutUrl="/" 
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 ring-2 ring-primary/20 hover:ring-primary transition-all"
              }
            }}
          />
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
