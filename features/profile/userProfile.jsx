import React from "react";
import { useSelector } from "react-redux";
import UserProfMain from "../../components/userProf/userProfMain";

export default function UserProfile() {

  //!So i will send the data through parameter so if the user id meets with the local storage id then i will show the profile if not then i will show the others profile 

  return (
    <div className="bg-neutral-900">
      {/* {user ? (
        <div>
          <UserProfMain id={user} />
        </div>
      ) : (
        <div>
          <UserProfMain id={12} />
        </div>
      )} */}
      <>
        <UserProfMain />
      </>
    </div>
  );
}
