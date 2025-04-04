
import { TravelItinerary } from '@/services/geminiService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

interface ItineraryDisplayProps {
  itinerary: TravelItinerary;
}

const ItineraryDisplay = ({ itinerary }: ItineraryDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-display">Your {itinerary.destination} Adventure</CardTitle>
          <p className="text-muted-foreground">{itinerary.summary}</p>
          <div className="mt-2 inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
            Budget: {itinerary.budgetEstimate}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="day-1" className="w-full">
            <TabsList className="grid grid-cols-3 sm:grid-cols-5 mb-4">
              {itinerary.days.slice(0, 5).map((day) => (
                <TabsTrigger key={day.day} value={`day-${day.day}`}>
                  Day {day.day}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {itinerary.days.map((day) => (
              <TabsContent key={day.day} value={`day-${day.day}`} className="h-[calc(100vh-400px)]">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Activities</h3>
                      <ul className="space-y-2">
                        {day.activities.map((activity, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <span className="flex-shrink-0 mr-2 bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </span>
                            <span>{activity}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Meals</h3>
                      <ul className="space-y-2">
                        {day.meals.map((meal, index) => (
                          <li key={index} className="flex items-start">
                            <span className="font-medium mr-2 text-muted-foreground w-20">
                              {index === 0 ? 'Breakfast:' : index === 1 ? 'Lunch:' : 'Dinner:'}
                            </span>
                            <span>{meal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Accommodation</h3>
                        <p>{day.accommodation}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Transportation</h3>
                        <p>{day.transportation}</p>
                      </div>
                    </div>
                    
                    {day.weatherConsideration && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Weather Considerations</h3>
                          <p className="text-sm bg-secondary/5 p-3 rounded-md italic">
                            {day.weatherConsideration}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ItineraryDisplay;
