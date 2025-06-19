import React from "react";
import { Outlet } from "react-router-dom";
import SearchNavbar from "./SearchNavbar"; // adjust path as needed

const SearchLayout: React.FC = () => {
  return (
    <>
      <SearchNavbar />
      {/* <main className="pt-16"> */}
      <Outlet />
      {/* </main> */}
    </>
  );
};

export default SearchLayout;
