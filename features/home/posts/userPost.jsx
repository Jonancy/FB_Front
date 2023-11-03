import React, { useState } from 'react';
import luffy from '../../../assets/luffy.jpg';
import user from "../../../assets/user.png";
import { BiHappy, BiPhotoAlbum, BiVideo } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import Profile from '../../../components/profilePic/profile';
import { userPost } from '../../../services/posts/postUser';
import { BsArrowReturnRight, BsArrowRight } from 'react-icons/bs';
import { toast } from 'react-toastify';

export default function UserPost() {
    const image = useSelector((state) => state.user.image);
    const name = useSelector((state) => state.user.userName);
    const id = useSelector((state)=> state.user.id)
    const role = useSelector((state)=>state.user.role)
    const jwt = useSelector((state)=>state.user.jwt)

    const [post, setPost] = useState('');
    const [postImage, setImage] = useState('');
    
    // Function to handle image upload
    const handleImageUpload = (e) => {
        const selectedImage = e.target.files[0];
        // Handle the selected image as needed, e.g., set it in the state
        setImage(selectedImage);
    };

    const postFb=async(e)=>{
        e.preventDefault()
        try{
            const formData = new FormData()
            formData.append('post', post)
            formData.append('role',role)
            if(postImage){
                formData.append('image',postImage)
            }
            const res = await userPost(formData, id, jwt);
            const message = res.data.message
            setPost(' ')
            // console.log(res.data);
            // console.log(jwt);
            // console.log(message);
            if(res.data.success){

                toast.success(message)
            }else{
                toast.error(message)
            }
        }catch(e){
            console.log(e);
        }
    }


    return (
        <>
            <div className='bg-neutral-800 rounded-[10px]'>
                <form className='flex flex-col p-2' onSubmit={(e)=>postFb(e)}>
                    <div className='flex border-b border-b-neutral-500 pb-2 gap-1'>
                        <div className='w-[3rem] h-[3rem]'>
                            <Profile image={`http://localhost:8000/${image}`} />
                        </div>
                        <input required='true'
                            className='outline-none rounded-[20px] pl-2 w-full bg-neutral-700 text-neutral-500 text-xl' name='post'
                            onChange={(e) => setPost(e.target.value)} value={post}
                            placeholder={`What's on your mind ${name}`}
                        />
                    </div>
                    <div className='flex justify-around mt-2'>
                        <div className='hover:bg-neutral-700 w-[9rem] rounded-[10px] flex justify-center items-center'>
                            <BiVideo className='text-4xl' />
                            <p>Live Video</p>
                        </div>
                        <label className='hover:bg-neutral-700 w-[9rem] rounded-[10px] flex justify-center items-center cursor-pointer'>
                            <BiPhotoAlbum className='text-4xl' />
                            <p>Photo</p>
                            <input
                                type="file"
                                accept="image/*"
                                name='image'
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                            />
                        </label>
                        <button className='hover:bg-neutral-700 w-[9rem] rounded-[10px] flex justify-center items-center' type='submit'>
                            <BsArrowRight className='text-4xl' />
                            <p>Post</p>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
