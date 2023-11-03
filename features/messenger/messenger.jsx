import React, { useEffect, useState } from "react";
import luffy from "../../assets/luffy.jpg";
import { checkStatusFrReq } from "../../services/friendre/friendReq";
import { useSelector } from "react-redux";
import MessengerChat from "./messengerChat";
// import "./Messenger.css"; // Import a custom CSS file for styling

export default function Messenger() {
  const [reqq, setReq] = useState([]);
  const [popup, setPopup] = useState(null);

  const user_id = useSelector((state) => state.user.id);

  const checkReq = async () => {
    const res = await checkStatusFrReq(user_id);
    // console.log(res.data);
    setReq(res.data.data);
  };

  useEffect(() => {
    checkReq();
  }, []);

  const openPopupChat = (id) => {
    setPopup(id);
  };

  const closePopupChat = () => {
    setPopup(null);
  };

  return (
    <>
      {popup ? (
        <div className="rounded-md bg-neutral-800 absolute top-14 right-16 md:right-6 w-[70%] md:w-[25%]  ">
          <div className="flex flex-col p-2">
            <MessengerChat second={popup} back={closePopupChat} />
          </div>
        </div>
      ) : (
        <div className="rounded-md bg-neutral-800 absolute top-14 right-16 md:right-6 w-[70%] md:w-[25%] max-h-[500px] overflow-y-scroll  scrollbar-hidden">
          <div className="flex flex-col p-2">
            <div className="flex">
              <div className="text-2xl font-bold text-white">
                <p>Chats</p>
              </div>
            </div>
            <div className="bg-neutral-600 rounded-3xl mt-2 mb-2">
              <input
                className="rounded-3xl w-full h-full p-2 bg-neutral-600 outline-none"
                placeholder="Search"
              ></input>
            </div>
            <div className="">
              {/* If friends are added then messenger will show and then if popup has value it will open message chat if not then it will show the messenger */}
              {reqq &&
                reqq.map((value, index) => (
                  <div
                    className="flex p-2 rounded-md hover:bg-neutral-700 cursor-pointer"
                    key={index}
                    onClick={() => openPopupChat(value.id)}
                  >
                    <div className="rounded-full w-[3rem] h-[3rem] sm:w-[4rem] sm:h-[4rem]">
                      <img
                        className="rounded-full w-full h-full object-fit"
                        src={`http://localhost:8000/${value.image}`}
                        alt="Avatar"
                      ></img>
                    </div>
                    <div className="flex flex-col text-white font-bold pl-2 items-start text-start">
                      <div className="text-lg">
                        <p>{value.user_Name}</p>
                      </div>
                      <div className="truncate">
                        <p>This is a long paragraph</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
