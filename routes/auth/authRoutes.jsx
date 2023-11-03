import LoginMain from "../../pages/auth/login";
import RegisterMain from "../../pages/auth/register";

export const authRoutes = [
  {
    id: 'login',
    path: "/login",
    element: LoginMain, 
    hasLayout: false,
    requiredAuth:false,
    isProfleAuth:false
  },
  {
    id: 'register',
    path: "/register",
    element: RegisterMain,
    hasLayout: false,
    requiredAuth:false,
    isProfleAuth:false

  },
];
