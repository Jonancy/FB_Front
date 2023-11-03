import { http } from "../userMain";

export const getUserDetails = (id, jwt) => {
  const res = http.get(`/getUser/${id}`);
  return res;
};

export const getAllMessages=(first_id,second_id)=>{
  const res = http.get(`/getAllMessages/${first_id}/${second_id}`);
  return res
}