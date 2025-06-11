import React from "react"

const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 font-semibold'
      case 'Confirmed':
        return 'text-yellow-600 font-semibold'
      case 'Placed':
        return 'text-blue-600 font-semibold'
      case 'Cancelled':
        return 'text-red-600 font-semibold'
      default:
        return 'text-gray-600'
    }
  }
  
  const OrderStatusPage = () => {
    const mockOrders = [
      {
        id: 'order1',
        date: '2025-05-12',
        status: 'Placed',
        total: 120,
        items: ['Item1', 'Item2', 'Item3'],
      },
      {
        id: 'order2',
        date: '2025-05-11',
        status: 'Delivered',
        total: 200,
        items: ['Item1', 'Item2', 'Item3'],
      },
    ]
  
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
  
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded shadow border mb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <p>Order ID: {order.id}</p>
              <p>{order.date}</p>
            </div>
  
            <div className="flex justify-between items-center mb-2">
              <p className={getStatusColor(order.status)}>Status: {order.status}</p>
              <p className="font-medium">Total: ₹{order.total}</p>
            </div>
  
            <p className="text-sm text-gray-600">
              {order.items.length} item(s): {order.items.join(', ')}
            </p>
          </div>
        ))}
      </div>
    )
  }
  
  export default OrderStatusPage  