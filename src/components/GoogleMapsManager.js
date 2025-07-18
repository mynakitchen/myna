// Google Maps API Manager - Shared instance to prevent conflicts
class GoogleMapsManager {
  constructor() {
    this.autocompleteService = null;
    this.geocoder = null;
    this.isInitialized = false;
    this.isInitializing = false;
    this.callbacks = [];
  }

  async initialize() {
    if (this.isInitialized) {
      return { autocompleteService: this.autocompleteService, geocoder: this.geocoder };
    }

    if (this.isInitializing) {
      // Wait for initialization to complete
      return new Promise((resolve) => {
        this.callbacks.push(resolve);
      });
    }

    this.isInitializing = true;

    return new Promise((resolve, reject) => {
      const initGoogleMaps = () => {
        if (window.google && window.google.maps) {
          try {
            this.autocompleteService = new window.google.maps.places.AutocompleteService();
            this.geocoder = new window.google.maps.Geocoder();
            this.isInitialized = true;
            this.isInitializing = false;
            
            // Resolve all pending callbacks
            this.callbacks.forEach(callback => callback({ 
              autocompleteService: this.autocompleteService, 
              geocoder: this.geocoder 
            }));
            this.callbacks = [];
            
            resolve({ autocompleteService: this.autocompleteService, geocoder: this.geocoder });
          } catch (error) {
            this.isInitializing = false;
            reject(error);
          }
        } else {
          this.isInitializing = false;
          reject(new Error('Google Maps not available'));
        }
      };

      // Load Google Maps API if not already loaded
      if (!window.google) {
        const apiKey = 'AIzaSyAhG1wLZNpjxIit6_NAygigNJRqJFRCQK8';
        if (apiKey && apiKey !== 'your_google_maps_api_key_here') {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = initGoogleMaps;
          script.onerror = () => {
            this.isInitializing = false;
            reject(new Error('Failed to load Google Maps API'));
          };
          document.head.appendChild(script);
        } else {
          this.isInitializing = false;
          reject(new Error('No Google Maps API key found'));
        }
      } else {
        initGoogleMaps();
      }
    });
  }

  getServices() {
    return {
      autocompleteService: this.autocompleteService,
      geocoder: this.geocoder
    };
  }
}

// Create a singleton instance
const googleMapsManager = new GoogleMapsManager();

export default googleMapsManager; 