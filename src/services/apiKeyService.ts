
// Store and retrieve API keys from localStorage

const GEMINI_API_KEY_STORAGE = 'gemini_api_key';
const OPENWEATHER_API_KEY_STORAGE = 'openweather_api_key';
const HOTEL_API_KEY_STORAGE = 'hotel_api_key';

// Pre-set API keys
const DEFAULT_GEMINI_API_KEY = 'AIzaSyAYOmUupyLNRP6e-Hfe6vHyFhFSIzc5hbQ';
const DEFAULT_OPENWEATHER_API_KEY = '56323c8899debd1499e0677c6801c933';
const DEFAULT_HOTEL_API_KEY = '68f222cff5msha60d5dc725cc5e1p1805d0jsn77a01ec207ca';

export function getGeminiApiKey(): string {
  return localStorage.getItem(GEMINI_API_KEY_STORAGE) || DEFAULT_GEMINI_API_KEY;
}

export function setGeminiApiKey(key: string): void {
  localStorage.setItem(GEMINI_API_KEY_STORAGE, key);
}

export function getWeatherApiKey(): string {
  return localStorage.getItem(OPENWEATHER_API_KEY_STORAGE) || DEFAULT_OPENWEATHER_API_KEY;
}

export function setWeatherApiKey(key: string): void {
  localStorage.setItem(OPENWEATHER_API_KEY_STORAGE, key);
}

export function getHotelApiKey(): string {
  return localStorage.getItem(HOTEL_API_KEY_STORAGE) || DEFAULT_HOTEL_API_KEY;
}

export function setHotelApiKey(key: string): void {
  localStorage.setItem(HOTEL_API_KEY_STORAGE, key);
}

export function areApiKeysSet(): boolean {
  // Since we now have default keys, always return true
  return true;
}
