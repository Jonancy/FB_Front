import { http } from "../userMain";

export const searchName = (searchParams) => {
  const res = http.get("/searchFilter", {
    params: {
      searchParams: searchParams,
    },
  });
  return res
};
