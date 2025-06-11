export interface Review {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }
  
  export const dummyReviews: Review[] = [
    {
      name: 'Alice Johnson',
      rating: 4,
      comment: 'Great food, quick service. Definitely coming again!',
      date: 'May 20, 2025',
    },
    {
      name: 'Brian Smith',
      rating: 5,
      comment: 'Amazing experience. Loved the ambiance!',
      date: 'May 18, 2025',
    },
    {
      name: 'Catherine Lee',
      rating: 3,
      comment: 'Food was okay but took a while to arrive.',
      date: 'May 15, 2025',
    },
    {
      name: 'Daniel Wu',
      rating: 5,
      comment: "Best biryani I've had in a while. Will order again!",
      date: 'May 12, 2025',
    },
  ];
  