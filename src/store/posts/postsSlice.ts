/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

interface GetPostsSkipSliceState {
    skip: number;
    limit: number;
    newPost:boolean;
}

const initialState = (): GetPostsSkipSliceState => {
  const state: GetPostsSkipSliceState = {
    skip:0,
    limit:10,
    newPost:true
}
  return state;
};

export const postSlice = createSlice({
  name: "getPosts",
  initialState,
  reducers: {
    skipValue: (state,action) => {
      state.skip = action.payload.skip;
    },
    changeNewPost : (state,action)=>{
      state.newPost = !state.newPost;
    }
  },
});

// Action creator are generated for each case reducer function
export const { skipValue, changeNewPost} =
  postSlice.actions;
