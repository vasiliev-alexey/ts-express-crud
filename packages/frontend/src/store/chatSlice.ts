import { AnyAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  messages: string[];
  incomingMessage: string;
}

const initialState = { messages: [] } as ChatState;

function isPendingAction(action: AnyAction): action is AnyAction {
  return action.type === "REDUX_WEBSOCKET::SEND";
}
function isIncomeMessage(
  action: AnyAction
): action is PayloadAction<{ message: string }> {
  return action.type === "REDUX_WEBSOCKET::MESSAGE";
}

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(isPendingAction, () => {
      //  state.messages.push(action.payload.data);
    })
    .addMatcher(isIncomeMessage, (state, action) => {
      state.messages.push(action.payload.message);
      state.incomingMessage = action.payload.message;
    });
});

export default counterReducer;
