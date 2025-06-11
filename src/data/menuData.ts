export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CategorizedMenu {
  [category: string]: MenuItem[];
}

export const categorizedMenu: CategorizedMenu = {
  Starters: [
    {
      id: 1,
      name: 'Spring Rolls',
      price: 399,
      description: 'Crispy rolls stuffed with vegetables.',
      image: 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 2,
      name: 'Garlic Bread',
      price: 350,
      description: 'Toasted bread with garlic and herbs.',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      name: 'Hummus & Pita',
      price: 375,
      description: 'Creamy hummus served with warm pita bread.',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 4,
      name: 'Stuffed Mushrooms',
      price: 420,
      description: 'Mushrooms filled with cheese and herbs.',
      image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 5,
      name: 'Bruschetta',
      price: 360,
      description: 'Grilled bread topped with fresh tomatoes and basil.',
      image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 6,
      name: 'Cheese Nachos',
      price: 410,
      description: 'Corn chips covered with melted cheese and jalapeños.',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 19,
      name: 'Crispy Corn',
      price: 445,
      description: 'Golden fried corn tossed in spices.',
      image: 'https://images.pexels.com/photos/594590/pexels-photo-594590.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 20,
      name: 'Paneer Poppers',
      price: 490,
      description: 'Bite-sized paneer snacks with a spicy crust.',
      image: 'https://images.pexels.com/photos/5665663/pexels-photo-5665663.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 21,
      name: 'Mini Samosas',
      price: 340,
      description: 'Crispy pastry stuffed with spiced potatoes.',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 22,
      name: 'Tandoori Broccoli',
      price: 495,
      description: 'Broccoli marinated in tandoori masala and grilled.',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 23,
      name: 'Chilli Paneer',
      price: 510,
      description: 'Fried paneer cubes tossed in Indo-Chinese sauce.',
      image: 'https://images.pexels.com/photos/5665663/pexels-photo-5665663.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 24,
      name: 'Veg Cutlet',
      price: 365,
      description: 'Deep-fried vegetable patties.',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ],

  "Main Course": [
    {
      id: 7,
      name: 'Butter Chicken',
      price: 950,
      description: 'Creamy tomato gravy with grilled chicken.',
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 8,
      name: 'Paneer Tikka Masala',
      price: 850,
      description: 'Cottage cheese cooked in spicy tikka masala.',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 9,
      name: 'Grilled Salmon',
      price: 1200,
      description: 'Perfectly grilled salmon with lemon butter sauce.',
      image: 'https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 10,
      name: 'Veg Biryani',
      price: 780,
      description: 'Aromatic basmati rice cooked with vegetables and spices.',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 11,
      name: 'Spaghetti Alfredo',
      price: 840,
      description: 'Classic Italian pasta in creamy Alfredo sauce.',
      image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 12,
      name: 'Tandoori Chicken',
      price: 1050,
      description: 'Chicken marinated in yogurt and spices, roasted in tandoor.',
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 25,
      name: 'Dal Makhani',
      price: 735,
      description: 'Slow-cooked black lentils in creamy gravy.',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 26,
      name: 'Rajma Chawal',
      price: 690,
      description: 'Kidney beans curry served with steamed rice.',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 27,
      name: 'Kadhai Paneer',
      price: 875,
      description: 'Paneer cooked with bell peppers in tomato gravy.',
      image: 'https://images.pexels.com/photos/5665663/pexels-photo-5665663.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 28,
      name: 'Chole Bhature',
      price: 720,
      description: 'Spicy chickpeas served with fried Indian bread.',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 29,
      name: 'Fish Curry',
      price: 1150,
      description: 'Coastal-style fish curry with coconut and spices.',
      image: 'https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 30,
      name: 'Egg Curry',
      price: 800,
      description: 'Boiled eggs simmered in onion-tomato masala.',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ],

  Desserts: [
    {
      id: 13,
      name: 'Gulab Jamun',
      price: 260,
      description: 'Deep-fried milk balls soaked in sugar syrup.',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 14,
      name: 'Ice Cream Sundae',
      price: 275,
      description: 'Vanilla ice cream with chocolate drizzle and nuts.',
      image: 'https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 15,
      name: 'Chocolate Brownie',
      price: 290,
      description: 'Rich chocolate brownie served warm.',
      image: 'https://images.pexels.com/photos/45202/chocolate-brownie-cake-dessert-45202.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 16,
      name: 'Rasmalai',
      price: 250,
      description: 'Soft cottage cheese balls in flavored milk.',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 17,
      name: 'Mango Mousse',
      price: 275,
      description: 'Fluffy mousse made with fresh mango pulp.',
      image: 'https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 18,
      name: 'Carrot Halwa',
      price: 295,
      description: 'Grated carrots cooked with milk and dry fruits.',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 31,
      name: 'Kheer',
      price: 270,
      description: 'Rice pudding with cardamom and saffron.',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 32,
      name: 'Kulfi',
      price: 320,
      description: 'Traditional Indian frozen dessert.',
      image: 'https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 33,
      name: 'Fruit Custard',
      price: 285,
      description: 'Mixed fruits in creamy custard.',
      image: 'https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 34,
      name: 'Moong Dal Halwa',
      price: 330,
      description: 'Rich lentil dessert cooked in ghee.',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 35,
      name: 'Shahi Tukda',
      price: 345,
      description: 'Fried bread soaked in sweetened milk.',
      image: 'https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 36,
      name: 'Malpua',
      price: 360,
      description: 'Sweet pancakes served with rabri.',
      image: 'https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ],
};
