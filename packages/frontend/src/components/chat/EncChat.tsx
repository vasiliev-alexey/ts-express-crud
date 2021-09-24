import React, { Component } from "react";
import {
  connect as websocketConnect,
  send,
} from "@giantmachines/redux-websocket";
import avaCustomer from "../../../public/programmer.png";
import { AppDispatch, RootState } from "../../store/store";
import { connect } from "react-redux";
import { Widget } from "react-chat-widget";
// import { initMessage, sendMessage } from "../../store/chatSlice";

type DispatchPropsType = ReturnType<typeof actionProps> &
  ReturnType<typeof mapStateToProps>;

class ClientChat extends Component<DispatchPropsType> {
  state = {
    submitting: false,
    value: "",
    chatStarted: false,
  };

  componentDidMount() {
    this.props.connect(`ws://${window.location.host}/chat`);
  }

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    console.log("ddddddddddddddddddddd");
    this.setState({
      value: e.target.value,
    });
  };

  handleNewUserMessage = (newMessage: string) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API

    this.props.send({ data: this.state.value });
  };

  render(): React.ReactElement {
    return (
      <Widget
        handleNewUserMessage={this.handleNewUserMessage}
        title="Чат с оператором"
        subtitle="Мы на связи"
        senderPlaceHolder="..."
        profileClientAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        profileAvatar={String(avaCustomer)}
        handleTextInputChange={this.handleChange}
      />
    );
  }
}

const actionProps = (dispatch: AppDispatch) => {
  return {
    connect: (url: string) => dispatch(websocketConnect(url)),
    send: (msg: Record<string, unknown>) => {
      console.log("act:", send(msg));
      dispatch(send(msg));
    },
  };
};

const mapStateToProps = (state: RootState) => ({
  userName: state.auth.userName,
  messages: state.chat.messages,
});
export default connect(mapStateToProps, actionProps)(ClientChat);
