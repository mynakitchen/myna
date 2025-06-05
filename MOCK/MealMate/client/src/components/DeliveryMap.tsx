import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { TECH_PARKS } from "@/lib/constants";
import { MapPin, Navigation, Building2, CheckCircle } from "lucide-react";

// Add TypeScript definitions for Leaflet
declare global {
  interface Window {
    L: any;
  }
}

export default function DeliveryMap() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeLocationId, setActiveLocationId] = useState<number | null>(null);
  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);

  // Create an updated list of OMR coordinates including all tech parks for a more accurate route
  const omrCoordinates = TECH_PARKS.map(park => park.coordinates).sort((a, b) => {
    // Sort from north to south roughly (higher to lower latitude values)
    return b[0] - a[0];
  });

  useEffect(() => {
    const loadLeaflet = async () => {
      if (typeof window !== 'undefined') {
        // Add the CSS for Leaflet
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const linkElem = document.createElement('link');
          linkElem.rel = 'stylesheet';
          linkElem.href = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
          linkElem.integrity = 'sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=';
          linkElem.crossOrigin = '';
          document.head.appendChild(linkElem);
        }
        
        // Add the JS for Leaflet if not already loaded
        if (!window.L) {
          const scriptElem = document.createElement('script');
          scriptElem.src = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js';
          scriptElem.integrity = 'sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=';
          scriptElem.crossOrigin = '';
          document.body.appendChild(scriptElem);
          
          scriptElem.onload = () => {
            initMap();
            setMapLoaded(true);
          };
        } else {
          initMap();
          setMapLoaded(true);
        }
      }
    };
    
    loadLeaflet();
    
    return () => {
      // Clean up if needed
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);
  
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
  
  const initMap = () => {
    if (!window.L) return;
    
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
    
    // Create a custom icon for markers that fits our design
    const customIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="background-color: #047857; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 2px rgba(4, 120, 87, 0.4);"></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });
    
    // Create a larger icon for hover/active state
    const activeIcon = L.divIcon({
      className: 'custom-map-marker-active',
      html: `<div style="background-color: #047857; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 4px rgba(4, 120, 87, 0.5);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    
    // Store markers for later reference
    const markers: any[] = [];
    
    // Add markers for each tech park
    TECH_PARKS.forEach(park => {
      const marker = L.marker(park.coordinates, { 
        icon: customIcon,
        title: park.name
      })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center; padding: 4px;">
          <b style="color: #047857; font-size: 16px;">${park.name}</b>
          <p style="margin: 4px 0; color: #555; font-size: 12px;">${park.address}</p>
          <div style="background-color: #047857; color: white; padding: 4px 8px; margin-top: 8px; border-radius: 4px; font-size: 12px;">
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
      marker.on('mouseover', function(this: any) {
        this.setIcon(activeIcon);
        this.openPopup();
      });
      
      marker.on('mouseout', function(this: any) {
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
      color: '#047857',
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
      [12.9906, 80.2487], // Tidel Park
      [12.9714, 80.2420], // RMZ Millenia
      [12.9000, 80.2200], // Middle of OMR
      [12.8254, 80.2181], // Siruseri
      [12.8254, 80.2381],
      [12.9000, 80.2400],
      [12.9714, 80.2620],
      [12.9906, 80.2687]
    ];
    
    L.polygon(deliveryAreaCoords, {
      color: '#047857',
      weight: 1,
      fillColor: '#047857',
      fillOpacity: 0.1
    }).addTo(map);
    
    // Allow external elements to center the map on a specific marker
    mapRef.current = {
      centerOnLocation: (locationId: number) => {
        const marker = markers.find(m => m.id === locationId)?.marker;
        if (marker) {
          map.setView(marker.getLatLng(), 14);
          marker.openPopup();
        }
      }
    };
  };

  // Function to handle clicking on a tech park in the list
  const handleParkClick = (parkId: number) => {
    setActiveLocationId(parkId);
    if (mapRef.current && mapRef.current.centerOnLocation) {
      mapRef.current.centerOnLocation(parkId);
    }
  };

  return (
    <section id="delivery-areas" className="py-20 md:py-32 bg-white overflow-hidden">
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/3 opacity-30 blur-3xl -z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      ></motion.div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            Delivery Areas
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We deliver fresh, delicious meals to tech parks throughout the OMR corridor in Chennai
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Map Column */}
          <motion.div
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Map Title Bar */}
              <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Navigation className="w-5 h-5 mr-2" />
                  <h3 className="font-semibold">Myna Kitchen Delivery Map</h3>
                </div>
                <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-medium">
                  12 locations served
                </div>
              </div>
              
              {/* Map Container with custom styling */}
              <div className="aspect-[4/3] md:aspect-[16/9] relative">
                <div id="map" className="absolute inset-0"></div>
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-500">
                      <svg className="w-12 h-12 mb-4 mx-auto animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p>Initializing delivery map...</p>
                    </div>
                  </div>
                )}
                
                {/* Custom map controls overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-white rounded-lg shadow-md p-2 flex flex-col space-y-2">
                    <button className="p-2 hover:bg-gray-100 rounded-md transition-colors focus:outline-none" title="Center on OMR">
                      <MapPin className="w-5 h-5 text-primary" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-md transition-colors focus:outline-none" title="Show all tech parks">
                      <Building2 className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Map info bar */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1 text-primary" />
                  <span>OMR Tech Corridor, Chennai</span>
                </div>
                <div className="flex items-center text-sm font-medium text-primary">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>Free delivery to all marked locations</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Tech Parks List Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
              <div className="bg-gradient-to-r from-primary/90 to-primary text-white p-4">
                <h3 className="font-semibold flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Available Locations
                </h3>
                <p className="text-white/80 text-sm mt-1">Click on a location to view on map</p>
              </div>
              
              <div className="p-4 max-h-[500px] overflow-y-auto">
                <div className="space-y-3">
                  {TECH_PARKS.map((park) => (
                    <motion.button
                      key={park.id}
                      className={`w-full text-left border rounded-lg p-3 transition-all ${
                        activeLocationId === park.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50'
                      }`}
                      onClick={() => handleParkClick(park.id)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h4 className={`font-medium mb-1 ${
                        activeLocationId === park.id ? 'text-primary' : 'text-gray-900'
                      }`}>
                        {park.name}
                      </h4>
                      <p className="text-gray-500 text-sm line-clamp-2">{park.address}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Don't see your location? We're expanding our delivery areas!
                </p>
                <button className="mt-2 text-sm font-medium text-primary flex items-center">
                  Request delivery to your area
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Delivery Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Delivery Schedule</h3>
            <p className="text-gray-600 mb-4">Breakfast (7:30-8:30 AM), Lunch (12:00-1:00 PM), Dinner (7:00-8:00 PM)</p>
            <div className="text-primary font-medium text-sm">Exact timing customizable</div>
          </motion.div>
          
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Delivery Fees</h3>
            <p className="text-gray-600 mb-4">Free delivery to all tech parks and nearby residential areas with no minimum order.</p>
            <div className="text-primary font-medium text-sm">No hidden charges</div>
          </motion.div>
          
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Special Requests</h3>
            <p className="text-gray-600 mb-4">Need delivery to a specific location? Contact our team for custom arrangements.</p>
            <div className="text-primary font-medium text-sm">Contact support</div>
          </motion.div>
        </div>
      </div>
      
      {/* Add some styling for Leaflet markers and popups */}
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: 180px !important;
        }
        
        .custom-popup .leaflet-popup-tip {
          background-color: #047857;
        }
      `}</style>
    </section>
  );
}
