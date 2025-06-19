// types.d.ts

export interface PublicRestaurant {
  _id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  managerId: string;
  tags: string[];
}

export interface SearchResult {
  restaurants: PublicRestaurant[];
  totalResults: number;
}
