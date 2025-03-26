import { configureStore } from '@reduxjs/toolkit'
import authSlices from "../slices/authSlices"
import userSlice from '../slices/userSlice'
import reducer from '../slices/cartSlice'
import conversationSlice from "../slices/conversationSlice"


export const store = configureStore({
  reducer: {
   auth: authSlices,
   users: userSlice,
   cart: reducer,
  conversation: conversationSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch