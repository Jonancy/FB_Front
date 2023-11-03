import React from "react";
import Luffy from "../../assets/luffy.jpg";
import { useSelector } from "react-redux";


export default function AuthLayout({ children }) {

  return (
    <>

      <div className="relative ">
        <img className="w-screen h-screen " src={Luffy}></img>
        <div className="absolute inset-0 flex items-center justify-center">{children}</div>
      </div>
    </>
  );
}
