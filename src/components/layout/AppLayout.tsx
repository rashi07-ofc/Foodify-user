// src/layouts/AppLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main className="mt-16 px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
