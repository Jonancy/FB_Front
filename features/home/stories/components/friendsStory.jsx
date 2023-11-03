import React from "react";
import { BsPlus } from "react-icons/bs";
import luffy from "../../../../assets/luffy.jpg";
import user from "../../../../assets/user.png";

export default function FriendsStory() {
  return (
    <>
      <div className="flex flex-col w-[10rem] rounded-[1rem] h-[15rem] bg-neutral-800">
        <div className="flex flex-col justify-center items-center h-full relative">
          <img className="rounded-[1rem] h-full" src={luffy} alt="Luffy" />
          <div className="rounded-[50%] border-2 border-white absolute top-2 left-2 h-[2rem] w-[2rem]">
            <img src={user} className="rounded-[50%]"></img>
          </div>
          <div className="flex flex-col items-center justify-center absolute bottom-0 left-2">
            <p className="text-white font-bold text-sm mb-2">Gaurav </p>
          </div>
        </div>
      </div>
    </>
  );
}
