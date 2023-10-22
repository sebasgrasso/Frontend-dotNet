/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

interface GetPostsSkipSliceState {
    skip: number;
    limit: number;
}

const initialState = (): GetPostsSkipSliceState => {
  const state: GetPostsSkipSliceState = {
    skip:0,
    limit:10
}
  return state;
};

export const postSlice = createSlice({
  name: "getPosts",
  initialState,
  reducers: {
    increaseSkip: (state,action) => {
      state.skip = action.payload.skip;
    },
  },
});

// Action creator are generated for each case reducer function
export const { increaseSkip } =
  postSlice.actions;
