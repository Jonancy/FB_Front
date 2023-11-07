import React, { useEffect, useState } from "react";
import luffy from "../../../assets/luffy.jpg";
import {
  BiCross,
  BiDotsHorizontalRounded,
  BiHeart,
  BiLike,
  BiShare,
  BiX,
} from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { CgComment, CgCross } from "react-icons/cg";
import {
  deleteUserPost,
  getPost,
  getUserLikes,
  likeUsersPost,
  userPost,
} from "../../../services/posts/postUser";
import { formatDistanceToNow, parseISO } from "date-fns";
import Profile from "../../../components/profilePic/profile";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ClickPost from "./components/clickPost";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function OtherPosts() {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [popup, setPopup] = useState(false);

  const user = useSelector((state) => state.user.id);
  const jwt = useSelector((state) => state.user.jwt);

  const userPosts = async () => {
    const res = await getPost();
    setPosts(res.data.data);
  };

  const openPopup = () => {
    setPopup(!popup);
  };

  const getLiked = async () => {
    const res = await getUserLikes();
    setLikes(res.data.data);
  };

  useEffect(() => {
    userPosts();
    getLiked();
  }, []);

  const deletePost = async (post_id) => {
    const res = await deleteUserPost(post_id, jwt);
    const message = res.data.message;
    if (res.data.success) {
      toast.success(message);
      userPosts();
    } else {
      toast.error(message);
    }
  };

  const isPostLikedByUser = (post_id) => {
    return likes.some((like) => like.post_id === post_id);
  };

  const toggleLike = async (post_id) => {
    const isLiked = isPostLikedByUser(post_id);
    const res = await likeUsersPost(post_id, user, jwt);

    if (res.data.success) {
      const message = res.data.message;

      if (isLiked) {
        // If post was previously liked, remove the like
        setLikes(likes.filter((like) => like.post_id !== post_id));
      } else {
        // If post was not previously liked, add the like
        setLikes([...likes, { post_id }]);
      }

      toast.success(message);
    } else {
      toast.error(res.data.message);
    }
  };

  //!Need to fix the like button 
  return (
    <>
      {posts.map((value, index) => (
        <div className=" bg-neutral-800 rounded-[10px] mt-4" key={index}>
          <div className="flex flex-col ">
            <div className="flex justify-between pr-4 pl-4 pt-3">
              <div className="flex">
                {value.userImage ? (
                  <Profile image={`http://localhost:8000/${value.userImage}`} />
                ) : (
                  <Profile image={null} />
                )}
                <div className="flex flex-col ml-2">
                  <p className="text-white">{value.user.username}</p>
                  <p className="text-neutral-700">
                    {formatDistanceToNow(parseISO(value.createdAt))}
                  </p>
                </div>
              </div>
              {user === value.user.id && (
                <div className="flex items-center text-2xl ">
                  <BiDotsHorizontalRounded />
                  <Popup
                    trigger={
                      <button>
                        <BiX className="cursor-pointer" />
                      </button>
                    }
                    arrow={false}
                    position="left center"
                  >
                    <div className=" ">
                      <button className="" onClick={() => deletePost(value.id)}>
                        Yes
                      </button>
                      {/* <button onClick={() => close()} className="">
                        No
                      </button> */}
                    </div>
                  </Popup>
                </div>
              )}
            </div>
            <div className="text-white pr-4 pl-4 ">{value.text}</div>
            {value.postImage && (
              <div className="w-full">
                <img
                  className="w-full"
                  src={`http://localhost:8000/${value.postImage}`}
                ></img>
              </div>
            )}
            <div className="flex flex-col pt-2 ">
              <div className="flex justify-between mr-4 ml-4 border-b-2 border-b-neutral-600 pb-2 ">
                {likes.map(
                  (like) =>
                    like.id === value.id && (
                      <div className="flex items-center gap-1">
                        <BiHeart className="text-red-600" />
                        <p className="text-neutral-500">{like.length}</p>
                      </div>
                    )
                )}
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    {index && <p>{posts.length}</p>}
                    <CgComment />
                  </div>
                  <div className="flex items-center gap-1">
                    <p>12</p>
                    <BiShare />
                  </div>
                </div>
              </div>
              <div className="flex justify-around mt-2">
                {/* { //!Need to fix this or add two functions } */}
                <div
                  className={`hover:bg-neutral-700 w-[10rem] rounded-[10px] flex justify-center items-center gap-1 pt-2 pb-2`}
                  onClick={() => toggleLike(value.id)}
                >
                  {isPostLikedByUser(value.id) ? (
                    <AiFillLike className="text-2xl text-blue-800" />
                  ) : (
                    <AiFillLike className="text-2xl text-black" />
                  )}
                  <p>Like</p>
                </div>
                <Popup
                  trigger={
                    <button className=" hover:bg-neutral-700 w-[10rem] rounded-[10px] flex justify-center items-center gap-1 pt-2 pb-2">
                      <CgComment className="text-2xl" />
                      <p>Comments</p>
                    </button>
                  }
                  position={"center right "}
                  contentStyle={{ background: "transparent", border: "none" }}
                  arrow={false}
                >
                  {value.postImage ? (
                    <ClickPost
                      index={index}
                      username={value.user.username}
                      createdAt={formatDistanceToNow(parseISO(value.createdAt))}
                      user_Image={`http://localhost:8000/${value.userImage}`}
                      text={value.text}
                      postImage={`http://localhost:8000/${value.postImage}`}
                      post_id={value.id}
                    />
                  ) : (
                    <ClickPost
                      index={index}
                      username={value.user.username}
                      createdAt={formatDistanceToNow(parseISO(value.createdAt))}
                      user_Image={`http://localhost:8000/${value.userImage}`}
                      text={value.text}
                      postImage={null}
                      post_id={value.id}
                    />
                  )}
                </Popup>

                <div className=" hover:bg-neutral-700 w-[10rem] rounded-[10px] flex justify-center items-center gap-1 pt-2 pb-2">
                  <BiShare className="text-2xl" />
                  <p>Share </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
