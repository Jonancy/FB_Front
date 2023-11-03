import React from 'react';
import Navbar from '../../components/navbar/navbar';
import LeftBar from '../../features/home/components/leftBar';
import MiddleMain from '../../features/home/components/middleMain';
import RightBar from '../../features/home/components/rightBar';

export default function Home() {
  return (
    <div className='flex bg-neutral-900 '>
      <LeftBar />
      <MiddleMain />
      <RightBar />
    </div>
  );
}
