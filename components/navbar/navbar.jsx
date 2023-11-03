import React, { useEffect, useState } from "react";
import { BsFacebook, BsHouse, BsSearch, BsMessenger } from "react-icons/bs";
import { FaBars, FaUserFriends } from "react-icons/fa";
import { MdOndemandVideo, MdGroups2 } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";
import { GrNotification } from "react-icons/gr";
import useWindow from "../../hooks/useWindow";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import User from "./user";
import Popup from "reactjs-popup";
import Messenger from "../../features/messenger/messenger";
import { searchName } from "../../services/searchFilter/searchFilter";
import Profile from "../profilePic/profile";
import luffy from "../../assets/luffy.jpg";
import {
  BiLeftArrow,
  BiSolidLeftArrow,
  BiSolidLeftArrowAlt,
  BiX,
} from "react-icons/bi";
import { CiRedo } from "react-icons/ci";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [choose, setChoose] = useState("home");
  const [bar, setBar] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [width, height] = useWindow();
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.id);
  const name = useSelector((state) => state.user.userName);
  const image = useSelector((state) => state.user.image);
  const [popup, setPopup] = useState(false);

  const openPopup = () => {
    setPopup(!popup);
  };

  const openSearch = () => {
    setOpen(!open);
  };

  const openBar = () => {
    setBar(!bar);
  };

  const openSearchBar = () => {
    setSearchOpen(!searchOpen);
  };

  const fetchUser = async () => {
    const res = await searchName(search);
    console.log(res.data);
    setUser(res.data.data);
  };

  const closeSearch = () => {
    setUser([]);
  };

  useEffect(() => {
    if (search) {
      fetchUser();
    } else {
      setUser([]);
    }
  }, [search]);

  //!OPEN SEARCH
  return (
    <>
      <div className="flex items-center justify-between pl-3 bg-neutral-800 p-2 pr-3 sticky top-0 z-10 ">
        <div className="flex items-center ">
          <Link to="/">
            <BsFacebook className="text-blue-500  text-4xl" />
          </Link>
          {bar && (
            <div className="fixed left-0 top-0 h-screen scrollbar-hide w-[40%] bg-neutral-800 z-10 ">
              <div className=" h-full ">
                <div className="flex justify-between text-2xl font-bold text-white p-2 md:p-4 items-center ">
                  <p>Bar</p>
                  <div className="cursor-pointer " onClick={openBar}>
                    <BiX />
                  </div>
                </div>
                <Link to={`/profile/${id}`}>
                  <div className="flex items-center m-2  p-2 hover:bg-neutral-700  rounded-[10px] cursor-pointer">
                    <div className="text-3xl pr-2">
                      <div>
                        <Profile image={`http://localhost:8000/${image}`} />
                      </div>
                    </div>
                    <p className="text-white font-bold">{name}</p>
                  </div>
                </Link>
                <Link to="/friends">
                  <div className="flex items-center m-2  p-2 hover:bg-neutral-700  rounded-[10px] cursor-pointer gap-2">
                    <div className="text-3xl pr-2 text-blue-600">
                      <FaUserFriends />
                    </div>
                    <p className="text-white font-bold">Friends</p>
                  </div>
                </Link>
              </div>
            </div>
          )}
          {width > 500 ? (
            <div className="">
              <div className="flex items-center ml-2 rounded-[20px] bg-neutral-600 relative ">
                <BsSearch className="ml-2 text-neutral-400 " />
                <input
                  className="outline-none w-full rounded-[20px] m-2 bg-neutral-600 text-white"
                  placeholder="Search Facebook"
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={openSearch}
                ></input>
              </div>
              {open && (
                <div className="flex flex-col absolute bg-neutral-600 left-16 rounded-md w-[13rem]">
                  <div className="w-full border-b-2 border-b-black p-1">
                    <BiSolidLeftArrowAlt
                      className="text-3xl cursor-pointer"
                      onClick={openSearch}
                    />
                  </div>
                  <div className=" overflow-y-scroll h-[15rem]">
                    {user ? (
                      user.map((value, index) => (
                        <Link to={`/profile/${value.id}`}>
                          <div
                            className="flex p-1 items-center cursor-pointer"
                            key={index}
                          >
                            <Profile
                              image={`http://localhost:8000/${value.image}`}
                            />
                            <p className="font-bold text-white ml-2">
                              {value.user_Name}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div>
                        <p>No results found</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col ">
              <div
                className="bg-neutral-700 rounded-[50%] p-3 ml-2 relative" onClick={openSearchBar}
              >
                <BsSearch className="text-neutral-400" />
              </div>

            {searchOpen && 
                          <div className="bg-neutral-700 absolute mt-12 left-[1rem] rounded-lg">
                <div className="flex items-center gap-2">
                <div className="flex items-center ml-2 rounded-[20px] bg-neutral-600 m-2 w-[10rem] ">
                  <BsSearch className="ml-2 text-neutral-400 " />
                  <input
                    className="outline-none w-full  m-2 bg-neutral-600 text-white text-sm"
                    placeholder="Search Facebook "
                    onChange={(e) => setSearch(e.target.value)}
                    // onClick={openSearch}
                  ></input>
                </div>
                <div className="text-2xl text-white font-bold hover:text-red-600" onClick={openSearchBar}>
                  <BiX />
                </div>
                </div>
              <div className="h-[200px] overflow-y-scroll">
                    {user ? (
                      user.map((value, index) => (
                        <Link to={`/profile/${value.id}`}>
                          <div
                            className="flex p-2 items-center cursor-pointer"
                            key={index}
                          >
                            <Profile
                              image={`http://localhost:8000/${value.image}`}
                            />
                            <p className="font-bold text-white ml-2">
                              {value.user_Name}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div>
                        <p>No results found</p>
                      </div>
                    )}
              </div>
              </div>
            }
            </div>
          )}
        </div>
        {width > 850 ? (
          <div className="flex items-center text-neutral-500 w-[50%]">
            <div
              className={`p-2 pl-8 pr-8 text-3xl hover:bg-neutral-400 rounded-[10px] cursor-pointer ${
                choose === "home" ? "border-b-blue-600 border-b-2" : ""
              }`}
              onClick={() => {
                navigate("/");
                setChoose("home");
              }}
            >
              <BsHouse
                className={`${choose === "home" ? "text-blue-600" : ""}`}
              />
            </div>
            <div
              className={`p-2 pl-8 pr-8 text-3xl hover:bg-neutral-400 rounded-[10px] cursor-pointer ${
                choose === "friends" ? "border-b-blue-600 border-b-2" : ""
              }`}
              onClick={() => {
                navigate("/friends");
                setChoose("friends");
              }}
            >
              <FaUserFriends
                className={`${choose === "friends" ? "text-blue-600" : ""}`}
              />
            </div>
            <div className="p-2 pl-8 pr-8 text-3xl hover:bg-neutral-400 rounded-[10px]">
              <MdOndemandVideo />
            </div>
            <div className="p-2 pl-8 pr-8 text-3xl hover:bg-neutral-400 rounded-[10px]">
              <AiOutlineShop />
            </div>
            <div className="p-2 pl-8 pr-8 text-3xl hover:bg-neutral-400 rounded-[10px]">
              <MdGroups2 />
            </div>
          </div>
        ) : (
          <div
            className="rounded-[50%] bg-neutral-700 p-3 cursor-pointer"
            onClick={openBar}
          >
            <FaBars className="cursor-pointer" />
          </div>
        )}
        <div className="flex items-center ">
          <div className="text-2xl rounded-[50%] bg-neutral-700 p-2 mr-2">
            <CgMenuGridO />
          </div>
          <div
            className="text-2xl rounded-[50%] bg-neutral-700 p-2 mr-2 relative cursor-pointer"
            onClick={openPopup}
          >
            <BsMessenger />
          </div>
          {popup && <Messenger />}
          <div className="text-2xl rounded-[50%] bg-neutral-700 p-2 mr-2">
            <GrNotification />
          </div>
          <User image={`http://localhost:8000/${image}`} />
        </div>
      </div>
    </>
  );
}
