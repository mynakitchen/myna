import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDirections, 
  faMapPin, 
  faBuildingUser, 
  faCompass, 
  faChevronLeft, 
  faChevronRight, 
  faChevronUp, 
  faChevronDown, 
  faLocationDot, 
  faCircleCheck, 
  faSearch 
} from '@fortawesome/free-solid-svg-icons';
import './DeliveryMap.css';

// Tech parks data
const TECH_PARKS = [
  { id: 1, name: "Tidel Park", address: "4th Main Rd, TIDEL Park, Taramani", coordinates: [12.9950, 80.2450] },
  { id: 2, name: "DLF IT Park", address: "IT Expressway, Ramapuram", coordinates: [12.9850, 80.2200] },
  { id: 3, name: "Ascendas IT Park", address: "Rajiv Gandhi Salai, Taramani", coordinates: [12.9900, 80.2400] },
  { id: 4, name: "Elcot IT Park", address: "Rajiv Gandhi Salai, Sholinganallur", coordinates: [12.9000, 80.2300] },
  { id: 5, name: "SIPCOT IT Park", address: "Siruseri, Chennai", coordinates: [12.8200, 80.2100] },
  { id: 6, name: "Mahindra World City", address: "Natham Sub Post, Chengalpattu", coordinates: [12.7800, 80.0450] },
  { id: 7, name: "RMZ Millenia", address: "OMR, Perungudi", coordinates: [12.9600, 80.2500] },
  { id: 8, name: "SP Infocity", address: "Perungudi, Chennai", coordinates: [12.9650, 80.2550] },
  { id: 9, name: "Olympia Tech Park", address: "Guindy, Chennai", coordinates: [13.0100, 80.2200] },
  { id: 10, name: "Prestige Palladium", address: "Perungudi, Chennai", coordinates: [12.9700, 80.2600] },
  { id: 11, name: "L&T Tech Park", address: "Sholinganallur, Chennai", coordinates: [12.9100, 80.2200] },
  { id: 12, name: "Cognizant Mahindra", address: "Sholinganallur, Chennai", coordinates: [12.9050, 80.2250] }
];

