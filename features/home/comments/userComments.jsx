import React, { useState } from 'react';
// import luffy from '../../../assets/luffy.jpg';
// import user from "../../../assets/user.png";
import { BiHappy, BiPhotoAlbum, BiVideo } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { postComments, userPost } from '../../../services/posts/postUser';
import { BsArrowReturnRight, BsArrowRight } from 'react-icons/bs';
import Profile from '../../../components/profilePic/profile';
import UserAllComments from '../../../components/comments/userAllComments';
import { toast } from 'react-toastify';

export default function UserPostComments(props) {
    const image = useSelector((state) => state.user.image);
    const name = useSelector((state) => state.user.userName);
    const id = useSelector((state)=> state.user.id)
    const role = useSelector((state)=>state.user.role)
    const jwt = useSelector((state)=>state.user.jwt)
    const post_id = props.post_Id
    console.log(post_id);

    const [comment, setComment] = useState('');
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
            formData.append('comment', comment)
            formData.append('role',role)
            if(postImage){
                formData.append('image',postImage)
            }
            const res = await postComments(formData, id, post_id, jwt);
            console.log(res.data);
            const message = res.data.message
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
                <form className='flex flex-col p-2 border-b-2 border-b-neutral-500' onSubmit={(e)=>postFb(e)}>
                    <div className='flex border-b border-b-neutral-500 pb-2 gap-1'>
                    {image ?
                    <Profile image={`http://localhost:8000/${image}`} />:
                    <Profile image={null}/>
                }
                        <input required='true'
                            className='outline-none rounded-[20px] pl-2 w-full bg-neutral-700 text-neutral-500 text-xl' name='comment'
                            onChange={(e) => setComment(e.target.value)}
                            placeholder={`Comment`}
                        />
                    </div>
                    <div className='flex justify-around mt-2'>
                        
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
                <UserAllComments post_id={post_id}/>

            </div>
        </>
    );
}
