import React, { useEffect, useState } from 'react';
import Profile from '../profilePic/profile';
import luffy from '../../assets/luffy.jpg';
import { getComments } from '../../services/posts/postUser';

export default function UserAllComments(props) {
  const[post,setPost] = useState([])

  const post_id = props.post_id

  const comments=async()=>{
    try{

      const res = await getComments(post_id)
      console.log(res.data);
      setPost(res.data.data) 
    }catch(e){
      console.log(e);
    }
  }

  //!So when user mounts this component at first the component mounts and useEffect displays the comments then
  //!The setinterval invokes the api every 5 seconds and then if the component unmounts the clearINtervalwill be returned
  useEffect(()=>{
    comments()
      //So the set interval invokes the api each 5 seconds so that the updates will be instant without reloading the page
    //   //Poll for updates every 5 seconds (adjust the interval as needed)
    // const intervalId = setInterval(() => {
    //     comments()
    // }, 5000);
    // return () => clearInterval(intervalId); // Clear the interval when the component unmounts

  },[])

  return (
    <>
      <div className=''>
      {post.map((value,index)=>(
        <div className='flex flex-col m-4 w-fit  bg-neutral-700 p-1 rounded-[10px]' key={index}>
          <div className='flex flex-col'>
            <div className='flex'>
            {value.User.user_pic ?
              <Profile image={`http://localhost:8000/${value.User.user_pic}`} />:
              <Profile image={null} 
              />
            }
              <div className='flex flex-col '>
                <p className='pl-2'>{value.User.name}</p>
                <p className='whitespace-normal pl-2'>{value.comment} </p>
              {value.commentPic && 
                <div className='w-[10rem] h-[8rem] rounded-[10px]'>
                  <img className='w-full h-full rounded-[10px]' src={`http://localhost:8000/${value.commentPic}`}></img>
                </div>
              
              }
                <div className='flex justify-around  w-[9rem]'>
                  <p>Like</p>
                  <p>Reply</p>
                  <p>{value.created_At}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
}
