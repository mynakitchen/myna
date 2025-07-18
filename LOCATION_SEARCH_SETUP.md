# Location Search Setup Guide

## Overview
The new location search feature uses Google Places API to provide autocomplete functionality for address selection. Users can now search for their locality and the system will automatically extract the pincode and check delivery availability.

## Features
- 🔍 **Smart Search**: Type your locality name and get instant suggestions
- 🎯 **Auto Pincode Detection**: Automatically extracts pincode from selected location
- ✅ **Delivery Validation**: Checks if the pincode is serviceable
- 📱 **Mobile Optimized**: Works seamlessly on all devices
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations

## Setup Instructions

### 1. Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Places API**
   - **Maps JavaScript API**
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

### 2. Configure Environment Variables
Create a `.env` file in your project root and add:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 3. Usage
The LocationSearch component is now integrated into the meal plan configuration flow. Users will see:

1. **Home Location Search**: Search for home locality
2. **Office Location Search** (Optional): Search for office locality
3. **Automatic Pincode Detection**: Pincode is extracted from selected location
4. **Delivery Zone Validation**: Shows delivery charges and zone information

## Component Structure

### LocationSearch Component
- **File**: `src/components/LocationSearch.js`
- **CSS**: `src/components/LocationSearch.css`
- **Features**:
  - Google Places Autocomplete
  - Pincode extraction
  - Loading states
  - Error handling
  - Mobile responsive design

### Integration
- **File**: `src/components/MealPlanConfig.js`
- **Step**: Location selection (Step 6)
- **Replaces**: Multiple address input fields
- **Improves**: User experience with single search bar

## API Response Format
When a location is selected, the component returns:

```javascript
{
  placeId: "ChIJ...",
  description: "Taramani, Chennai, Tamil Nadu, India",
  formattedAddress: "Taramani, Chennai, Tamil Nadu 600113, India",
  coordinates: {
    lat: 12.9950,
    lng: 80.2450
  },
  addressComponents: [...],
  pincode: "600113"
}
```

## Styling
The component uses CSS custom properties that match the existing design system:
- Dark theme compatible
- Responsive design
- Smooth animations
- Accessible focus states

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Security Notes
- API key is restricted to your domain
- No sensitive data is stored
- All requests are made over HTTPS
- Rate limiting is handled by Google

## Troubleshooting

### Common Issues
1. **API Key Not Working**: Ensure the key is correct and APIs are enabled
2. **No Suggestions**: Check if Places API is enabled
3. **CORS Errors**: Verify domain restrictions in Google Console
4. **Mobile Issues**: Ensure HTTPS is enabled for production

### Debug Mode
Add `console.log` statements in the LocationSearch component to debug:
- API responses
- Location selection
- Pincode extraction

## Future Enhancements
- [ ] Save recent locations
- [ ] Current location detection
- [ ] Map preview
- [ ] Address validation
- [ ] Multiple language support 