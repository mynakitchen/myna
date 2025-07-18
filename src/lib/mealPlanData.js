// Meal Plan Data and Utilities for Myna Kitchen

export const pricingData = {
  monthly: {
    breakfast: 80,
    lunch: 120,
    dinner: 120,
    breakfastLunch: 200,
    breakfastDinner: 200,
    lunchDinner: 220,
    allMeals: 250
  },
  weekly: {
    breakfast: 90,
    lunch: 140,
    dinner: 140,
    breakfastLunch: 230,
    breakfastDinner: 230,
    lunchDinner: 250,
    allMeals: 280
  }
};

export const deliveryCharges = [
  { range: "0-8", charge: 0, label: "Free delivery" },
  { range: "8-12", charge: 10, label: "₹10 per delivery" },
  { range: "12-16", charge: 15, label: "₹15 per delivery" },
  { range: "16-20", charge: 20, label: "₹20 per delivery" }
];

// Supported pincodes with accurate delivery charges based on operational data
export const servicePincodes = {
  "600015": { area: "Thousand Lights, Chennai", charge: 25, zone: "Extended Far" },
  "600016": { area: "Vadapalani, Chennai", charge: 15, zone: "Standard" },
  "600018": { area: "Ashok Nagar, Chennai", charge: 25, zone: "Extended Far" },
  "600019": { area: "Royapuram, Chennai", charge: 0, zone: "Premium" },
  "600020": { area: "Perambur, Chennai", charge: 10, zone: "Standard" },
  "600032": { area: "Alandur, Chennai", charge: 20, zone: "Extended" },
  "600033": { area: "Pallavaram, Chennai", charge: 0, zone: "Premium" },
  "600036": { area: "Velachery, Chennai", charge: 15, zone: "Standard" },
  "600041": { area: "Sholinganallur, Chennai", charge: 0, zone: "Premium" },
  "600042": { area: "Karapakkam, Chennai", charge: 10, zone: "Standard" },
  "600061": { area: "Red Hills, Chennai", charge: 15, zone: "Standard" },
  "600073": { area: "Manali, Chennai", charge: 20, zone: "Extended" },
  "600078": { area: "Kundrathur, Chennai", charge: 20, zone: "Extended" },
  "600083": { area: "Anna Nagar East, Chennai", charge: 20, zone: "Extended" },
  "600088": { area: "Anna Nagar West, Chennai", charge: 15, zone: "Standard" },
  "600089": { area: "Tambaram West, Chennai", charge: 20, zone: "Extended" },
  "600091": { area: "Tambaram, Chennai", charge: 10, zone: "Standard" },
  "600096": { area: "Selaiyur, Chennai", charge: 0, zone: "Premium" },
  "600097": { area: "Pammal, Chennai", charge: 0, zone: "Premium" },
  "600100": { area: "Mylapore, Chennai", charge: 10, zone: "Standard" },
  "600113": { area: "OMR IT Corridor, Chennai", charge: 0, zone: "Premium" },
  "600115": { area: "Navalur, Chennai", charge: 10, zone: "Standard" },
  "600116": { area: "Siruseri, Chennai", charge: 15, zone: "Standard" },
  "600117": { area: "Thiruporur, Chennai", charge: 10, zone: "Standard" },
  "600119": { area: "Medavakkam, Chennai", charge: 0, zone: "Premium" },
  "600124": { area: "Injambakkam, Chennai", charge: 40, zone: "Far" },
  "600125": { area: "Puzhuthivakkam, Chennai", charge: 20, zone: "Extended" },
  "600130": { area: "Airport, Chennai", charge: 20, zone: "Extended" },
  "603103": { area: "Tambaram East, Chennai", charge: 20, zone: "Extended" },
  "620015": { area: "Trichy Road, Chennai", charge: 25, zone: "Extended Far" }
};

export const dietOptions = [
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    icon: 'veg',
    description: 'Pure vegetarian meals with fresh vegetables, grains, and plant-based proteins',
    image: '/images/hero/1208_x_1080_photos__28_.jpg'
  },
  {
    id: 'non-vegetarian', 
    name: 'Non-Vegetarian',
    icon: 'non-veg',
    description: 'Balanced mix of vegetarian and non-vegetarian meals for variety and nutrition',
    image: '/images/hero/70bdb087c527b5287b5836552d155406.jpg'
  }
];

