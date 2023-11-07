import Error404 from "../../components/error/error404";


export const errorRoutes = [
    {
        id: 'error404',
        path: "*",
        element: Error404, 
        hasLayout: true,
        requiredAuth:true,
        isProfleAuth:false
      },
]