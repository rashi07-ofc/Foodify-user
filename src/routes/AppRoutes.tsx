


// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import PlaceOrderPage from "../features/customer/orderPlacement/PlaceOrderPage";
// import OrderStatusPage from "../features/customer/orderStatus/OrderStatusPage";
// import OrderHistoryPage from "../features/customer/orderHistory/OrderHistoryPage";
// import MainPage from "../features/restaurants/RestaurantLandingPage/MainPage";
// import CartPage from "../features/cart/CartPage";
// import LandingPage from "../pages/HomePage/LandingPage";
// import Login from "../features/auth/Login";
// import Register from "../features/auth/Register";
// import ZomatoCollections from "../features/restaurants/RestaurantLIst/ZomatoCollections";
// import OTP from "../features/auth/OTP";

// const router = createBrowserRouter([
//   {
//     path: 'place-order',
//     element: <PlaceOrderPage />
//   },
//   {
//     path: 'place-order/order-status',
//     element: <OrderStatusPage />
//   },
//   {
//     path: 'order-history',
//     element: <OrderHistoryPage />
//   },
//   {
//     path: 'place-order',
//     element: <PlaceOrderPage />
//   },
//   {
//     path: 'landing',
//     element: <MainPage />
//   },
//   {
//     path:'/cart',
//     element: <CartPage />
//   },
//   {
//     path:'/',
//     element:<LandingPage/>
//   },
//   {
//     path:'/login',
//     element:<Login/>
//   },
//   {
//     path:'/signup',
//     element:<Register/>
//   },

//   {
//     path:'/home',
//     element:<ZomatoCollections/>
//   },

//   {
//     path:'/otp',
//     element:<OTP/>
//   }



// ]);

// const AppRoutes = () => <RouterProvider router={router} />;

// export default AppRoutes;

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PlaceOrderPage from "../features/customer/orderPlacement/PlaceOrderPage";
import OrderStatusPage from "../features/customer/orderStatus/OrderStatusPage";
import OrderHistoryPage from "../features/customer/orderHistory/OrderHistoryPage";
import MainPage from "../features/restaurants/RestaurantLandingPage/MainPage";
import CartPage from "../features/cart/CartPage";
import LandingPage from "../pages/HomePage/LandingPage";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import ZomatoCollections from "../features/restaurants/RestaurantLIst/ZomatoCollections";
import OTP from "../features/auth/OTP";
import ProfilePage from "../pages/HomePage/ProfilePage";



const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Register />
  },
  {
    path: '/otp',
    element: <OTP />
  },
  {
    path: '/home',
    element: <ZomatoCollections />
  },
  {
    path: '/list', // ✅ Added this route to fix the navigation issue
    element: <ZomatoCollections />
  },
  {
    path: '/place-order',
    element: <PlaceOrderPage />
  },
  {
    path: '/place-order/order-status',
    element: <OrderStatusPage />
  },
  {
    path: '/order-history',
    element: <OrderHistoryPage />
  },
  {
    path: '/landing',
    element: <MainPage />
  },
  {
    path: '/cart',
    element: <CartPage />
  },
  {
    path: '/profile', // ✅ You added this!
    element: <ProfilePage />
  }
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