export const mealOptions = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    icon: 'sunrise',
    description: 'Start your day right with nutritious morning meals',
    time: '7:30 AM - 9:00 AM',
    image: '/images/hero/1208_x_1080_photos__28_.jpg',
    type: 'regular'
  },
  {
    id: 'lunch',
    name: 'Lunch',
    icon: 'sun',
    description: 'Satisfying midday meals to keep you energized',
    time: '11:30 AM - 1:00 PM',
    image: '/images/hero/70bdb087c527b5287b5836552d155406.jpg',
    type: 'super'
  },
  {
    id: 'dinner',
    name: 'Dinner',
    icon: 'moon',
    description: 'End your day with comforting home-style meals',
    time: '7:00 PM - 8:30 PM',
    image: '/images/hero/51ho3ce412c.webp.jpeg',
    type: 'regular'
  }
];

export const days = [
  { id: 'monday', name: 'Monday', short: 'Mon' },
  { id: 'tuesday', name: 'Tuesday', short: 'Tue' },
  { id: 'wednesday', name: 'Wednesday', short: 'Wed' },
  { id: 'thursday', name: 'Thursday', short: 'Thu' },
  { id: 'friday', name: 'Friday', short: 'Fri' },
  { id: 'saturday', name: 'Saturday', short: 'Sat' },
  { id: 'sunday', name: 'Sunday', short: 'Sun' }
];

export const getMealsKey = (meals) => {
  if (meals.length === 1) {
    return meals[0];
  } else if (meals.length === 2) {
    const sorted = [...meals].sort();
    if (sorted.includes('breakfast') && sorted.includes('lunch')) return 'breakfastLunch';
    if (sorted.includes('breakfast') && sorted.includes('dinner')) return 'breakfastDinner';
    if (sorted.includes('lunch') && sorted.includes('dinner')) return 'lunchDinner';
  } else if (meals.length === 3) {
    return 'allMeals';
  }
  return 'lunch'; // default
};

export const calculatePrice = (meals, planType = 'monthly') => {
  const mealsKey = getMealsKey(meals);
  return pricingData[planType][mealsKey] || 0;
};

export const calculateDeliveryCharges = (pincode) => {
  const pincodeData = servicePincodes[pincode];
  if (pincodeData) {
    return {
      charge: pincodeData.charge,
      area: pincodeData.area,
      zone: pincodeData.zone,
      label: pincodeData.charge === 0 ? "Free delivery" : `₹${pincodeData.charge} per meal`
    };
  }
  // Return high charge for non-serviceable areas
  return {
    charge: 25,
    area: "Not serviceable",
    zone: "Out of range",
    label: "₹25 per meal (Out of service area)"
  };
};

export const isPincodeServicable = (pincode) => {
  return servicePincodes.hasOwnProperty(pincode);
};

export const getPincodeInfo = (pincode) => {
  const pincodeData = servicePincodes[pincode];
  if (pincodeData) {
    return {
      isServiceable: true,
      area: pincodeData.area,
      zone: pincodeData.zone,
      deliveryCharge: pincodeData.charge,
      message: pincodeData.charge === 0 
        ? `✅ Great! We deliver to this location with FREE delivery` 
        : `✅ We deliver to this location for ₹${pincodeData.charge} per meal`
    };
  }
  return {
    isServiceable: false,
    area: "Unknown",
    zone: "Out of range",
    deliveryCharge: 25,
    message: "❌ Sorry, we don't deliver to this pincode yet. Contact us to know when we'll expand to your area!"
  };
};

export const getMealPreview = (diet, meals, days) => {
  // Generate sample meal previews for the selected days
  const sampleMeals = {
    vegetarian: {
      breakfast: { name: "Vegetarian Breakfast", type: "Veg Meal", description: "Nutritious vegetarian morning meal" },
      lunch: { name: "Vegetarian Lunch", type: "Veg Meal", description: "Wholesome vegetarian midday meal" },
      dinner: { name: "Vegetarian Dinner", type: "Veg Meal", description: "Comforting vegetarian evening meal" }
    },
    'non-vegetarian': {
      breakfast: { name: "Mixed Breakfast", type: "Veg/Non-Veg Meal", description: "Balanced morning meal with variety" },
      lunch: { name: "Non Veg Super Meal", type: "Premium Meal", description: "Protein-rich midday meal", category: "Non-Vegetarian" },
      dinner: { name: "Comfort Dinner", type: "Veg Meal", description: "Satisfying evening meal" }
    }
  };

  return days.map(day => ({
    day: day.charAt(0).toUpperCase() + day.slice(1),
    meals: meals.map(meal => ({
      type: meal.charAt(0).toUpperCase() + meal.slice(1),
      ...sampleMeals[diet][meal]
    }))
  }));
};

export const formatCurrency = (amount) => {
  return `₹${amount}`;
}; 