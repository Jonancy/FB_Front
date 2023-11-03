import React from 'react'
import Stories from '../stories/stories'
import UserPost from '../posts/userPost'
import OtherPosts from '../posts/otherPosts'

export default function MiddleMain() {
  return (
    <>
      <div className='w-full md:w-1/2  md:ml-[25%]'>
        <Stories />
        <div className=' ml-[4rem] mr-[4rem] mt-6'>
          <UserPost />
          <OtherPosts />
        </div>
      </div>
    </>
  )
}
