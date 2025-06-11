export interface Restaurant {
    id: number;
    name: string;
    city: string;
    price_per_dish: string;
    timings: string;
    rating: number;
    distance: string;
    coupon_percent: string;
  }
  
  export const restaurantsData: Restaurant[] = [
    {
      id: 1,
      name: "Spicy Grill",
      city: "Delhi",
      price_per_dish: "₹250",
      timings: "11:00 AM - 11:00 PM",
      rating: 4.5,
      distance: "2.5 km",
      coupon_percent: "20%",
    },
    {
      id: 2,
      name: "Cafe Mocha",
      city: "Mumbai",
      price_per_dish: "₹300",
      timings: "9:00 AM - 10:00 PM",
      rating: 4.2,
      distance: "1.2 km",
      coupon_percent: "10%",
    },
    {
      id: 3,
      name: "Urban Bistro",
      city: "Bangalore",
      price_per_dish: "₹200",
      timings: "12:00 PM - 12:00 AM",
      rating: 4.8,
      distance: "3.1 km",
      coupon_percent: "25%",
    },
    {
      id: 4,
      name: "Flavours of India",
      city: "Chennai",
      price_per_dish: "₹180",
      timings: "10:00 AM - 10:00 PM",
      rating: 2.0,
      distance: "4.5 km",
      coupon_percent: "15%",
    },
    {
      id: 5,
      name: "The Food Story",
      city: "Pune",
      price_per_dish: "₹220",
      timings: "8:00 AM - 11:00 PM",
      rating: 4.3,
      distance: "0.9 km",
      coupon_percent: "30%",
    },
  ];