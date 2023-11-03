import { http } from "../userMain";

//!So for the post if there is no body then you need to pass null value to the body if not then the headers cant be accessable through it 
export const sendRequest = (first_id,second_id, jwt) => {
  const res = http.post(`/addFriend/${first_id}/${second_id}`,null, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
};


export const checkStatusFrReq=(first_id)=>{
  const res = http.get(`/checkStatus/${first_id}`)
  return res
}

export const checkFreqStatus=(first_id,second_id)=>{
  const res = http.get(`/checkFreqStatus/${first_id}/${second_id}`)
  return res
}


export const getSenderReqs=(user_id)=>{
  const res = http.get(`/getSenderRequests/${user_id}`)
  return res
}

export const getReceiverReqs=(user_id)=>{
  const res = http.get(`/getReceiversReuqests/${user_id}`)
  return res
}

export const confirmFrRequest=(sender_id,receiver_id,jwt)=>{
  const res = http.patch(`/acceptRequest/${sender_id}/${receiver_id}`,null,{
    headers:{Authorization:`Bearer ${jwt}`}
  })

  return res
}

export const rejectFrRequest=(sender_id,receiver_id,jwt)=>{
  const res = http.delete(`/rejectRequest/${sender_id}/${receiver_id}`,{
    headers:{Authorization:`Bearer ${jwt}`}
  })

  return res
}

export const unFriend=(sender_id,receiver_id,jwt)=>{
  const res = http.delete(`/unFriend/${sender_id}/${receiver_id}`,{
    headers:{Authorization:`Bearer ${jwt}`}
  })

  return res
}

export const getFreindsAdd=()=>{
  const res = http.get('/getSuggestions')
  return res
}