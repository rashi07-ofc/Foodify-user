import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

// Import all page components
import PlaceOrderPage from "../features/customer/orderPlacement/PlaceOrderPage";
import OrderStatusPage from "../features/customer/orderStatus/OrderStatusPage";
import OrderHistoryPage from "../features/customer/orderHistory/OrderHistoryPage";
import MainPage from "../features/restaurants/RestaurantLandingPage/MainPage";
import CartPage from "../features/cart/CartPage";
import LandingPage from "../pages/HomePage/LandingPage"; // This seems to be your root landing page
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import ZomatoCollections from "../features/restaurants/RestaurantLIst/ZomatoCollections"; // Your restaurant list page
import OTP from "../features/auth/OTP";
import ProfilePage from "./../pages/HomePage/ProfilePage"; // Profile page from the first snippet
import ForgotPassword from "../pages/forgetPassword/ForgetPassword";
import VerifyCode from "../pages/forgetPassword/VerifyCode";
import NewPassword from "../pages/forgetPassword/NewPassword";
import ResetSuccess from "../pages/forgetPassword/ResetSuccess";

// Import the context provider
import { ResetFlowProvider } from "./../context/ResetFlowContext";

// Define all application routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage /> // Your root landing page
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
    element: <ZomatoCollections /> // Route for restaurant collections/list
  },
  {
    path: '/list', // Another route pointing to the same restaurant list, as per your original code
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
    path: '/landing/:id', // This seems to be a restaurant detail/main page as per your component name
    element: <MainPage />
  },
  {
    path: '/cart',
    element: <CartPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/forget', // Forgot password flow start
    element: <ForgotPassword />
  },
  {
    path: "/verify-code",
    element: <VerifyCode />
  },
  {
    path: "/new-password",
    element: <NewPassword />
  },
  {
    path: "/reset-success",
    element: <ResetSuccess />
  }
]);

// AppRoutes component responsible for routing and global setup
const AppRoutes = () => {
  // Initialize AOS (Animate On Scroll) library on component mount
  // This ensures animations are applied when elements scroll into view
  useEffect(() => {
    AOS.init({ duration: 800 }); // Sets a default animation duration of 800ms
  }, []); // Empty dependency array ensures this runs only once after initial render

  return (
    // ResetFlowProvider wraps the application to provide context for the password reset flow
    <ResetFlowProvider>
      {/* ToastContainer for displaying transient notifications (toasts) */}
      {/* position="top-center" places toasts at the top center of the screen */}
      {/* autoClose={2000} makes toasts disappear after 2 seconds */}
      <ToastContainer position="top-center" autoClose={2000} />
      {/* RouterProvider provides routing capabilities to all descendant components */}
      <RouterProvider router={router} />
    </ResetFlowProvider>
  );
};

export default AppRoutes;
