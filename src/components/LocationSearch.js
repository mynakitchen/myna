import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapPin, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './LocationSearch.css';
import googleMapsManager from './GoogleMapsManager';

// Fallback locations for when Google Maps API is not available
const FALLBACK_LOCATIONS = [
  { placeId: 'taramani', description: 'Taramani, Chennai, Tamil Nadu', pincode: '600113' },
  { placeId: 'sholinganallur', description: 'Sholinganallur, Chennai, Tamil Nadu', pincode: '600119' },
  { placeId: 'perungudi', description: 'Perungudi, Chennai, Tamil Nadu', pincode: '600096' },
  { placeId: 'guindy', description: 'Guindy, Chennai, Tamil Nadu', pincode: '600032' },
  { placeId: 'velachery', description: 'Velachery, Chennai, Tamil Nadu', pincode: '600042' },
  { placeId: 'adyar', description: 'Adyar, Chennai, Tamil Nadu', pincode: '600020' },
  { placeId: 'anna-nagar-west', description: 'Anna Nagar West, Chennai, Tamil Nadu', pincode: '600088' },
  { placeId: 'tambaram-west', description: 'Tambaram West, Chennai, Tamil Nadu', pincode: '600089' },
  { placeId: 'tambaram', description: 'Tambaram, Chennai, Tamil Nadu', pincode: '600091' },
  { placeId: 'mylapore', description: 'Mylapore, Chennai, Tamil Nadu', pincode: '600100' }
];

const LocationSearch = ({ 
  onLocationSelect, 
  placeholder = "Search for your locality...",
  className = "",
  initialValue = "",
  id = ""
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);
  const [useFallback, setUseFallback] = useState(false);
  
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const autocompleteService = useRef(null);
  const geocoder = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Initialize Google Maps API using shared manager
  useEffect(() => {
    const initializeAPI = async () => {
      try {
        const services = await googleMapsManager.initialize();
        autocompleteService.current = services.autocompleteService;
        geocoder.current = services.geocoder;
        setUseFallback(false);
      } catch (error) {
        console.warn('Google Maps API initialization failed, using fallback mode:', error);
        setUseFallback(true);
      }
    };

    initializeAPI();

    return () => {
      // Cleanup timeout on unmount
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setError(null);

    // Only clear selected location if user is starting a new search
    if (query.length === 0) {
      setSelectedLocation(null);
      onLocationSelect(null);
    }

    if (query.length < 2) {
      setPredictions([]);
      setShowDropdown(false);
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search requests
    searchTimeoutRef.current = setTimeout(() => {
      setIsLoading(true);
      setShowDropdown(true);

      if (useFallback) {
        // Use fallback search
        const filtered = FALLBACK_LOCATIONS.filter(location =>
          location.description.toLowerCase().includes(query.toLowerCase())
        );
        setPredictions(filtered);
        setIsLoading(false);
      } else if (autocompleteService.current) {
        // Use Google Places API
        autocompleteService.current.getPlacePredictions(
          {
            input: query,
            componentRestrictions: { country: 'in' }, // Restrict to India
            types: ['geocode', 'establishment']
          },
          (predictions, status) => {
            setIsLoading(false);
            
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setPredictions(predictions || []);
            } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
              setPredictions([]);
            } else {
              setError('Unable to fetch locations');
              setPredictions([]);
            }
          }
        );
      } else {
        setIsLoading(false);
        setError('Location service not available');
      }
    }, 300); // 300ms debounce
  };

  // Extract pincode from address components
  const extractPincode = (addressComponents) => {
    if (!addressComponents) return null;
    
    const pincodeComponent = addressComponents.find(
      component => component.types.includes('postal_code')
    );
    
    return pincodeComponent ? pincodeComponent.long_name : null;
  };

  // Handle location selection
  const handleLocationSelect = (prediction) => {
    setSearchQuery(prediction.description);
    setSelectedLocation(prediction);
    setPredictions([]);
    setShowDropdown(false);
    setError(null);

    if (useFallback) {
      // Use fallback data
      const locationData = {
        placeId: prediction.placeId,
        description: prediction.description,
        formattedAddress: prediction.description,
        coordinates: null,
        addressComponents: [],
        pincode: prediction.pincode
      };
              onLocationSelect(locationData);
    } else if (geocoder.current) {
      // Use Google Geocoding API for more reliable pincode extraction
      geocoder.current.geocode(
        { 
          address: prediction.description,
          componentRestrictions: { country: 'in' }
        },
        (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK && results.length > 0) {
            const result = results[0];
            const pincode = extractPincode(result.address_components);
            
            const locationData = {
              placeId: prediction.place_id,
              description: prediction.description,
              formattedAddress: result.formatted_address,
              coordinates: {
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng()
              },
              addressComponents: result.address_components,
              pincode: pincode
            };
            
            onLocationSelect(locationData);
          } else {
            // Fallback to prediction data if geocoding fails
            const locationData = {
              placeId: prediction.place_id,
              description: prediction.description,
              formattedAddress: prediction.description,
              coordinates: null,
              addressComponents: [],
              pincode: null
            };
            onLocationSelect(locationData);
          }
        }
      );
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (predictions.length > 0) {
      setShowDropdown(true);
    }
  };

  // Handle input blur
  const handleInputBlur = () => {
    // Delay hiding dropdown to allow for clicks
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  // Clear search
  const handleClear = () => {
    setSearchQuery('');
    setSelectedLocation(null);
    setPredictions([]);
    setShowDropdown(false);
    setError(null);
    onLocationSelect(null);
    searchInputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
      searchInputRef.current?.blur();
    }
  };

  return (
    <div className={`location-search-container ${className}`} id={id}>
      <div className="location-search-input-wrapper">
        <div className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        
        <input
          ref={searchInputRef}
          type="text"
          className="location-search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        
        {searchQuery && (
          <button
            type="button"
            className="clear-button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
        
        {isLoading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="error-message">
          <FontAwesomeIcon icon={faTimes} />
          <span>{error}</span>
        </div>
      )}

      {/* Selected location display */}
      {selectedLocation && (
        <div className="selected-location">
          <FontAwesomeIcon icon={faCheck} className="check-icon" />
          <span className="selected-text">Location selected</span>
        </div>
      )}

      {/* Dropdown with predictions */}
      {showDropdown && (
        <div ref={dropdownRef} className="location-dropdown">
          {predictions.length > 0 ? (
            <div className="predictions-list">
              {predictions.map((prediction, index) => (
                <button
                  key={prediction.placeId || prediction.place_id}
                  className="prediction-item"
                  onClick={() => handleLocationSelect(prediction)}
                  onMouseDown={(e) => e.preventDefault()} // Prevent blur
                >
                  <div className="prediction-icon">
                    <FontAwesomeIcon icon={faMapPin} />
                  </div>
                  <div className="prediction-content">
                    <div className="prediction-main-text">
                      {useFallback 
                        ? prediction.description.split(',')[0]
                        : (prediction.structured_formatting?.main_text || prediction.description)
                      }
                    </div>
                    {useFallback ? (
                      <div className="prediction-secondary-text">
                        {prediction.description.split(',').slice(1).join(',').trim()}
                      </div>
                    ) : (
                      prediction.structured_formatting?.secondary_text && (
                        <div className="prediction-secondary-text">
                          {prediction.structured_formatting.secondary_text}
                        </div>
                      )
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : !isLoading && searchQuery.length >= 2 ? (
            <div className="no-results">
              <FontAwesomeIcon icon={faMapPin} />
              <span>No locations found</span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default LocationSearch; 