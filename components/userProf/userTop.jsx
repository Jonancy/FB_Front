import React, { useEffect, useState } from "react";
import luffy from "../../assets/luffy.jpg";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsMessenger } from "react-icons/bs";
import { getUserDetails } from "../../services/client/clientDetails";
import {
  checkFreqStatus,
  checkStatusFrReq,
  confirmFrRequest,
  rejectFrRequest,
  sendRequest,
  unFriend,
} from "../../services/friendre/friendReq";
import { BiRightArrow, BiX } from "react-icons/bi";
import { RiArrowRightUpFill } from "react-icons/ri";
import { FcOk } from "react-icons/fc";
import { toast } from "react-toastify";

export default function UserTop(props) {
  const userId = useParams();
  const id = userId.id;
  const [reqq, setReqq] = useState([]);
  // const [users, setUser] = useState([]);
  const user = useSelector((state) => state.user.id);
  const jwt = useSelector((state) => state.user.jwt);
  const idd = parseInt(id);

  const sendFrRequest = async (e) => {
    e.preventDefault();
    const res = await sendRequest(user, idd, jwt);
    // console.log(res.data);
    const message = res.data.message;
    if (res.data.success) {
      toast.success(message);
      setReqq(res.data.data.status);
    } else {
      toast.error(message);
    }
    checkReq();


  };

  const checkReq = async () => {
    const res = await checkFreqStatus(user, idd);
    // console.log(res.data);
    setReqq(res.data.data);
  };

  const acceptRequest = async () => {
    const res = await confirmFrRequest(idd, user, jwt);
    checkReq();
    const message = res.data.message;
    if (res.data.success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    // console.log(res.data);
  };

  const cancelRequest = async () => {
    const res = await rejectFrRequest(user, idd, jwt);
    const message = res.data.message;
    if (res.data.success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    checkReq();
    // console.log(res.data);
  };

  const rejectRequest = async () => {
    const res = await rejectFrRequest(idd, user, jwt);
    const message = res.data.message;
    if (res.data.success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    checkReq();
    // console.log(res.data);
  };

  const unFriendFr = async () => {
    const res = await unFriend(user, idd, jwt);
    const message = res.data.message;
    if (res.data.success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    checkReq();
    // console.log(res.data);
  };

  useEffect(() => {
    checkReq();
  }, []);

  // const newId = reqq[0]

  // console.log(newId.id);

  // const getUser = async () => {
  //   const res = await getUserDetails(id, jwt);
  //   console.log(res.data);
  //   setUser(res.data.data);
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <div className="flex flex-col w-full border-b-2 border-b-gray-600 pb-2">
      <div className=" relative text-white">
        <div className="  h-[15rem] md:h-[22rem] lg:h-[28rem] rounded-b-md">
          <img
            className="object-cover w-full h-full rounded-b-md"
            src={luffy}
          ></img>
        </div>
        <div className="flex flex-col md:ml-8 md:mr-8 ">
          <div className="flex ">
            {/* <div className=" w-[9rem] h-[9rem] absolute   -bottom-16 md:w-[12rem] md:h-[12rem] rounded-full border-4 border-neutral-800"> */}
            <div className="w-[9rem] absolute -bottom-0   h-[9rem] md:w-[12rem] md:h-[12rem] rounded-full border-4 border-neutral-800 ">
              <img
                className="w-full h-full rounded-full object-cover"
                src={props.image}
              ></img>
            </div>
            {/* <div className="flex flex-col absolute -bottom-8 left-40 md:left-56 "> */}
            <div className="flex flex-col pl-[10rem]  md:pl-[14rem] pb-8">
              <div className="text-2xl font-bold">
                <p>{props.name}</p>
              </div>
              <div className="flex text-sm pb-1">
                <p>12 friends</p>
                <p>.</p>
                <p>16 following</p>
              </div>
              <div className="flex flex-col sm:flex mt-2 ">
                {user !== idd ? (
                  <>
                    {reqq && reqq.status === "accepted" ? (
                      <div className="flex gap-2 text-[13px] sm:text-md md:text-lg">
                        <div className="flex items-center bg-blue-500  p-1 rounded-md w-fit ">
                          <FcOk />
                          <p>Friends</p>
                        </div>
                        <div
                          className="flex items-center bg-neutral-600  p-1 rounded-md cursor-pointer"
                          onClick={() => unFriendFr()}
                        >
                          <p>Unfriend</p>
                        </div>
                      </div>
                    ) : reqq && reqq.sender_Id === user ? (
                      <div className="flex gap-2 text-[13px] sm:text-md md:text-lg">
                        <div className="flex items-center bg-blue-500  p-1 rounded-md  cursor-pointer">
                          <RiArrowRightUpFill />
                          <p>Request Sent</p>
                        </div>
                        <div
                          className="flex items-center bg-neutral-600 p-1 rounded-md cursor-pointer"
                          onClick={() => cancelRequest()}
                        >
                          <BiX />
                          <p>Cancel</p>
                        </div>
                      </div>
                    ) : reqq && reqq.receiver_Id === user ? (
                      <div className="flex gap-2 text-[13px] sm:text-md md:text-lg">
                        <div
                          className="flex items-center bg-blue-500  p-1 rounded-md cursor-pointer"
                          onClick={() => acceptRequest()}
                        >
                          <p>Confirm</p>
                        </div>
                        <div
                          className="flex items-center bg-neutral-600  p-1 rounded-md cursor-pointer"
                          onClick={() => rejectRequest()}
                        >
                          <p>Reject</p>
                        </div>
                      </div>
                    ) : (
                    <div className="flex gap-2 text-[13px] sm:text-md md:text-lg">
                      <div
                        className="flex items-center bg-blue-500  p-1 rounded-md w-fit cursor-pointer"
                        onClick={(e) => sendFrRequest(e)}
                      >
                        <AiOutlinePlus />
                        <p>Add Friend</p>
                      </div>
                    <div className="flex items-center   bg-neutral-700  p-1 rounded-md pl-2 pr-2 w-fit cursor-pointer">
                      <BsMessenger />
                      <p className="pl-2">Chat</p>
                    </div>

                    </div>
                      )}
                  </>
                ) : (
                  <div className="flex text-[13px] sm:text-md md:text-lg">
                    <div className="flex items-center bg-blue-500  p-1 rounded-md cursor-pointer ">
                      <AiOutlinePlus />
                      <p>Add Story</p>
                    </div>
                    <div className="w-4"></div>
                    <div className="flex items-center  bg-neutral-700  p-1 rounded-md cursor-pointer">
                      <AiFillEdit />
                      <p>Edit Profile</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
