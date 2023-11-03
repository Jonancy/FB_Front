import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  getAllMessages,
  getUserDetails,
} from "../../services/client/clientDetails";
import Profile from "../../components/profilePic/profile";
import { BiPhotoAlbum } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { io } from "socket.io-client";
import isTyping from "../../assets/isTyping.gif";

export default function MessengerChat(props) {
  const [users, setUser] = useState([]);
  const first_id = useSelector((state) => state.user.id);
  const jwt = useSelector((state) => state.user.jwt);
  const [message, setMessage] = useState("");
  const [showMessages, setShowMessages] = useState([]);

  const socket = io("http://localhost:8000/");

  const second_id = props.second;

  const getUser = async () => {
    const res = await getUserDetails(second_id, jwt);
    setUser(res.data.data.existUser);
  };

  const getMessages = async () => {
    const res = await getAllMessages(first_id, second_id);
    setShowMessages(res.data.data);
  };

  useEffect(() => {
    getUser();
    // socket.emit('retrive_Message',{sender:first_id, receiver:second_id})
    getMessages();

    const receiveMessageHandler = (data) => {
      setShowMessages((prevMessages) => [data, ...prevMessages]);
    };
    socket.on("receive_Message", receiveMessageHandler);

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.off("receive_Message", receiveMessageHandler);
      socket.disconnect();
    };
  }, []);

  const submitMessage = (e) => {
    e.preventDefault();
    socket.emit("send_Message", {
      sender: { user: first_id, message },
      receiver: { user: second_id },
    });
    setMessage(" ");
  };

  return (
    <div className="flex flex-col p-2">
      <div className="flex  p-1 items-center border-b-2 border-b-gray-700">
        <BsArrowLeft className="text-2xl cursor-pointer" onClick={props.back} />
        <div className="flex ml-4 items-center ">
          <Profile image={`http://localhost:8000/${users.image}`} />
          <p className="pl-2 font-bold text-white">{users.user_Name}</p>
        </div>
      </div>
      <div className="flex flex-col overflow-y-scroll h-[400px]">
        {showMessages &&
          showMessages
            .slice()
            .sort(
              (a, b) =>
                new Date(a.timeStamp.createdAt) -
                new Date(b.timeStamp.createdAt)
            )
            .map((message, index) =>
              // Check if the user is the receiver or the sender
              (message.sender.user === first_id &&
                message.receiver.user === second_id) ||
              (message.sender.user === second_id &&
                message.receiver.user === first_id) ? (
                <div
                  key={index}
                  className={`p-2 mt-3 w-fit rounded-lg ${
                    first_id === message.sender.user
                      ? "ml-auto mr-4 bg-blue-600"
                      : "bg-neutral-600"
                  }`}
                >
                  <div>
                    <p>{message.sender.message}</p>
                  </div>
                </div>
              ) : null
            )}
      </div>
      <div className="border-t-2 border-t-gray-700 pt-2">
        <form
          className="flex items-center justify-around"
          onSubmit={(e) => submitMessage(e)}
        >
          <BiPhotoAlbum className="text-4xl" />
          <input
            className="rounded-2xl outline-none p-1"
            placeholder="Write"
            required="true"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">
            <AiOutlineArrowRight className="text-blue-700 text-2xl" />
          </button>
        </form>
      </div>
    </div>
  );
}
