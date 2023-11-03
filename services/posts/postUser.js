import { http } from "../userMain";

export const userPost = (post, id, jwt) => {
  // console.log(jwt)
  const res = http.post(`/addPost/${id}/`, post, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return res;
};

export const getPost = () => {
  const res = http.get("/getPost");
  return res;
};

export const postComments = (body, user_id, post_id, jwt) => {
  const res = http.post(`/addComment/${user_id}/${post_id}`, body, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return res;
};

export const getComments = (post_id) => {
  const res = http.get(`/getComments/${post_id}`);
  return res;
};

export const deleteUserPost = (post_id, jwt) => {
  const res = http.delete(`/deletePost/${post_id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
};


//!Null is send so that the headers dosent go as the body 
export const likeUsersPost = (post_id, user_id, jwt) => {
  // console.log(post_id);
  const res = http.post(`likePost/${user_id}/${post_id}`,null,{
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
};

export const getUserLikes=()=>{
  const res = http.get('getLikedPosts')
  return res
}
