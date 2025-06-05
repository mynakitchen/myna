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
    if (!window.L || !document.getElementById('map')) return;
    
    // Check if map is already initialized and clean it up first
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    
    const L = window.L;
    
    // Center on a point in the middle of OMR
    const chennaiCenter = [12.9400, 80.2300]; // Adjusted to better center the OMR corridor
    
    // Create the map with an elegant, minimal style
    const map = L.map('map', {
      zoomControl: false, // We'll add our own zoom control in a better position
      scrollWheelZoom: false, // Disable scroll wheel zoom for better UX on embedded maps
      attributionControl: false // Hide attribution initially for cleaner look
    }).setView(chennaiCenter, 12);
    
    // Store map instance in ref for later access
    mapInstanceRef.current = map;
    
    // Add custom attribution control in bottom-right
    L.control.attribution({
      position: 'bottomright',
      prefix: '© Myna Kitchen'
    }).addTo(map);
    
    // Add zoom control in bottom-right
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);
    
    // Add an elegant tile layer with minimal styling
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);
    
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
    TECH_PARKS.forEach(park => {
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
    });
    
    // Add a stylish polyline to represent OMR road
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
      
      routeLine.setStyle({ opacity: routeOpacity });
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
  }, [activeLocationId, omrCoordinates]);

  useEffect(() => {
    const loadLeaflet = async () => {
      // Skip if Leaflet is already loaded
      if (window.L) {
        handleLeafletInit();
        return;
      }
      
      try {
        // Load Leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
        document.head.appendChild(link);
        
        // Load Leaflet JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js';
        script.async = true;
        document.body.appendChild(script);
        
        script.onload = () => {
          handleLeafletInit();
        };
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    };
    
    const handleLeafletInit = () => {
      if (typeof window !== 'undefined') {
        // Check if the map element exists
        if (!document.getElementById('map')) {
          // If map element does not exist yet, wait for it to be created
          const observer = new MutationObserver((mutations, obs) => {
            if (document.getElementById('map')) {
              obs.disconnect();
              initMap();
              setMapLoaded(true);
            }
          });
          
          observer.observe(document.body, {
            childList: true,
            subtree: true
          });
          
          // Fallback timeout to check again
          setTimeout(() => {
            if (document.getElementById('map')) {
              observer.disconnect();
              initMap();
              setMapLoaded(true);
            }
          }, 1000);
        } else {
          // Check if the map element exists before initializing
          if (document.getElementById('map')) {
            initMap();
            setMapLoaded(true);
          }
        }
      }
    };
    
    loadLeaflet();
    
    return () => {
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
    <section id="delivery-map" className="py-12 md:py-20 lg:py-28 bg-white overflow-hidden relative section-fade">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900 tracking-tight leading-tight">
              Find Us Nearby
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto mb-3 md:mb-4 px-2 leading-relaxed">
              We deliver to all major tech parks and office areas. Check if your workplace is covered in our delivery zone.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 max-w-2xl mx-auto">
              <p className="text-sm md:text-base text-blue-700 flex items-center justify-center gap-2">
                <span className="text-lg">🚚</span>
                <span>Delivery is free within 8 kms from Thoraipakkam. Delivery charge may apply for locations beyond that.</span>
              </p>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Map Column - Expanded when list is minimized */}
          <motion.div
            className={`relative order-2 lg:order-1 ${isListExpanded ? 'lg:col-span-2' : 'lg:col-span-3'}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden h-full border border-gray-100">
              {/* Map Title Bar */}
              <div className="bg-slate-800 text-white p-3 md:p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faDirections} className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  <h3 className="font-semibold text-sm md:text-base">Delivery Coverage Map</h3>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 text-xs font-medium">
                    {TECH_PARKS.length} locations served
                  </div>
                  <button 
                    onClick={() => setIsListExpanded(!isListExpanded)}
                    className="lg:hidden flex items-center justify-center p-1.5 md:p-2 bg-white/20 backdrop-blur-sm rounded-full"
                    aria-label={isListExpanded ? "Hide location list" : "Show location list"}
                  >
                    <FontAwesomeIcon icon={isListExpanded ? faChevronDown : faChevronUp} className="w-3 h-3" />
                  </button>
                </div>
              </div>
              
              {/* Map Container */}
              <div className="aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/9] relative">
                <div id="map" className="absolute inset-0"></div>
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-500 p-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 mx-auto border-4 border-gray-300 border-t-slate-600 rounded-full animate-spin"></div>
                      <p className="text-sm md:text-base">Loading map...</p>
                    </div>
                  </div>
                )}
                
                {/* Map custom controls */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
                  <div className="bg-white rounded-lg shadow-md p-1.5 md:p-2 flex flex-col space-y-1 md:space-y-2">
                    <button 
                      className="p-1.5 md:p-2 hover:bg-slate-50 rounded-md transition-colors focus:outline-none text-slate-700" 
                      title="Center map"
                      onClick={() => mapInstanceRef.current?.setView([12.9400, 80.2300], 12)}
                    >
                      <FontAwesomeIcon icon={faMapPin} className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button 
                      className="p-1.5 md:p-2 hover:bg-slate-50 rounded-md transition-colors focus:outline-none text-slate-700" 
                      title="Show all locations"
                      onClick={() => setActiveLocationId(null)}
                    >
                      <FontAwesomeIcon icon={faBuildingUser} className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button 
                      className="p-1.5 md:p-2 hover:bg-slate-50 rounded-md transition-colors focus:outline-none hidden lg:block text-slate-700" 
                      title={isListExpanded ? "Hide location list" : "Show location list"}
                      onClick={() => setIsListExpanded(!isListExpanded)}
                    >
                      <FontAwesomeIcon icon={isListExpanded ? faChevronRight : faChevronLeft} className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Floating location button on map (visible when list is collapsed) */}
                {!isListExpanded && (
                  <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-10 lg:block hidden">
                    <button
                      onClick={() => setIsListExpanded(true)}
                      className="bg-slate-800 shadow-lg rounded-full p-2 md:p-3 flex items-center gap-2 hover:bg-slate-900 transition-colors text-white text-sm"
                    >
                      <FontAwesomeIcon icon={faCompass} className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="font-medium hidden md:inline">View Locations</span>
                    </button>
                  </div>
                )}
              </div>
              
              {/* Map info bar */}
              <div className="p-3 md:p-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center text-xs md:text-sm text-gray-500">
                  <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 md:w-4 md:h-4 mr-1 text-slate-700 flex-shrink-0" />
                  <span>OMR Tech Corridor, Chennai</span>
                </div>
                <div className="flex items-center text-xs md:text-sm font-medium text-slate-700">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
                  <span>Free delivery to all marked locations</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Location List Column - Conditionally rendered */}
          <AnimatePresence>
            {isListExpanded && (
              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg h-full border border-gray-100 flex flex-col">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold">Delivery Locations</h3>
                    <button
                      onClick={() => setIsListExpanded(false)}
                      className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-700"
                      aria-label="Minimize location list"
                    >
                      <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Search box */}
                  <div className="relative mb-4 md:mb-6">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FontAwesomeIcon icon={faSearch} className="w-4 h-4 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full pl-10 p-2.5 md:p-3" 
                      placeholder="Search by name or address"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {/* Location list with scroll */}
                  <div className="flex-1 overflow-y-auto pr-2 space-y-2 md:space-y-3">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((park) => (
                        <motion.div
                          key={park.id}
                          className={`p-3 md:p-4 rounded-lg md:rounded-xl cursor-pointer transition-all ${
                            activeLocationId === park.id
                              ? 'bg-slate-50 border-slate-600'
                              : 'bg-gray-50 hover:bg-gray-100 border-transparent'
                          } border`}
                          onClick={() => handleParkClick(park.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                                activeLocationId === park.id
                                  ? 'bg-slate-800 text-white'
                                  : 'bg-gray-200 text-gray-700'
                              }`}>
                                <FontAwesomeIcon icon={faBuildingUser} className="w-3 h-3 md:w-4 md:h-4" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 text-sm md:text-base leading-tight">{park.name}</h4>
                              <p className="text-xs md:text-sm text-gray-500 mt-1 leading-relaxed">{park.address}</p>
                              <div className="flex items-center mt-2 text-xs text-slate-700">
                                <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3 mr-1 flex-shrink-0" />
                                <span>Delivery Available</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8 md:py-10 text-gray-500">
                        <FontAwesomeIcon icon={faSearch} className="w-10 h-10 md:w-12 md:h-12 mb-3 opacity-20" />
                        <p className="text-sm md:text-base mb-2">No locations found matching your search.</p>
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="text-slate-700 text-sm hover:underline"
                        >
                          Clear search
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Delivery info */}
                  <div className="mt-4 md:mt-6 bg-slate-50 p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-100">
                    <h4 className="font-medium mb-2 flex items-center text-slate-800 text-sm md:text-base">
                      <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 mr-2 text-slate-700 flex-shrink-0" />
                      Delivery Information
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                      We currently deliver to all major tech parks in Chennai. Orders placed before 10 AM will be delivered by lunch time.
                    </p>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      Don't see your location? Contact us to check if we can deliver to your area.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DeliveryMap; 