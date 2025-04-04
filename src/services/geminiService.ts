
import { getGeminiApiKey } from './apiKeyService';

export interface TravelPreferences {
  destination: string;
  budgetType: string;
  activities: string[];
  accommodationType: string;
  transportPreference: string;
  dietaryPreferences: string;
  durationDays: number;
}

export interface ItineraryDay {
  day: number;
  activities: string[];
  meals: string[];
  accommodation: string;
  transportation: string;
  weatherConsideration?: string;
}

export interface TravelItinerary {
  destination: string;
  summary: string;
  budgetEstimate: string;
  days: ItineraryDay[];
}

export async function generateItinerary(
  preferences: TravelPreferences,
  weatherInfo?: string
): Promise<TravelItinerary> {
  const apiKey = getGeminiApiKey();
  
  if (!apiKey) {
    throw new Error('Gemini API key is not set');
  }

  try {
    // Construct the prompt for Gemini
    const activitiesString = preferences.activities.join(', ');
    const weatherContext = weatherInfo ? 
      `Consider this current weather information for the destination: ${weatherInfo}.` : '';
    
    const prompt = `Create a detailed ${preferences.durationDays}-day travel itinerary for ${preferences.destination} with the following preferences:
      - Budget: ${preferences.budgetType}
      - Preferred Activities: ${activitiesString}
      - Accommodation Type: ${preferences.accommodationType}
      - Transport Preference: ${preferences.transportPreference}
      - Dietary Preferences: ${preferences.dietaryPreferences}
      ${weatherContext}
      
      Format the response as JSON with the following structure:
      {
        "destination": "City name",
        "summary": "Brief 2-3 sentence overview of the trip",
        "budgetEstimate": "Estimated budget range for the entire trip",
        "days": [
          {
            "day": 1,
            "activities": ["Activity 1", "Activity 2", "Activity 3"],
            "meals": ["Breakfast suggestion", "Lunch suggestion", "Dinner suggestion"],
            "accommodation": "Accommodation details",
            "transportation": "Transportation details",
            "weatherConsideration": "How the weather affects today's activities (if applicable)"
          }
          // Repeat for each day
        ]
      }`;

    // Make request to Gemini API
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-2:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate itinerary');
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;
    
    // Extract the JSON from the response
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                      content.match(/```\n([\s\S]*?)\n```/) || 
                      content.match(/{[\s\S]*?}/);
                      
    let jsonContent = jsonMatch ? jsonMatch[0] : content;
    
    // Clean up the JSON string
    jsonContent = jsonContent.replace(/```json\n|```\n|```/g, '');
    
    try {
      return JSON.parse(jsonContent);
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      
      // If JSON parsing fails, create a basic structure
      return {
        destination: preferences.destination,
        summary: "We couldn't generate a detailed itinerary. Please try again later.",
        budgetEstimate: "Unknown",
        days: Array.from({ length: preferences.durationDays }, (_, i) => ({
          day: i + 1,
          activities: ["Explore the city"],
          meals: ["Local cuisine"],
          accommodation: preferences.accommodationType,
          transportation: preferences.transportPreference
        }))
      };
    }
  } catch (error) {
    console.error('Error generating itinerary:', error);
    throw error;
  }
}
