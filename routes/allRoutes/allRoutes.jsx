import { authRoutes } from "../auth/authRoutes";
import { pageRoutes } from "../pages/pageRoutes";

export const allRoutes =[...pageRoutes,...authRoutes]