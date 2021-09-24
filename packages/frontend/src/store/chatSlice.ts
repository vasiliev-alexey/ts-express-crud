import { createSlice } from "@reduxjs/toolkit";

type MessageType = {
  messageBody: string;
};

const initState = {
  messages: [{ messageBody: "data" }] as MessageType[],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initState,
  reducers: {
    resetState: () => {
      return initState;
    },

    sendMessage: () => {
      console.log("sendMessage");
    },

    serverSync: (state, action) => {
      state.messages.push(action.payload);

      return state;
    },
    initMessage: (state) => {
      console.log("init msg");
      // wsService.sendActionToServer({ type: "GET_INIT_MESSAGES", payload: {} });
      return state;
    },
  },
  // extraReducers: (builder) => {},
});

const { reducer, actions } = chatSlice;
export const { serverSync, sendMessage, resetState, initMessage } = actions;
export default reducer;
