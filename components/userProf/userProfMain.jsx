import React, { useEffect, useState } from "react";
import UserTop from "./userTop";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UserPostsProfile from "./userPostsProfile";
import UserPostsMain from "./userPostsMain";
import { getUserDetails } from "../../services/client/clientDetails";


//!Note so to update the component you should use the array of dependicies which will remount when the state changes 
export default function UserProfMain() {
  const userId = useParams();
  const id = userId.id;
  const [users, setUser] = useState([]);
  const user = useSelector((state) => state.user.id);
  const jwt = useSelector((state) => state.user.jwt);
  const idd = parseInt(id);

  const getUser = async () => {
    const res = await getUserDetails(idd);
    setUser(res.data.data);
  };

  useEffect(() => {
    getUser();
  }, [idd]);

  return (
    <div>
      {users.existUser ? (
        <div className="flex">
          <div className="lg:w-1/6"></div>
          <div className="flex flex-col w-full">
            <UserTop
              image={`http://localhost:8000/${users.existUser.image}`}
              name={users.existUser.user_Name}
            />
            <UserPostsProfile />
            {users.userPosts ? (
              <UserPostsMain posts={users.userPosts}  user={users.existUser}/>
            ) : (
              <div>Loading user posts...</div>
            )}
          </div>
          <div className="lg:w-1/6"></div>
        </div>
      ) : (
        <div>Loading user data...</div>
      )}
    </div>
  );
}
