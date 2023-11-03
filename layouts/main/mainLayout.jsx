import React from "react";
import Navbar from "../../components/navbar/navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <div>
        <Navbar />
        {children}
      </div>
    </>
  );
}
