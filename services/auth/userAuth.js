import { http } from "../userMain";

export const userRegister = (user) => {
  const res = http.post("/addUsers/", user);
  return res;
};

export const userLogin = (user) => {
  const res = http.post("/userLogin", user);
  return res;
};

export const jwtVerification = (jwt) => {
  const res = http.get("/userAuthen",{
    headers: { Authorization: `Bearer ${jwt}`},
  });
  return res
};
