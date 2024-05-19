import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (SignupInput) => {
    try {
      const res = await axios.post(BASE_URL + "user/signup", SignupInput);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err) throw Error(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "",
    message: "",
    token: null,
  },

  reducers: {
    tokenLoader: (state, payload) => {
      state.token = payload;
    },
  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      state.status = "sending...";
    },
    [signupUser.fulfilled]: (state) => {
      state.status = "successfully singed up ";

      setTimeout(() => {
        state.status = "";
      }, 1500);
    },
    [signupUser.rejected]: (state, payload) => {
      state.status = "failed";
      state.message = payload.error.message;
    },
  },
});

export const { tokenLoader } = userSlice.actions;
export default userSlice.reducer;
