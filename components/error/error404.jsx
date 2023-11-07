
import React from 'react'
import error404 from '../../assets/error404.jpg'

export default function Error404() {
  return (
    <>
        <div className='h-screen'>
            <img className='object-fit' src={error404}></img>
        </div>
      
    </>
  )
}
