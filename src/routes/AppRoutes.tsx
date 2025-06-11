// import { Routes, Route } from "react-router-dom";
// // import AdminDashboard from "../features/admin/pages/AdminDashboard";
// // import ManageManagers from "../features/admin/pages/AdminManagerManager";
// // import SpecialOrders from "../features/admin/pages/AdminSpecialOrders";
// // import SpecialOrderDetails from "../features/admin/pages/SpecialOrderDetails";
// // import NotFound from "../features/admin/pages/NotFound";
// import MainPage from "../features/restaurants/RestaurantLandingPage/MainPage";
// import DelieveryLanding from "../features/restaurants/Delivery/DeliveryLanding";
// import Checkout from "../features/cart/Checkout";
// import CartPage from "../features/cart/CartPage";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       {/* Admin Routes
//       <Route path="/admin/dashboard" element={<AdminDashboard />} />
//       <Route path="/admin/manage-managers" element={<ManageManagers />} />
//       <Route path="/admin/special-orders" element={<SpecialOrders />} /> */}

//       {/*For view order details:--_*/}
//       {/* <Route path="/special-orders/:orderId" element={<SpecialOrderDetails />} /> */}
//       {/* <Route
//         path="/admin/special-orders/:orderId"
//         element={<SpecialOrderDetails />}
//       /> */}
     
//       {/* Restaurant Routes */}
//       <Route path="/restaurant/landing" element={<MainPage />} />
//       <Route path="/restaurant/delivery" element={<DelieveryLanding />} />

//       {/* Cart Routes */}
//       <Route path="/cart/checkout" element={<Checkout />} />
//       <Route path="/cart" element={<CartPage />} />

//       {/* Fallback */}
//       {/* <Route path="*" element={<NotFound />} /> */}
//     </Routes>
//   );
// }


import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PlaceOrderPage from "../features/customer/orderPlacement/PlaceOrderPage";
import OrderStatusPage from "../features/customer/orderStatus/OrderStatusPage";
import OrderHistoryPage from "../features/customer/orderHistory/OrderHistoryPage";
import MainPage from "../features/restaurants/RestaurantLandingPage/MainPage";
import CartPage from "../features/cart/CartPage";
import LandingPage from "../pages/HomePage/LandingPage";

const router = createBrowserRouter([
  {
    path: 'place-order',
    element: <PlaceOrderPage />
  },
  {
    path: 'place-order/order-status',
    element: <OrderStatusPage />
  },
  {
    path: 'order-history',
    element: <OrderHistoryPage />
  },
  {
    path: 'place-order',
    element: <PlaceOrderPage />
  },
  {
    path: 'landing',
    element: <MainPage />
  },
  {
    path:'/cart',
    element: <CartPage />
  },
  {
    path:'/',
    element:<LandingPage/>
  }

]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;