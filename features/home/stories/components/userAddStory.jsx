import React from "react";
import { BsPlus } from "react-icons/bs";
import luffy from '../../../../assets/luffy.jpg';

export default function UserStory() {
  return (
    <>
      <div className="flex flex-col w-[10rem] rounded-[1rem] h-[15rem] bg-neutral-800">
        <div className="flex flex-col justify-center items-center h-full">
          <img className="rounded-t-[1rem] h-full" src={luffy} alt="Luffy" />
          <div className="flex flex-col items-center justify-center">
            <div className="bg-blue-600 rounded-[50%] p-1 text-white ">
              <BsPlus className="text-2xl" />
            </div>
            <p className="text-white font-bold text-sm mb-2">Create Story</p>
          </div>
        </div>
      </div>
    </>
  );
}
