

const setLocalStorage=({userName, image,role,id,jwt})=>{
    //!The parameter contains object so while setting it to local storage you should convert it to string
    localStorage.setItem('userName', JSON.stringify(userName))
    localStorage.setItem('image', JSON.stringify(image))
    localStorage.setItem('role', JSON.stringify(role))
    localStorage.setItem('id', JSON.stringify(id))
    localStorage.setItem('jwt',JSON.stringify(jwt))

}

const getLocalStorage=()=>{
    //!Then when you want to get the item you should convert the string back to JSON
    const userName= JSON.parse(localStorage.getItem('userName'))
    const image = JSON.parse(localStorage.getItem('image'))
    const role = JSON.parse(localStorage.getItem('role'))
    const id = JSON.parse(localStorage.getItem('id'))
    const jwt = JSON.parse(localStorage.getItem('jwt'))
    return {userName,image,role,id,jwt}
}

const clearLocalStorage=()=>{
    localStorage.clear()
}

export {setLocalStorage,getLocalStorage,clearLocalStorage}