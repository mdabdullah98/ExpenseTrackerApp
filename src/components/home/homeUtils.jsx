import axios from "axios";

import { BASE_URL } from "../../utils/utils";
const getUser = async (token) => {
  try {
    if (token) {
      const { data } = await axios.get(BASE_URL + `user/getUserDeatils`, {
        headers: { Authorization: token },
      });

      //updating setuser state

      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export { getUser };
