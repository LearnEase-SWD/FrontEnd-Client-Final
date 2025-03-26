import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CONVERSATION_SERVICE from "../../services/conversation.service";

export interface ConversationInterface {
  members: [];
  loading: boolean;
  error: boolean;
}
const initialState: ConversationInterface = {
  loading: false,
  error: false,
  members: [],
};

export const getConversationList = createAsyncThunk(
  "cart/getConversationList",
  async (id: string) => {
    const response = await CONVERSATION_SERVICE.get_conversation(id);
    return response.data as [];
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConversationList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getConversationList.fulfilled, (state, action) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (state.loading = false), (state.members = action.payload as []);
      })
      .addCase(getConversationList.rejected, (state) => {
        state.loading = false;
        state.error = false;
      });
  },
});
// export const { updateCartCount } = cartSlice.actions;
export default conversationSlice.reducer;
