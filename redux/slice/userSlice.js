import { clearLocalStorage, getLocalStorage, setLocalStorage } from "../../utils/localStorage/localStorage";
import {createSlice} from '@reduxjs/toolkit'

const initialState={
    userName: getLocalStorage().userName,
    image: getLocalStorage().image,
    role: getLocalStorage().role,
    id:getLocalStorage().id,
    jwt:getLocalStorage().jwt
}

const userSlice = createSlice({

    name:'user',
    initialState,
    reducers:{
        setData:(state,action)=>{

            //!Payload means the data of the parameter
            setLocalStorage({
                userName: action.payload.userName,
                image: action.payload.image,
                role: action.payload.role,
                id:action.payload.id,
                jwt:action.payload.jwt
            }) 
            // state.isAuthenticated =  true,

            //!This one is to set the value for the redux
            state.userName = action.payload.userName
            state.image = action.payload.image
            state.role = action.payload.role
            state.id = action.payload.id
            state.jwt = action.payload.jwt
            state.isAuthenticated = true
        },

        clearData:(state)=>{
            clearLocalStorage();
            state.userName = undefined
            state.image = undefined
            state.role = undefined
            state.id = undefined
            state.jwt = undefined
            state.isAuthenticated = false
        }
    }
})

export const{setData,clearData} = userSlice.actions

export default userSlice.reducer;