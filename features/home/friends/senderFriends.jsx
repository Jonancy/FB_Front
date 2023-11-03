import React, { useEffect, useState } from "react";
import luffy from "../../../assets/luffy.jpg";
import {
  checkStatusFrReq, getSenderReqs, rejectFrRequest,
} from "../../../services/friendre/friendReq";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MainFriends from "./mainFriends";
import { toast } from "react-toastify";

export default function SenderFriends() {
  const [req, setReq] = useState([]);
  const id = useParams();
  const idd = parseInt(id);

  const user_id = useSelector((state) => state.user.id);
  const jwt = useSelector((state)=>state.user.jwt)

  const checkReq = async () => {
    const res = await getSenderReqs(user_id);
    // console.log(res.data);
    setReq(res.data.data);
  };

  useEffect(() => {
    checkReq();
  }, []);

  const rejectRequest=async(sender_id,receiver_id)=>{
    const res = await rejectFrRequest(sender_id,receiver_id,jwt)
    console.log(res.data);
    const message = res.data.message
    if(res.data.success){
      toast.success(message)
    }else{
      toast.error(message)
    }
    checkReq()
    // console.log(res.data);
  }

  return (
    <>
      <div className="flex h-full ">
        <MainFriends />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-4  bg-neutral-900 w-full gap-4 sm:gap-0">
          {req &&
            req.map((value, index) => (
              value.status === 'pending' &&
              (<div
                key={index}
                className="flex flex-col items-start border-2 border-gray-700 w-[6rem] sm:w-[10rem]   md:w-[12rem]  lg:w-[16em] h-fit rounded-lg "
                >
                <Link to={`/profile/${value.receiver.id}`}>
                <div className="w-fit sm:w-full  h-[7rem] sm:h-[15rem] lg:h-[20rem] rounded-t-lg ">
                    <img
                      className=" rounded-t-lg object-cover h-full  "
                      src={`http://localhost:8000/${value.receiver.image}`}
                    ></img>
                  </div>
                </Link>
                <div className="flex flex-col p-2 w-full text-white text-[10px] sm:text-sm md:text-md lg:text-lg">
                  <div className="flex flex-col">
                    <p className="font-bold ">
                      {value.receiver.user_Name}
                    </p>
                    <p>9 mutual friends</p>
                  </div>
                    <div 
                        className="p-1 sm:p-2 bg-blue-700 rounded-md text-center mt-2 cursor-pointer text-[10px] sm:text-sm md:text-md lg:text-lg"
                        onClick={()=>rejectRequest(value.sender.id,value.receiver.id)}>
                      <p>Cancel</p>
                    </div>
                </div>
              </div>)
            ))}
        </div>
      </div>
    </>
  );
}
