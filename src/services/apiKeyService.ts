
// Local storage key names
const GEMINI_API_KEY = 'gemini_api_key';
const WEATHER_API_KEY = 'weather_api_key';
const HOTEL_API_KEY = 'hotel_api_key';

// Default API keys
const DEFAULT_GEMINI_API_KEY = 'AIzaSyAYOmUupyLNRP6e-Hfe6vHyFhFSIzc5hbQ';
const DEFAULT_WEATHER_API_KEY = '56323c8899debd1499e0677c6801c933';
const DEFAULT_HOTEL_API_KEY = '68f222cff5msha60d5dc725cc5e1p1805d0jsn77a01ec207ca';

// Save API keys
export const saveGeminiApiKey = (key: string): void => {
  localStorage.setItem(GEMINI_API_KEY, key);
};

export const saveWeatherApiKey = (key: string): void => {
  localStorage.setItem(WEATHER_API_KEY, key);
};

export const saveHotelApiKey = (key: string): void => {
  localStorage.setItem(HOTEL_API_KEY, key);
};

// Get API keys
export const getGeminiApiKey = (): string => {
  return localStorage.getItem(GEMINI_API_KEY) || DEFAULT_GEMINI_API_KEY;
};

export const getWeatherApiKey = (): string => {
  return localStorage.getItem(WEATHER_API_KEY) || DEFAULT_WEATHER_API_KEY;
};

export const getHotelApiKey = (): string => {
  return localStorage.getItem(HOTEL_API_KEY) || DEFAULT_HOTEL_API_KEY;
};

// Check if API keys are set
export const areApiKeysSet = (): boolean => {
  return true; // Always return true now that we have default keys
};