const DeliveryMap = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeLocationId, setActiveLocationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListExpanded, setIsListExpanded] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Create an updated list of OMR coordinates including all tech parks for a more accurate route
  const omrCoordinates = [...TECH_PARKS].map(park => park.coordinates).sort((a, b) => {
    // Sort from north to south roughly (higher to lower latitude values)
    return b[0] - a[0];
  });

  // Filter locations based on search query
  const filteredLocations = TECH_PARKS.filter(park => 
    park.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    park.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const initMap = useCallback(() => {
    if (typeof window === 'undefined' || !window.L) {
      console.error('Leaflet not loaded');
      return;
    }

    try {
      console.log('Initializing map...');
      
      // Clear any existing map
      const mapElement = document.getElementById('map');
      if (mapElement && mapElement._leaflet_id) {
        mapElement._leaflet_id = null;
        mapElement.innerHTML = '';
      }

      const L = window.L;
      
      // Create map centered on OMR area
      const map = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true,
        dragging: true,
        tap: true,
        boxZoom: true,
        keyboard: true
      }).setView([12.9400, 80.2300], 12);

      // Store map instance
      mapInstanceRef.current = map;

      // Add custom attribution
      L.control.attribution({
        position: 'bottomright',
        prefix: false
      }).addTo(map).addAttribution('© OpenStreetMap contributors');

      // Add tile layer with error handling
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        errorTileUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2Y5ZjlmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNjY2MiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NYXAgdW5hdmFpbGFibGU8L3RleHQ+PC9zdmc+'
      });

      tileLayer.on('tileerror', function(error) {
        console.warn('Tile loading error:', error);
      });

      tileLayer.addTo(map);

      // Wait for tiles to load
      setTimeout(() => {
        console.log('Map tiles should be loaded, setting mapLoaded to true');
        setMapLoaded(true);
      }, 1000);

      try {
        // Add OMR route as a polyline
        if (omrCoordinates && omrCoordinates.length > 1) {
          const polyline = L.polyline(omrCoordinates, {
            color: '#D08C60',
            weight: 6,
            opacity: 0.8,
            smoothFactor: 1
          }).addTo(map);

          // Add a wider background line for better visibility
          L.polyline(omrCoordinates, {
            color: '#ffffff',
            weight: 10,
            opacity: 0.5,
            smoothFactor: 1
          }).addTo(map);

          console.log('OMR route polyline added successfully');
        }

        // Add tech park markers
        const markers = TECH_PARKS.map(park => {
          const marker = L.marker(park.coordinates, {
            icon: L.divIcon({
              className: 'custom-marker',
              html: `<div class="marker-pin" style="background-color: #D08C60; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })
          }).addTo(map);

          marker.bindPopup(`
            <div style="min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${park.name}</h3>
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${park.address}</p>
              <div style="padding: 8px; background-color: #f3f4f6; border-radius: 4px; margin-top: 8px;">
                <p style="margin: 0; font-size: 12px; color: #374151; font-weight: 500;">✅ Delivery Available</p>
              </div>
            </div>
          `);

          return { id: park.id, marker, park };
        });

        console.log('Tech park markers added successfully');

        // Add pulsing animation to markers
        const pulseInterval = setInterval(() => {
          markers.forEach(({ marker }) => {
            const element = marker.getElement();
            if (element) {
              const pin = element.querySelector('.marker-pin');
              if (pin) {
                pin.style.transform = 'scale(1.2)';
                setTimeout(() => {
                  if (pin) pin.style.transform = 'scale(1)';
                }, 200);
              }
            }
          });
        }, 3000);

        // Fit map to show all markers
        if (markers.length > 0) {
          const group = new L.featureGroup(markers.map(m => m.marker));
          map.fitBounds(group.getBounds().pad(0.1));
        }

        // Store cleanup function for when component unmounts
        mapRef.current = {
          centerOnLocation: (locationId) => {
            const marker = markers.find(m => m.id === locationId)?.marker;
            if (marker) {
              map.setView(marker.getLatLng(), 14);
              marker.openPopup();
            }
          },
          cleanup: () => {
            clearInterval(pulseInterval);
          }
        };

        console.log('Map initialization completed successfully');

      } catch (routeError) {
        console.error('Error adding route/polygon:', routeError);
      }

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapLoaded(false);
    }
  }, [activeLocationId, omrCoordinates]); // Added back the dependencies to fix the warning

  useEffect(() => {
    let leafletLoaded = false;
    
    const checkLeaflet = () => {
      if (window.L) {
        leafletLoaded = true;
        initMap();
      } else {
        console.log('Leaflet not yet available, checking again...');
        setTimeout(checkLeaflet, 100);
      }
    };

    // Load Leaflet if not already loaded
    if (!window.L) {
      console.log('Loading Leaflet...');
      
      // Load CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      cssLink.crossOrigin = '';
      document.head.appendChild(cssLink);

      // Load JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => {
        console.log('Leaflet loaded successfully');
        leafletLoaded = true;
        checkLeaflet();
      };
      script.onerror = () => {
        console.error('Failed to load Leaflet');
      };
      document.head.appendChild(script);
    } else {
      checkLeaflet();
    }

    // Cleanup function
    return () => {
      if (mapRef.current && mapRef.current.cleanup) {
        mapRef.current.cleanup();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Removed dependencies to avoid re-initializing

  useEffect(() => {
    if (mapLoaded && mapInstanceRef.current && activeLocationId !== null) {
      // Find the tech park by ID
      const park = TECH_PARKS.find(p => p.id === activeLocationId);
      if (park && window.L) {
        // Fly to the selected location with animation
        mapInstanceRef.current.flyTo(park.coordinates, 14, {
          animate: true,
          duration: 1.5
        });

        // Open popup for the location
        const L = window.L;
        const marker = L.marker(park.coordinates).addTo(mapInstanceRef.current);
        marker.bindPopup(`<b>${park.name}</b><br>${park.address}`).openPopup();

        // Add cleanup to remove the marker when selection changes
        return () => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.removeLayer(marker);
          }
        };
      }
    }
  }, [activeLocationId, mapLoaded]);

  // Function to handle clicking on a tech park in the list
  const handleParkClick = (parkId) => {
    setActiveLocationId(parkId);
    if (mapRef.current && mapRef.current.centerOnLocation) {
      mapRef.current.centerOnLocation(parkId);
    }
  };

  return (
    <section id="delivery-map" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-900 tracking-tight leading-tight px-2">
              Find Us Nearby
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-4 sm:mb-5 md:mb-6 px-3 sm:px-2 leading-relaxed">
              We deliver to all major tech parks and office areas. Check if your workplace is covered in our delivery zone.
            </p>
            {/* Features-style delivery info without box */}
            <div className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 italic font-medium leading-relaxed px-3 sm:px-4">
                🚚 Delivery is free within 8 kms from Thoraipakkam. Delivery charge may apply for locations beyond that.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-12 max-w-7xl mx-auto">
          {/* Map Column - Features-style card design */}
          <div
            className={`relative order-2 lg:order-1 hover:-translate-y-2 transition-transform duration-300 ${isListExpanded ? 'lg:col-span-2' : 'lg:col-span-3'}`}
          >
            {/* Features-style card with border and shadow */}
            <div className="bg-white border-2 border-black shadow-2xl overflow-hidden relative h-full">
              {/* Accent line like features section */}
              <div className="h-1.5 sm:h-2 w-full bg-slate-700"></div>

              {/* Map Title Bar - Redesigned to match features */}
              <div className="bg-white p-3 sm:p-4 md:p-5 lg:p-6 border-b-2 border-black">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center border-2 border-black bg-slate-100 flex-shrink-0">
                      <FontAwesomeIcon 
                        icon={faDirections} 
                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-slate-700"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-black text-black tracking-tight leading-tight">Delivery Coverage Map</h3>
                      <p className="text-xs sm:text-xs md:text-xs lg:text-xs text-gray-600 uppercase tracking-widest font-bold hidden sm:block">INTERACTIVE LOCATIONS</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className="px-2 py-1 sm:px-3 sm:py-1 text-xs font-bold uppercase tracking-wider border border-black text-black bg-slate-50 hidden sm:inline-block">
                      {TECH_PARKS.length} locations
                    </span>
                    <span className="px-1.5 py-0.5 text-xs font-bold uppercase tracking-wider border border-black text-black bg-slate-50 sm:hidden">
                      {TECH_PARKS.length}
                    </span>
                    <button 
                      onClick={() => setIsListExpanded(!isListExpanded)}
                      className="lg:hidden flex items-center justify-center p-1.5 sm:p-2 border border-black hover:bg-black hover:text-white transition-colors duration-200"
                      aria-label={isListExpanded ? "Hide location list" : "Show location list"}
                    >
                      <FontAwesomeIcon icon={isListExpanded ? faChevronDown : faChevronUp} className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Map Container - Sharp corners, no border radius */}
              <div className="aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/10] lg:aspect-[16/9] relative bg-gray-100">
                <div id="map" className="absolute inset-0" style={{ minHeight: '300px', width: '100%' }}></div>
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-500 p-3 sm:p-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 mb-3 sm:mb-4 mx-auto border-4 border-gray-300 border-t-slate-700 rounded-full animate-spin"></div>
                      <p className="text-xs sm:text-sm md:text-base font-medium">Loading map...</p>
                      <p className="text-xs sm:text-xs md:text-sm text-gray-400 mt-1 sm:mt-2 px-2">Please wait while we load your delivery areas</p>
                    </div>
                  </div>
                )}

                {/* Map custom controls - Redesigned */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 z-10">
                  <div className="bg-white border-2 border-black shadow-lg p-1 sm:p-1.5 md:p-2 flex flex-col space-y-1 sm:space-y-1.5 md:space-y-2">
                    <button 
                      className="p-1 sm:p-1.5 md:p-2 hover:bg-slate-100 transition-colors focus:outline-none text-slate-700 border border-transparent hover:border-slate-300" 
                      title="Center map"
                      onClick={() => mapInstanceRef.current?.setView([12.9400, 80.2300], 12)}
                    >
                      <FontAwesomeIcon icon={faMapPin} className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    </button>
                    <button 
                      className="p-1 sm:p-1.5 md:p-2 hover:bg-slate-100 transition-colors focus:outline-none text-slate-700 border border-transparent hover:border-slate-300" 
                      title="Show all locations"
                      onClick={() => setActiveLocationId(null)}
                    >
                      <FontAwesomeIcon icon={faBuildingUser} className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    </button>
                    <button 
                      className="p-1 sm:p-1.5 md:p-2 hover:bg-slate-100 transition-colors focus:outline-none hidden lg:block text-slate-700 border border-transparent hover:border-slate-300" 
                      title={isListExpanded ? "Hide location list" : "Show location list"}
                      onClick={() => setIsListExpanded(!isListExpanded)}
                    >
                      <FontAwesomeIcon icon={isListExpanded ? faChevronRight : faChevronLeft} className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>

                {/* Floating location button on map */}
                {!isListExpanded && (
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 z-10 lg:block hidden">
                    <button
                      onClick={() => setIsListExpanded(true)}
                      className="bg-black text-white border-2 border-black shadow-lg p-2 sm:p-2.5 md:p-3 flex items-center gap-1.5 sm:gap-2 hover:bg-white hover:text-black transition-colors duration-200 font-bold uppercase tracking-wider text-xs sm:text-sm"
                    >
                      <FontAwesomeIcon icon={faCompass} className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                      <span className="hidden md:inline">View Locations</span>
                      <span className="md:hidden">Locations</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Map info bar - Redesigned */}
              <div className="p-3 sm:p-4 md:p-5 lg:p-6 bg-white border-t-2 border-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 md:gap-4">
                <div className="flex items-center text-xs sm:text-sm md:text-base text-gray-700 font-medium">
                  <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1.5 sm:mr-2 text-slate-700 flex-shrink-0" />
                  <span>OMR Tech Corridor, Chennai</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm md:text-base font-bold text-black">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                  <span className="hidden sm:inline">Free delivery to all marked locations</span>
                  <span className="sm:hidden">Free delivery available</span>
                </div>
              </div>

              {/* Decorative Element like features section */}
              <div className="absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-slate-700 opacity-10 -z-10"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-slate-600 opacity-5 -z-10"></div>
            </div>
          </div>

          {/* Location List Column */}
          {isListExpanded && (
            <div className="order-1 lg:order-2 transition-opacity duration-300">
              <div className="bg-white border-2 border-black shadow-2xl h-full overflow-hidden">
                {/* Accent line */}
                <div className="h-1.5 sm:h-2 w-full bg-slate-700"></div>

                <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 border-black bg-slate-100 flex-shrink-0">
                        <FontAwesomeIcon icon={faBuildingUser} className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-slate-700" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-black tracking-tight leading-tight">Delivery Locations</h3>
                        <p className="text-xs text-gray-600 uppercase tracking-widest font-bold hidden sm:block">TECH PARKS & OFFICES</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsListExpanded(false)}
                      className="p-1.5 sm:p-2 border border-black hover:bg-black hover:text-white transition-colors duration-200 flex-shrink-0"
                      aria-label="Minimize location list"
                    >
                      <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  {/* Search box - Redesigned */}
                  <div className="relative mb-4 sm:mb-5 md:mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 sm:pl-3 pointer-events-none">
                      <FontAwesomeIcon icon={faSearch} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      className="border-2 border-black text-gray-900 text-xs sm:text-sm block w-full pl-8 sm:pl-10 p-2 sm:p-2.5 md:p-3 focus:ring-0 focus:border-slate-700 font-medium" 
                      placeholder="Search locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Location list with scroll */}
                  <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3">
                    {filteredLocations.length > 0 ? filteredLocations.map((park) => (
                      <button
                        key={park.id}
                        onClick={() => handleParkClick(park.id)}
                        className={`w-full p-3 sm:p-4 text-left border-2 transition-all duration-200 font-medium hover:border-slate-700 hover:bg-slate-50 ${
                          activeLocationId === park.id 
                            ? 'border-slate-700 bg-slate-100 shadow-md' 
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black text-sm sm:text-base text-black mb-1 sm:mb-2 leading-tight">{park.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">{park.address}</p>
                          </div>
                          <div className="flex-shrink-0 ml-2 sm:ml-3">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-slate-700 rounded-full"></div>
                          </div>
                        </div>
                      </button>
                    )) : (
                      <div className="text-center py-6 sm:py-8 md:py-10 text-gray-500">
                        <FontAwesomeIcon icon={faSearch} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3 opacity-20" />
                        <p className="text-sm sm:text-base mb-2 font-medium">No locations found matching your search.</p>
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="text-black text-xs sm:text-sm hover:underline font-bold"
                        >
                          Clear search
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Delivery info - Redesigned */}
                  <div className="mt-4 sm:mt-5 md:mt-6 bg-slate-50 p-3 sm:p-3.5 md:p-4 border-2 border-slate-300">
                    <h4 className="font-black mb-1.5 sm:mb-2 flex items-center text-slate-800 text-xs sm:text-sm md:text-base">
                      <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-slate-700 flex-shrink-0" />
                      Delivery Information
                    </h4>
                    <p className="text-xs sm:text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                      We currently deliver to all major tech parks in Chennai. Orders placed before 10 AM will be delivered by lunch time.
                    </p>
                    <p className="text-xs text-gray-600 mt-1.5 sm:mt-2 leading-relaxed">
                      Don't see your location? Contact us to check if we can deliver to your area.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom decorative element like features section */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20 lg:mt-24">
          <div className="inline-flex items-center space-x-4 text-gray-500">
            <div className="w-12 md:w-20 h-px bg-gray-300"></div>
            <span className="text-xs md:text-sm uppercase tracking-widest font-bold">Delivery Coverage</span>
            <div className="w-12 md:w-20 h-px bg-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryMap; 