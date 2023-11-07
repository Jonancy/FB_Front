import { authRoutes } from "../auth/authRoutes";
import { errorRoutes } from "../error/error.Routes";
import { pageRoutes } from "../pages/pageRoutes";

export const allRoutes =[...pageRoutes,...authRoutes,...errorRoutes]