import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../services/auth/userAuth";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import Luffy from "../../assets/luffy.jpg";

export default function Register() {
  // const[user,setUser] = useState({
  //   user_Name:'',
  //   age:'',
  //   email:'',
  //   image:''

  // });

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  // const user={
  //   name,age,email,passowrd,image
  // }

  // console.log(user);

  // const onChang=(e)=>{
  //   setUser({...user,[e.target.name]: e.target.value})
  // }

  const sendUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("user_Name", name);
      formData.append("age", age);
      formData.append("email", email);
      formData.append("password", password);
      if (image) {
        formData.append("image", image);
      }
      
      const res = await userRegister(formData);
      // console.log(res.data);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          timer: 2000,
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: res.data.message,
          timer: 2000,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="relative ">
        <img className="w-screen h-screen object-cover " src={Luffy}></img>
        <div className="absolute inset-0 flex items-center justify-center">
          <form
            className="border-2 border-black bg-white opacity-50"
            onSubmit={(e) => sendUser(e)}
          >
            <div className="flex flex-col items-center m-6 md:m-16 ">
              <p className="text-4xl font-bold text-blue-400">REGISTER</p>
              <div className="flex flex-col p-2">
                <input
                  className="p-2 m-2 pr-10  outline-none border-2 border-black rounded-[10px]"
                  placeholder="Name"
                  name="user_Name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <input
                  className="p-2 m-2 pr-10  outline-none border-2 border-black rounded-[10px]"
                  placeholder="Age"
                  name="age"
                  onChange={(e) => setAge(e.target.value)}
                ></input>
                <input
                  className="p-2 m-2 pr-10  outline-none border-2 border-black rounded-[10px]"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                  className="p-2 m-2 outline-none  border-2 border-black rounded-[10px]"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <input 
                  className="ml-2"
                  type="file"
                  name="image" // Make sure the name attribute is set to "image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <button className="bg-blue-700 p-2 cursor-pointer" type="submit">
                <p>Register</p>
              </button>
              <div className="flex pt-2">
                <p>If already logged in?</p>
                <p
                  className="text-blue-800 pl-1 pr-1 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  login
                </p>
                <p>here</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
