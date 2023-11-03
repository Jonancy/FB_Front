import AddFriends from "../../features/home/friends/addFriends";
import AllFriends from "../../features/home/friends/allFriends";
import MainFriends from "../../features/home/friends/mainFriends";
import ReceiverFriends from "../../features/home/friends/receiverFriends";
import SenderFriends from "../../features/home/friends/senderFriends";
import senderFriends from "../../features/home/friends/senderFriends";
import UserProfile from "../../features/profile/userProfile";
import userProfile from "../../features/profile/userProfile";
import Home from "../../pages/main/home";

export const pageRoutes = [
  {
    id: "home",
    path: "/",
    element: Home,
    hasLayout: true,
    requiredAuth: true,
    isProfleAuth: false,
  },
  {
    id: "profile",
    path: "/profile/:id",
    element: UserProfile,
    hasLayout: true,
    requiredAuth: true,
    isProfleAuth: true,
  },
  {
    id: "friends",
    path: "/friends",
    element: AllFriends,
    hasLayout: true,
    requiredAuth: true,
    isProfleAuth: true,
  },
  {
    id: "addFriends",
    path: "/friends/addFriends",
    element: AddFriends,
    hasLayout: true,
    requiredAuth: true,
    isProfleAuth: true,
  },
  {
    id: "receiver",
    path: "/friends/receiver",
    element: ReceiverFriends,
    hasLayout: true,
    requiredAuth: true,
    isProfleAuth: true,
  },
  {
    id: "sender",
    path: "/friends/sender",
    element: SenderFriends,
    hasLayout: true,
    requiredAuth: true,
    isProfleAuth: true,
  },

];
