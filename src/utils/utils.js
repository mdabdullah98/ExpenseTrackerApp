export const BASE_URL = "http://localhost:4000/";

export const token = JSON.parse(sessionStorage.getItem("token"));

export const headers = {
  headers: { Authorization: `${token}` },
};

// export const axiosRequest = async (url, reqMethod, inputdata) => {
//   let data;
//   if (reqMethod === "get") {
//     data = await axios.get(BASE_URL + url, headers);
//   } else if (reqMethod === "post") {
//     await axios.post(BASE_URL + url, inputdata);
//   } else {
//     data = await axios.delete(BASE_URL + url);
//   }

//   return data;
// };

export const PaginationNumber = (totalPage, postPerPage) => {
  let numberArr = [];
  for (let i = 1; i <= Math.ceil(totalPage / postPerPage); i++) {
    numberArr.push(i);
  }
  return numberArr;
};
