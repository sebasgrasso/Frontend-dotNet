import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice';
import { microbApis } from './apis/microbApis';
import { postSlice } from './posts/postsSlice';
import { instanceSlice } from './instance/instanceSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    postsSkip: postSlice.reducer,
    instance: instanceSlice.reducer,
    [microbApis.reducerPath]: microbApis.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(microbApis.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch