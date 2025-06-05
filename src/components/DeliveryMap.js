import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLocationDot, 
  faSearch, 
  faBuildingUser, 
  faCircleCheck, 
  faMapPin,
  faDirections,
  faChevronUp,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faCompass
} from '@fortawesome/free-solid-svg-icons';
import "./DeliveryMap.css";

// Tech parks data
const TECH_PARKS = [
  {
    id: 1,
    name: "Tidel Park",
    address: "CSIR Rd, Taramani, Chennai, Tamil Nadu 600113",
    coordinates: [12.9906, 80.2487]
  },
  {
    id: 2,
    name: "RMZ Millenia",
    address: "Phase 2, Campus 4B, No.143, MGR Rd, Perungudi, Chennai, Tamil Nadu 600096",
    coordinates: [12.9714, 80.2420]
  },
  {
    id: 3,
    name: "Ramanujan IT City",
    address: "Rajiv Gandhi Salai, Taramani, Chennai, Tamil Nadu 600113",
    coordinates: [12.9862, 80.2418]
  },
  {
    id: 4,
    name: "TRIL Infopark",
    address: "Ramanujan IT City, Rajiv Gandhi Salai, Taramani, Chennai, Tamil Nadu 600113",
    coordinates: [12.9876, 80.2431]
  },
  {
    id: 5,
    name: "Ascendas IT Park",
    address: "Taramani Rd, Taramani, Chennai, Tamil Nadu 600113",
    coordinates: [12.9845, 80.2402]
  },
  {
    id: 6,
    name: "Siruseri IT Park",
    address: "Siruseri, Chennai, Tamil Nadu 603103",
    coordinates: [12.8254, 80.2181]
  },
  {
    id: 7,
    name: "Prestige Cyber Towers",
    address: "Old Mahabalipuram Road, Kandanchavadi, Chennai, Tamil Nadu 600096",
    coordinates: [12.9599, 80.2456]
  },
  {
    id: 8,
    name: "Ericsson India Global Services",
    address: "MGR Road, Sholinganallur, Chennai, Tamil Nadu 600119",
    coordinates: [12.9004, 80.2276]
  },
  {
    id: 9,
    name: "Elcot SEZ",
    address: "Sholinganallur, Chennai, Tamil Nadu 600119",
    coordinates: [12.8884, 80.2270]
  },
  {
    id: 10,
    name: "DLF IT Park",
    address: "Mount Poonamallee Road, Manapakkam, Chennai, Tamil Nadu 600089",
    coordinates: [13.0199, 80.1821]
  },
  {
    id: 11,
    name: "One Indiabulls Park",
    address: "Egattur Village, Navallur, Chennai, Tamil Nadu 603103",
    coordinates: [12.8399, 80.2265]
  },
  {
    id: 12,
    name: "Thoraipakkam IT Park",
    address: "Thoraipakkam, Chennai, Tamil Nadu 600097",
    coordinates: [12.9384, 80.2339]
  },
  {
    id: 13,
    name: "Porur",
    address: "Porur, Chennai, Tamil Nadu 600116",
    coordinates: [13.0356, 80.1559]
  },
  {
    id: 14,
    name: "Velachery",
    address: "Velachery, Chennai, Tamil Nadu 600042",
    coordinates: [12.9755, 80.2200]
  },
  {
    id: 15,
    name: "Pallikaranai",
    address: "Pallikaranai, Chennai, Tamil Nadu 600100",
    coordinates: [12.9471, 80.2044]
  },
  {
    id: 16,
    name: "Adyar",
    address: "Adyar, Chennai, Tamil Nadu 600020",
    coordinates: [13.0067, 80.2567]
  }
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

  // Define initMap with useCallback to memoize it
  const initMap = useCallback(() => {
    console.log('initMap called');
    
    if (!window.L) {
      console.error('Leaflet not loaded');
      return;
    }
    
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Map element not found');
      return;
    }
    
    console.log('Map element found, initializing...');
    
    try {
      // Check if map is already initialized and clean it up first
      if (mapInstanceRef.current) {
        console.log('Cleaning up existing map instance');
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      
      const L = window.L;
      
      // Center on a point in the middle of OMR
      const chennaiCenter = [12.9400, 80.2300]; // Adjusted to better center the OMR corridor
      
      console.log('Creating map instance...');
      
      // Create the map with an elegant, minimal style
      const map = L.map('map', {
        zoomControl: false, // We'll add our own zoom control in a better position
        scrollWheelZoom: false, // Disable scroll wheel zoom for better UX on embedded maps
        attributionControl: false // Hide attribution initially for cleaner look
      }).setView(chennaiCenter, 12);
      
      // Store map instance in ref for later access
      mapInstanceRef.current = map;
      
      console.log('Map instance created, adding controls...');
      
      // Add custom attribution control in bottom-right
      L.control.attribution({
        position: 'bottomright',
        prefix: '© Myna Kitchen'
      }).addTo(map);
      
      // Add zoom control in bottom-right
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map);
      
      console.log('Adding tile layer...');
      
      // Add an elegant tile layer with minimal styling
      const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      });
      
      tileLayer.on('loading', () => {
        console.log('Tiles loading...');
      });
      
      tileLayer.on('load', () => {
        console.log('Tiles loaded successfully');
      });
      
      tileLayer.on('tileerror', (error) => {
        console.error('Tile loading error:', error);
        // Fallback to OpenStreetMap tiles
        const fallbackTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        });
        fallbackTileLayer.addTo(map);
      });
      
      tileLayer.addTo(map);
      
      console.log('Adding markers...');
      
      // Create a custom icon for markers that fits our design - using slate color theme
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="background-color: #475569; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px rgba(71, 85, 105, 0.4);"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });
      
      // Create a larger icon for hover/active state
      const activeIcon = L.divIcon({
        className: 'custom-map-marker-active',
        html: `<div style="background-color: #475569; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 4px rgba(71, 85, 105, 0.5);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      
      // Store markers for later reference
      const markers = [];
      
      // Add markers for each tech park
      TECH_PARKS.forEach((park, index) => {
        try {
          const marker = L.marker(park.coordinates, { 
            icon: customIcon,
            title: park.name
          })
          .addTo(map)
          .bindPopup(`
            <div style="text-align: center; padding: 4px;">
              <b style="color: #475569; font-size: 16px;">${park.name}</b>
              <p style="margin: 4px 0; color: #555; font-size: 12px;">${park.address}</p>
              <div style="background-color: #475569; color: white; padding: 4px 8px; margin-top: 8px; border-radius: 4px; font-size: 12px;">
                Delivery Available
              </div>
            </div>
          `, {
            closeButton: false,
            className: 'custom-popup'
          });
          
          // Store marker with park id for later reference
          markers.push({ id: park.id, marker });
          
          // Add hover events for markers
          marker.on('mouseover', function() {
            this.setIcon(activeIcon);
            this.openPopup();
          });
          
          marker.on('mouseout', function() {
            if (activeLocationId !== park.id) {
              this.setIcon(customIcon);
            }
            this.closePopup();
          });
          
          marker.on('click', function() {
            setActiveLocationId(park.id);
          });
        } catch (markerError) {
          console.error(`Error creating marker for ${park.name}:`, markerError);
        }
      });
      
      console.log(`Added ${markers.length} markers`);
      
      // Add a stylish polyline to represent OMR road
      try {
        let routeLine = L.polyline(omrCoordinates, {
          color: '#475569',
          weight: 4,
          opacity: 0.7,
          lineJoin: 'round',
          dashArray: null
        }).addTo(map);
        
        // Add a subtle animation effect to the route
        let routeOpacity = 0.7;
        let opacityDirection = -1;
        
        // Create a pulsing effect for the route
        const pulseInterval = setInterval(() => {
          routeOpacity += opacityDirection * 0.01;
          if (routeOpacity <= 0.4) {
            opacityDirection = 1;
          } else if (routeOpacity >= 0.7) {
            opacityDirection = -1;
          }
          
          if (routeLine && routeLine.setStyle) {
            routeLine.setStyle({ opacity: routeOpacity });
          }
        }, 50);
        
        // Add a semi-transparent polygon covering the delivery area
        const deliveryAreaCoords = [
          [13.0500, 80.1400], // Northwest boundary (Porur area)
          [13.0500, 80.2800], // Northeast boundary (Adyar area)
          [12.9906, 80.2687], // Tidel Park extended
          [12.9714, 80.2620], // RMZ Millenia extended 
          [12.9400, 80.2500], // Central OMR area
          [12.9000, 80.2400], // Middle OMR extended
          [12.8254, 80.2400], // Siruseri extended east
          [12.8000, 80.2300], // Southern boundary east
          [12.8000, 80.2000], // Southern boundary
          [12.8200, 80.1800], // Southwest boundary
          [12.9000, 80.1600], // Western boundary south
          [12.9500, 80.1500], // Western boundary
          [13.0200, 80.1500], // Western boundary north
          [13.0500, 80.1400]  // Close the polygon
        ];
        
        L.polygon(deliveryAreaCoords, {
          color: '#475569',
          weight: 1,
          fillColor: '#475569',
          fillOpacity: 0.1
        }).addTo(map);
        
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
    console.log('DeliveryMap useEffect called');
    console.log('window.L exists:', !!window.L);
    
    // Since Leaflet is now loaded in HTML head, it should be available immediately
    if (window.L) {
      console.log('Leaflet is available, initializing map');
      
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const mapElement = document.getElementById('map');
        console.log('Map element exists:', !!mapElement);
        
        if (mapElement) {
          console.log('Calling initMap...');
          initMap();
          setMapLoaded(true);
        } else {
          console.error('Map element not found');
          // Try again after a longer delay
          setTimeout(() => {
            const retryMapElement = document.getElementById('map');
            if (retryMapElement) {
              console.log('Map element found on retry, calling initMap');
              initMap();
              setMapLoaded(true);
            } else {
              console.error('Map element still not found after retry');
            }
          }, 1000);
        }
      }, 100);
    } else {
      console.error('Leaflet is not available');
      // If Leaflet is still not loaded, wait a bit more
      setTimeout(() => {
        if (window.L) {
          console.log('Leaflet loaded after delay, initializing map');
          initMap();
          setMapLoaded(true);
        } else {
          console.error('Leaflet failed to load from HTML head');
          setMapLoaded(false);
        }
      }, 1000);
    }
    
    return () => {
      console.log('DeliveryMap cleanup called');
      // Call the cleanup function to clear intervals
      if (mapRef.current && mapRef.current.cleanup) {
        mapRef.current.cleanup();
      }
      
      // Clean up if needed
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [initMap]);
  
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
    <section id="delivery-map" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white overflow-hidden relative section-fade">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-900 tracking-tight leading-tight px-2">
              Find Us Nearby
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-4 sm:mb-5 md:mb-6 px-3 sm:px-2 leading-relaxed">
              We deliver to all major tech parks and office areas. Check if your workplace is covered in our delivery zone.
            </p>
            {/* Features-style delivery info without box */}
            <div className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto">
              <motion.p 
                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 italic font-medium leading-relaxed px-3 sm:px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                🚚 Delivery is free within 8 kms from Thoraipakkam. Delivery charge may apply for locations beyond that.
              </motion.p>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-12 max-w-7xl mx-auto">
          {/* Map Column - Features-style card design */}
          <motion.div
            className={`relative order-2 lg:order-1 ${isListExpanded ? 'lg:col-span-2' : 'lg:col-span-3'}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
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
              <motion.div 
                className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-slate-700 opacity-30"
                animate={{ 
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              ></motion.div>
            </div>
            
            {/* Floating accent shadow like features section */}
            <motion.div 
              className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 md:-bottom-4 md:-right-4 w-full h-full border-2 border-gray-400 bg-slate-100 -z-10"
              animate={{ 
                x: [0, 2, 0, -2, 0],
                y: [0, -2, 0, 2, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
          </motion.div>
          
          {/* Location List Column - Redesigned to match features */}
          <AnimatePresence>
            {isListExpanded && (
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
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
                    <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-2 sm:space-y-2.5 md:space-y-3">
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map((park) => (
                          <motion.div
                            key={park.id}
                            className={`p-3 sm:p-3.5 md:p-4 cursor-pointer transition-all border-2 ${
                              activeLocationId === park.id
                                ? 'bg-slate-50 border-black'
                                : 'bg-gray-50 hover:bg-gray-100 border-gray-300 hover:border-slate-500'
                            }`}
                            onClick={() => handleParkClick(park.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                              <div className="mt-0.5 flex-shrink-0">
                                <div className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center border-2 ${
                                  activeLocationId === park.id
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-gray-700 border-gray-400'
                                }`}>
                                  <FontAwesomeIcon icon={faBuildingUser} className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base leading-tight">{park.name}</h4>
                                <p className="text-xs sm:text-xs md:text-sm text-gray-600 mt-0.5 sm:mt-1 leading-relaxed break-words">{park.address}</p>
                                <div className="flex items-center mt-1.5 sm:mt-2">
                                  <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-bold uppercase tracking-wider border border-black text-black bg-white">
                                    Available
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Bottom decorative element like features section */}
        <motion.div 
          className="text-center mt-8 sm:mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="inline-flex items-center space-x-3 sm:space-x-4 text-gray-600">
            <div className="w-8 sm:w-12 md:w-16 h-px bg-gray-400"></div>
            <span className="text-xs sm:text-sm uppercase tracking-widest font-bold">Myna Kitchen</span>
            <div className="w-8 sm:w-12 md:w-16 h-px bg-gray-400"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeliveryMap; 