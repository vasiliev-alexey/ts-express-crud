import { AnyAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  messages: string[];
  isConnected: boolean;
  incomingMessage: string;
}

const initialState = { messages: [], isConnected: false } as ChatState;

function isPendingAction(action: AnyAction): action is AnyAction {
  return action.type === "REDUX_WEBSOCKET::SEND";
}

function isSocketOpen(action: AnyAction): action is AnyAction {
  return action.type === "REDUX_WEBSOCKET::OPEN";
}
function isSocketClosed(action: AnyAction): action is AnyAction {
  return action.type === "REDUX_WEBSOCKET::CLOSE";
}

function isIncomeMessage(
  action: AnyAction
): action is PayloadAction<{ message: string; type: string }> {
  return action.type === "REDUX_WEBSOCKET::MESSAGE";
}

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(isPendingAction, () => {
      //  state.messages.push(action.payload.data);
    })
    .addMatcher(isIncomeMessage, (state, action) => {
      const data = JSON.parse(action.payload.message);

      if (data.type === "MESSAGE_FROM_SERVER") {
        state.incomingMessage = data.message;
      }

      state.messages.push(action.payload.message);
    })
    .addMatcher(isSocketOpen, (state) => {
      state.isConnected = true;
    })
    .addMatcher(isSocketClosed, (state) => {
      state.isConnected = false;
    });
});

export default counterReducer;
