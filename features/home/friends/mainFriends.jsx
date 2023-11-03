import React from "react";
import { CiSettings } from "react-icons/ci";
import { MdGroup } from "react-icons/md";
import { Link } from "react-router-dom";

export default function MainFriends() {
  return (
    <>
      <div className=" h-screen w-[40%] md:w-[20%] bg-neutral-800">
        <div className=" h-full ">
          <div className="flex flex-col">
            <div className="flex flex-col m-2  p-2 ">
              <div className="flex justify-between gap-4 md:gap-0 text-xl md:text-2xl p-2 font-bold text-white">
                <p>Friends</p>
                <div className="rounded-full bg-neutral-600 p-1  md:p-2">
                  <CiSettings />
                </div>
              </div>
            <Link to='/friends'>
              <div className="flex pt-2 pb-2 hover:bg-neutral-700  rounded-[10px] cursor-pointer items-center">
                <div className="text-md md:text-2xl p-1 md:p-2 rounded-full bg-neutral-600 mr-2">
                  <MdGroup />
                </div>
                <p className="text-white font-bold text-sm md:text-lg">All Friends</p>
              </div>
            </Link>
            <Link to='/friends/addFriends'>
              <div className="flex pt-2 pb-2 hover:bg-neutral-700  rounded-[10px] cursor-pointer items-center">
                <div className=" text-md md:text-2xl p-1 md:p-2 rounded-full bg-neutral-600 mr-2">
                  <MdGroup />
                </div>
                <p className="text-white font-bold text-sm md:text-lg">Add Friends</p>
              </div>
            </Link>
            <Link to='/friends/sender'>
              <div className="flex pt-2 pb-2 hover:bg-neutral-700  rounded-[10px] cursor-pointer items-center">
                <div className="text-md md:text-2xl p-1 md:p-2 rounded-full bg-neutral-600 mr-2">
                  <MdGroup />
                </div>
                <p className="text-white font-bold text-sm md:text-lg">Sent Requests </p>
              </div>
            
            </Link>
            <Link to='/friends/receiver'>
              <div className="flex pt-2 pb-2 hover:bg-neutral-700  rounded-[10px] cursor-pointer items-center">
                <div className="text-md md:text-2xl p-1 md:p-2 rounded-full bg-neutral-600 mr-2">
                  <MdGroup />
                </div>
                <p className="text-white font-bold text-sm md:text-lg">Received Requests </p>
              </div>
            
            </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
