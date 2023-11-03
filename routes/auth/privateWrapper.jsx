import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"


export  const PrivateWrapper=({children})=>{

    const user = useSelector((state)=>state.user.id)
    // const navigate = useNavigate()
        if(!user){
           return <Navigate to={'/login'}/>
        }

    return(
      <div>
        {children}
      </div>


    )
}