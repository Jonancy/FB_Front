import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtVerification, userLogin } from "../../services/auth/userAuth";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/slice/userSlice";
import Luffy from "../../assets/luffy.jpg";


export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const name = useSelector((state)=>state.user.userName)
  // console.log(name);

  const onChang = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const sumbitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await userLogin(user);
      console.log(res.data);

      if (res.data.success) {
        const jwt = res.data.data.jwt;
        const resposne = await jwtVerification(jwt);
        console.log(resposne.data);
        if (resposne.data.success) {
          Swal.fire({
            icon: "success",
            text: resposne.data.message,
            timer: 2000,
          });
          console.log(resposne.data.data.name);
          const userName = resposne.data.data.name;
          const image = resposne.data.data.image;
          const role = resposne.data.data.role;
          const id = resposne.data.data.id;
          const jwt = resposne.data.data.jwt;
          console.log(jwt);

          dispatch(
            setData({ userName: userName, image: image, role: role, id: id, jwt:jwt})
          );
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            text: resposne.data.message,
            timer: 2000,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          text: res.data.message,
          timer: 2000,
        });
      }
      // if(res.data.success){
      //   Swal.fire({
      //     title:'success',
      //     text:''
      //   })
      // }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="relative ">
        <img className="w-screen h-screen object-cover" src={Luffy}></img>
        <div className="absolute inset-0 flex items-center justify-center">
          <form
            className="border-2 border-black bg-white opacity-50"
            onSubmit={(e) => sumbitLogin(e)}
          >
            <div className="flex flex-col items-center m-8 md:m-16 ">
              <p className="text-4xl font-bold text-blue-400">LOGIN</p>
              <div className="flex flex-col p-2">
                <input
                  className="p-2 m-2 pr-10  outline-none border-2 border-black rounded-[10px]"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => onChang(e)}
                ></input>
                <input
                  className="p-2 m-2 outline-none  border-2 border-black rounded-[10px]"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => onChang(e)}
                ></input>
              </div>
              <button className="bg-blue-700 p-2 cursor-pointer" type="sumbit">
                <p>Login</p>
              </button>
              <div className="flex pt-2">
                <p>If not logged in?</p>
                <p
                  className="text-blue-800 pl-1 pr-1 cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  register
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
