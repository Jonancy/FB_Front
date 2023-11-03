import React from "react";
import { BsPlus } from "react-icons/bs";
import UserStory from "./components/userAddStory";
import FriendsStory from "./components/friendsStory";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Stories() {
  return (
    <>
      <div>
        <div className="mt-4 flex ">
          <Swiper spaceBetween={-150} slidesPerView={4}>
            <SwiperSlide> <UserStory /></SwiperSlide> 
            <SwiperSlide><FriendsStory /> </SwiperSlide>  
            <SwiperSlide><FriendsStory /> </SwiperSlide>  
            <SwiperSlide><FriendsStory /> </SwiperSlide>  
            <SwiperSlide><FriendsStory /> </SwiperSlide>  
            <SwiperSlide><FriendsStory /> </SwiperSlide>  
          </Swiper>
        </div>
      </div>
    </>
  );
}
