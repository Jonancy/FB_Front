import React, { useEffect, useState } from "react";
import UserPost from "../../features/home/posts/userPost";
import OtherPosts from "../../features/home/posts/otherPosts";
import luffy from "../../assets/luffy.jpg";
import { useSelector } from "react-redux";
import { deleteUserPost, getPost, getUserLikes, likeUsersPost } from "../../services/posts/postUser";
import { formatDistanceToNow, parseISO } from "date-fns";
import { BiDotsHorizontalRounded, BiHeart, BiLike, BiShare, BiX } from "react-icons/bi";
import Popup from "reactjs-popup";
import Profile from "../profilePic/profile";
import { CgComment } from "react-icons/cg";
import ClickPost from "../../features/home/posts/components/clickPost";
import { toast } from "react-toastify";
import { checkStatusFrReq } from "../../services/friendre/friendReq";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";

export default function UserPostsMain(props) {


  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([])
  const[like,setLike] = useState([]);
  
  const mainUser = useParams();
  const user_id = mainUser.id
  
  const user = useSelector((state) => state.user.id);
  const jwt = useSelector((state) => state.user.jwt);

  const navigate = useNavigate()

  // const userPosts = async () => {
  //   const res = await getPost();
  //   setPosts(res.data.data);
  // };

  // // const userLike=()=>{
  // //   setLike(!like)
  // // }

 

  // useEffect(() => {
  //   userPosts();

  //   // const interval = setInterval(() => {
  //   //   userPosts();
  //   // }, 5000);

  //   // return () => clearInterval(interval);
  // }, []);

  const deletePost = async (post_id) => {
    const res = await deleteUserPost(post_id, jwt);
    console.log(res.data);
    const message = res.data.message;
    if (res.data.success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const postsLikedByUse=(id)=>{
    return like.some((like)=> like.post_id === id)
  }

  const getLiked = async () => {
    const res = await getUserLikes();
    setLike(res.data.data);
  };

  const likePost= async(post_id)=>{

    const likedPosts = postsLikedByUse(post_id)
    const res = await likeUsersPost(post_id,user,jwt)
    console.log(res)
    const message = res.data.message
    if(res.data.success){
        
        toast.success(message)
      if(likedPosts){
          setLike(like.filter((likes)=> likes.post_id !== post_id))
      }else{
        setLike([...like,{post_id}])
      }
      
    }else{
      toast.error(message)
    }

  }
  console.log('new',props.posts);

  const friends=async()=>{
    const res = await checkStatusFrReq(user_id)
    setUsers(res.data.data)
  }
  
  
  useEffect(()=>{
    friends()
    getLiked()
  },[user_id])



  return (
    <div className="ml-8 mr-8 pt-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full flex flex-col    h-fit">
          <div className="flex flex-col p-4 bg-neutral-800 rounded-md">
            <div className="text-white text-2xl font-bold pb-2">
              <p>Intro</p>
            </div>
            <div className="rounded-md p-2 bg-neutral-700 text-center text-white font-bold ">
              Add Bio
            </div>
            <div className="rounded-md p-2 bg-neutral-700 text-center mt-4 text-white font-bold ">
              Edit Details
            </div>
          </div>
          <div className="p-4 bg-neutral-800 rounded-md mt-4 ">
            <div className="flex text-white pb-2 justify-between">
              <div className="flex flex-col">
                <div className='text-2xl font-bold hover:border-b-2 border-b-white'>
                  <p>Friends</p>
                </div>
              {users ?
              <p>{users.length} friends</p>:
              <p>0 friends</p>
              
            }
              </div>
              <div className="h-fit p-2 text-blue-500 rounded-md cursor-pointer hover:bg-neutral-700">
                <p>See all friends</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-4">
          {users ?
           ( users.map((friends,index)=>(
            <Link to={`/profile/${friends.id}`}>
              <div className="rounded-md w-[8rem] md:w-[10rem] lg:w-[10rem] h-fit cursor-pointer" key={index} >
              <div className="h-[8rem] md:h-[10rem]">

                <img
                  className="rounded-md w-full h-full object-cover "
                  src={`http://localhost:8000/${friends.image}`}
                ></img>

              </div>
                <p className="text-xl font-bold text-white">{friends.user_Name}</p>
              </div>
            </Link>

            ))):(
              <div>
                <p className="text-2xl font-bold text-white">No friends</p>
              </div>
            )
          }
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col ">
        {props.user.id ===  user && 
        
          <UserPost />
        }
        {props.posts.map((value, index) => (
        <div className=" bg-neutral-800 rounded-[10px] mt-4" key={index}>
          <div className="flex flex-col ">
            <div className="flex justify-between pr-4 pl-4 pt-3">
              <div className="flex gap-2">
                {value.userImage ? (
                  <Profile image={`http://localhost:8000/${value.userImage}`} />
                ) : (
                  <Profile image={null} />
                )}
                <div className="flex flex-col ">
                  <p className="text-white">{props.user.user_Name}</p>
                  <p className="text-neutral-700">
                    {formatDistanceToNow(parseISO(value.createdAt))}
                  </p>
                </div>
              </div>
              {user === props.user.id && (
                <div className="flex items-center text-2xl ">
                  <BiDotsHorizontalRounded />
                  <Popup
                    trigger={
                      <button>
                        <BiX className="cursor-pointer" />
                      </button>
                    }
                    position="left center"
                    arrow={false}
                  >
                    <div className="">
                      <button className="" onClick={() => deletePost(value.id)}>
                        Yes
                      </button>
                      {/* <button onClick={()=>close()} className="float-right">No</button> */}
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
                <div className="flex items-center gap-1">
                  <BiHeart className="text-red-600" />
                  <p className="text-neutral-500">1K</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    {/* {index && <p>{posts.length}</p>} */}
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
                  onClick={() => likePost(value.id)}
                >
                  {postsLikedByUse(value.id) ? (
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
                  arrow={false}
                  position={"center right"}
                  contentStyle={{ background: "transparent", border: "none" }}
                >
                  {value.postImage ? (
                    <ClickPost
                      index={index}
                      username={props.user.user_Name}
                      createdAt={formatDistanceToNow(parseISO(value.createdAt))}
                      user_Image={`http://localhost:8000/${value.userImage}`}
                      text={value.text}
                      postImage={`http://localhost:8000/${value.postImage}`}
                      post_id={value.id}
                    />
                  ) : (
                    <ClickPost
                      index={index}
                      username={props.user.user_Name}
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
    
        </div>
      </div>
    </div>
  );
}
