import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearData } from "../../redux/slice/userSlice";
import Profile from "../profilePic/profile";
import { Link } from "react-router-dom";

export default function User(props) {
  const [dropDown, setDropDown] = useState(false);
  const id = useSelector((state)=>state.user.id)

  const drop = () => {
    setDropDown(!dropDown);
  };
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="text-2xl  relative w-[3rem] h-[3rem] cursor-pointer"
        onClick={drop}
      >
        <Profile image={props.image} />
        {dropDown && (
          <div className="flex flex-col absolute right-0 top-12 bg-black rounded-[10px]">
          <Link to={`/profile/${id}`} >
            <div className="border-2 border-black text-sm p-1 text-white font-bold hover:bg-neutral-800 mt-2 cursor-pointer">
              <p className="pl-6">Profile</p>
            </div>
          </Link>
            <div
              className="border-2 border-black text-sm p-1 text-white font-bold hover:bg-neutral-800 mb-2 cursor-pointer"
              onClick={() => dispatch(clearData())}
            >
              <p className="pl-6">Logout</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
