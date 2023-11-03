import React, { useEffect, useState } from 'react'
import MainFriends from './mainFriends'
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkStatusFrReq, getFreindsAdd, sendRequest } from '../../../services/friendre/friendReq';
import { toast } from 'react-toastify';

export default function AddFriends() {

  const [req, setReq] = useState([]);
  const [ne, setNew] = useState([])
  // const id = useParams();
  // const idd = parseInt(id);

  const user_id = useSelector((state) => state.user.id);
  const jwt = useSelector((state) => state.user.jwt);

  const getSuggestions = async () => {
    const res = await getFreindsAdd();
    // console.log(res.data);
    setReq(res.data.data);
  };
  
  
  const checkReq = async () => {
    const res = await checkStatusFrReq(user_id);
    // console.log(res.data);
    setNew(res.data.data);
  };

  console.log(ne);
  
    useEffect(() => {
      getSuggestions();
      checkReq()
    }, []);
  // useEffect(() => {
  //   checkReq();
  // }, []);

  // const acceptRequest = async (sender_id, receiver_id) => {
  //   const res = await confirmFrRequest(sender_id, receiver_id, jwt);
  //   checkReq();
  //   console.log(res.data);
  // };
  // const rejectRequest = async (receiver_id) => {
  //   const res = await unFriend(sender_id, receiver_id, jwt);
  //   const message = res.data.message
  //   if(res.data.success){
  //     toast.success(message)
  //   }else{
  //     toast.error(message)
  //   }
  //   checkReq();
  //   // console.log(res.data);
  // };
  const sendFrRequest = async (id) => {
    const res = await sendRequest(user_id, id, jwt);
    // console.log(res.data);
    // setStatus(res.data.data.status);
    let message = res.data.message
    if(res.data.success){
      toast.success(message)
    }else{
      toast.error(message)
    }
  };

  //!At first the response are two first is for all the people in the db and then the user logged in is filtered out
  //!Then the second is where the response is the friends of the user and then the required users friends are filtered out from the all users and the remaining 
  //!Users which are not friend are listed on the newRes
  const reqq = req.filter((item)=> item.id !== user_id)
  // let h1 = console.log(ne[0]);
  
    // const nea =ne.map((value)=>(value.id)) 
    // const newRes = reqq.filter((item)=> !nea.includes(item.id))
  

  return (
    <>
      <div className="flex h-full w-full">
        <MainFriends />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-4  bg-neutral-900 w-full gap-4 sm:gap-0">
          {req &&
            reqq.map(
              (value, index) =>
                (
                  <div
                    key={index}
                    className="flex flex-col items-start border-2 border-gray-700 w-[6rem] sm:w-[10rem]   md:w-[12rem]  lg:w-[16em] h-fit rounded-lg "
                  >
                  <Link to={`/profile/${value.id}`}>
                    <div className="w-fit sm:w-full  h-[7rem] sm:h-[15rem] lg:h-[20rem] rounded-t-lg ">
                      <img
                        className=" rounded-t-lg object-cover h-full  "
                        src={`http://localhost:8000/${value.image}`}
                      ></img>
                    </div>
                  </Link>
                    <div className="flex flex-col p-2 w-full text-white text-[10px] sm:text-sm md:text-md lg:text-lg">
                      <div className="flex flex-col">
                        <p className="font-bold ">
                          {value.user_Name}
                        </p>
                        <p>9 mutual friends</p>
                      </div>
                      {/* <div
                        className="p-2 bg-blue-600 rounded-md text-center mt-2"
                        onClick={() =>
                          acceptRequest(value.sender.id, value.receiver.id)
                        }
                      >
                        <p>Confirm</p>
                      </div> */}
                      <div
                        className="p-1 sm:p-2 bg-blue-700 rounded-md text-center mt-2 cursor-pointer text-[10px] sm:text-sm md:text-md lg:text-lg"
                        onClick={() =>
                          sendFrRequest(value.id)
                        }
                      >
                        <p className=''>Add Friend</p>
                      </div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </>
  )
}