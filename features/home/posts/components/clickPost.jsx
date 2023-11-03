import React from "react";
import Profile from "../../../../components/profilePic/profile";
import {
  BiDotsHorizontalRounded,
  BiHeart,
  BiLike,
  BiShare,
  BiX,
} from "react-icons/bi";
import { CgComment } from "react-icons/cg";
import luffy from "../../../../assets/luffy.jpg";
import UserPost from "../userPost";
import { formatDistanceToNow, parseISO } from "date-fns";
import UserPostComments from "../../comments/userComments";

export default function ClickPost(props) {
  return (
    <>
      <div className="bg-neutral-800 rounded-[10px]  md:w-[40rem] w-[20rem]  z-20 ">
        <div className="flex flex-col w-full ">
          <div className=" text-center border-b-2 border-b-gray-500 p-2 text-white text-2xl font-bold ">
            <p>{props.username}'s post</p>
          </div>
          <div
            className=" bg-neutral-800 rounded-[10px] mt-4"
            key={props.index}
          >
            <div className="flex flex-col ">
              <div className="flex justify-between pr-4 pl-4 pt-3">
                <div className="flex">
                {props.user_Image ?
                <Profile image={props.user_Image} />:
                <Profile image={null} />
              }
               
                  <div className="flex flex-col">
                    <p className="text-white">{props.username}</p>
                    <p className="text-neutral-700">{props.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center text-2xl ">
                  <BiDotsHorizontalRounded />
                  <BiX />
                </div>
              </div>
              <div className="text-white pr-4 pl-4 ">{props.text}</div>
              {props.postImage !== null ? (
                <div className="w-full">
                  <img
                    className="w-full h-[20rem] md:h-[35rem]"
                    src={props.postImage}
                    alt="Post Image"
                  />
                </div>
              ) : null}
              <div className="flex flex-col pt-2 ">
                <div className="flex justify-between mr-4 ml-4 border-b-2 border-b-neutral-600 pb-2 ">
                  <div className="flex items-center gap-1">
                    <BiHeart className="text-red-600" />
                    <p className="text-neutral-500">1K</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                      <p>12</p>
                      <CgComment />
                    </div>
                    <div className="flex items-center gap-1">
                      <p>12</p>
                      <BiShare />
                    </div>
                  </div>
                </div>
                <div className="flex justify-around mt-2">
                  <div className=" hover:bg-neutral-700 w-[10rem] rounded-[10px] flex justify-center items-center gap-1 pt-2 pb-2">
                    <BiLike className="text-2xl" />
                    <p>Like</p>
                  </div>
                  <div className=" hover:bg-neutral-700 w-[10rem] rounded-[10px] flex justify-center items-center gap-1 pt-2 pb-2">
                    <CgComment className="text-2xl" />
                    <p>Comments</p>
                  </div>
                  <div className=" hover:bg-neutral-700 w-[10rem] rounded-[10px] flex justify-center items-center gap-1 pt-2 pb-2">
                    <BiShare className="text-2xl" />
                    <p>Share </p>
                  </div>
                </div>
                <div className="overflow-y-scroll max-h-[20rem] scrollbar-hide">
                  <UserPostComments post_Id={props.post_id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
