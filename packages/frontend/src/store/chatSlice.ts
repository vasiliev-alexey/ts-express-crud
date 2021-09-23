// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import io from "socket.io-client";
// import wsService from "../api/wsService";
// const socket = io();
//

//
// const initState = {
//   messages: [{ messageBody: "data" }] as MessageType[],
// };
//
// const chatSlice = createSlice({
//   name: "auth",
//   initialState: initState,
//   reducers: {
//     resetState: () => {
//       return initState;
//     },
//
//     sendMessage: (
//       state,
//       action: PayloadAction<{ data: string; type: string }>
//     ) => {
//       socket.emit(action.payload.type, action.payload.data);
//
//       return initState;
//     },
//
//     serverSync: (state, action) => {
//       state.messages.push(action.payload);
//
//       return state;
//     },
//     initMessage: (state) => {
//       console.log("init msg");
//       wsService.sendActionToServer({ type: "GET_INIT_MESSAGES", payload: {} });
//       return state;
//     },
//   },
// });
//
// export const { reducer, actions } = chatSlice;
// export const { serverSync, sendMessage, resetState, initMessage } = actions;
//
// console.log(" red ", reducer);

// noinspection DuplicatedCode

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import io from "socket.io-client";
const socket = io();

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

    sendMessage: (
      state,
      action: PayloadAction<{ data: string; type: string }>
    ) => {
      socket.emit(action.payload.type, action.payload.data);

      return initState;
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
