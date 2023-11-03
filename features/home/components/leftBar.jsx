import React, { useState } from "react";
import { BsArrowUpCircleFill, BsCheckCircle } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { RiMemoriesFill } from "react-icons/ri";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdGroups2 } from "react-icons/md";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";
import { BiSolidTimeFive } from "react-icons/bi";
import { CiBullhorn } from "react-icons/ci";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { BsMessenger } from "react-icons/bs";
import useWindow from "../../../hooks/useWindow";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import Profile from "../../../components/profilePic/profile";
import { Link } from "react-router-dom";

export default function LeftBar() {
  const [width, height] = useWindow();

  const [viewMore, setViewLess] = useState("true");

  const pressViewMore = () => {
    setViewLess(!viewMore);
  };

  const userImage = useSelector((state) => state.user.image);
  const name = useSelector((state) => state.user.userName);

  const items = [
    
    {
      name: "Memories",
      icon: <RiMemoriesFill className="text-blue-600" />,
    },
    {
        name: name,
        icon: <Profile image={`http://localhost:8000/${userImage}`} />
      
    },
    {
      name: "Friends",
      icon: <FaUserFriends className="text-blue-600" />,
    },
    {
      name: "Saved",
      icon: <FcLikePlaceholder />,
    },
    {
      name: "Groups",
      icon: <MdGroups2 className="text-blue-600" />,
    },
    {
      name: "Video",
      icon: <MdOutlineOndemandVideo className="text-blue-600" />,
    },
    {
      name: "Marketplace",
      icon: <AiOutlineShop className="text-blue-600" />,
    },
    {
      name: "Feeds",
      icon: <BiSolidTimeFive className="text-blue-600" />,
    },
    {
      name: "Ad Centre",
      icon: <CiBullhorn className="text-blue-600" />,
    },
    {
      name: "Ads Manager",
      icon: <BiSolidBarChartAlt2 className="text-blue-600" />,
    },
    {
      name: "Events",
      icon: <BsFillCalendarEventFill className="text-blue-600" />,
    },
    {
      name: "Messenger",
      icon: <BsMessenger className="text-blue-600" />,
    },
  ];

  const lessItems = items.slice(0, 7);

  return (
    <>
      {width > 500 && (
        <div className="fixed left-0 top-0 h-screen scrollbar-hide max-h-screen overflow-y-scroll w-[20%] bg-neutral-800">
          <div className=" h-full ">
            {viewMore
              ? lessItems.map((item, index) => (
                <div className="flex flex-col" key={index}>
                    <div className="flex items-center m-2  p-2 hover:bg-neutral-700  rounded-[10px] cursor-pointer">
                      <div className="text-3xl pr-2">{item.icon}</div>
                      <p className="text-white font-bold">{item.name}</p>
                    </div>
                  </div>
                ))
              : items.map((item, index) => (
                  <div className="flex flex-col" key={index}>
                    <div className="flex items-center m-2  p-2 hover:bg-neutral-700  rounded-[10px] cursor-pointer">
                      <div className="text-3xl pr-2">{item.icon}</div>
                      <p className="text-white font-bold">{item.name}</p>
                    </div>
                  </div>
                ))}
            <div className="flex text-white font-bold  items-center m-2  p-2 hover:bg-neutral-700  rounded-[10px] cursor-pointer">
              {viewMore ? (
                <div onClick={pressViewMore} className="flex items-center">
                  <BsArrowDownCircleFill className="text-2xl" />
                  <p className="ml-2">See more</p>
                </div>
              ) : (
                <div onClick={pressViewMore} className="flex items-center">
                  <BsArrowUpCircleFill className="text-2xl" />
                  <p className="ml-2">See less</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
