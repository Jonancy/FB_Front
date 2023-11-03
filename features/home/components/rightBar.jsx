import React, { useEffect, useState } from "react";
import Profile from "../../../components/profilePic/profile";
import { useSelector } from "react-redux";
import { checkStatusFrReq } from "../../../services/friendre/friendReq";
import { Link } from "react-router-dom";

export default function RightBar() {
  const [req, setReq] = useState([]);

  const user_id = useSelector((state) => state.user.id);
  const jwt = useSelector((state) => state.user.jwt);

  const checkReq = async () => {
    const res = await checkStatusFrReq(user_id);
    // console.log(res.data);
    setReq(res.data.data);
  };

  useEffect(() => {
    checkReq();
  }, []);

  return (
    <div className="fixed ml-[80%] w-full">
      <div className=" hidden md:flex flex-col  h-full p-2 text-white pt-6">
        <div>
          <p className="font-bold text-white text-2xl">Friends</p>
        </div>
        {req ? (
          req.map((value, index) => (

          <Link to={`profile/${value.id}`}>
            <div className="flex items-center mt-4 p-2 cursor-pointer" key={index}>
              <div className="">
                <Profile image={`http://localhost:8000/${value.image}`} />
              </div>
              <p className="font-bold ml-4 ">{value.user_Name}</p>
              {/* {value.id === user_id ? (
                <p>
                  <div className="bg-green-700 rounded-full p-2 w-[2px] h-[2px] relative -bottom-4 -right-6 border-2 border-neutral-800"></div>
                  <p className="font-bold ml-9">{value.user_Name}</p>
                </>
              ) : ( */}
              {/* )} */}
            </div>

          </Link>
          ))
        ) : (
          <div>Want to add friends?</div>
        )}
      </div>
    </div>
  );
}
