import React from 'react';
import userPlaceholder from '../../assets/user.png';

export default function Profile(props) {
  // Check if props.image is undefined or an empty string
  // const hasImage = props.image !== null || props.image !== '' || props.image !== undefined ;

  return (
    <div className='w-11 h-11 rounded-full'>
      {props.image !== null || props.image !== undefined ? (
        <img
          className='object-cover w-full h-full rounded-full'
          src={props.image}
          alt='User Profile'
          // onError={(e) => {
          //   e.target.src = userPlaceholder; // Replace with a placeholder image
          // }}
        />
      ) : (
        <img
          className='object-cover w-full h-full rounded-full'
          src={userPlaceholder} 
        />
      )}
    </div>
  );
}
