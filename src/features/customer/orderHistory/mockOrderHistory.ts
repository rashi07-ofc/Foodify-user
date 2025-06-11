export interface OrderItem {
    name: string;
    quantity: number;
  }
  
  export interface Order {
    orderId: string;
    date: string;
    items: OrderItem[];
    totalAmount: number;
    status: string;
  }
  
  export const orderHistory: Order[] = [
    {
      orderId: 'order1',
      date: '2025-05-12',
      items: [
        { name: 'itemA', quantity: 1 },
        { name: 'itemB', quantity: 2 },
      ],
      totalAmount: 100,
      status: 'Delivered',
    },
    {
      orderId: 'order2',
      date: '2025-05-11',
      items: [
        { name: 'itemC', quantity: 1 },
        { name: 'itemD', quantity: 3 },
      ],
      totalAmount: 200,
      status: 'Cancelled',
    },
    // Add more mock order data here
  ];