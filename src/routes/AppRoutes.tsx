import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

// Page Components
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
import ProfilePage from "../pages/HomePage/ProfilePage";
// import ForgotPassword from "../pages/forgetPassword/ForgotPassword";
import VerifyCode from "../pages/forgetPassword/VerifyCode";
import NewPassword from "../pages/forgetPassword/NewPassword";
import ResetSuccess from "../pages/forgetPassword/ResetSuccess";

// Context + Layout
// import { ResetFlowProvider } from "../context/ResetFlowContext";
import AppLayout from "../components/layout/AppLayout";
import PaymentSuccess from "../features/customer/orderPlacement/paymentSection/PaymentSuccess";
import PaymentFailure from "../features/customer/orderPlacement/paymentSection/PaymentFailure";

// Import the context provider
import { ResetFlowProvider } from "./../context/ResetFlowContext";

// Define all application routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Register /> },
      { path: "otp", element: <OTP /> },
      { path: "verify-code", element: <VerifyCode /> },
      { path: "new-password", element: <NewPassword /> },
      { path: "reset-success", element: <ResetSuccess /> },
      { path: "home", element: <ZomatoCollections /> },
      { path: "place-order", element: <PlaceOrderPage /> },
      { path: "place-order/order-status", element: <OrderStatusPage /> },
      { path: "order-history", element: <OrderHistoryPage /> },
      { path: "landing/:id", element: <MainPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "profile", element: <ProfilePage /> }
    ]
  },
  {
    path: "/order-success",
    element: <PaymentSuccess />
  }, 
  {
    path: "/order-failure",
    element: <PaymentFailure />
  }
]);

const AppRoutes = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <ResetFlowProvider>
      <ToastContainer position="top-center" autoClose={2000} />
      <RouterProvider router={router} />
    </ResetFlowProvider>
  );
};

export default AppRoutes;
