import React, { Component } from "react";
import {
  connect as websocketConnect,
  send,
} from "@giantmachines/redux-websocket";
import avaCustomer from "../../../public/programmer.png";
import { AppDispatch, RootState } from "../../store/store";
import { connect } from "react-redux";
import { addResponseMessage, Widget } from "react-chat-widget";

type DispatchPropsType = ReturnType<typeof actionProps> &
  ReturnType<typeof mapStateToProps>;

class ClientChat extends Component<DispatchPropsType> {
  state = {
    submitting: false,
    value: "",
    chatStarted: false,
  };

  componentDidMount() {
    const hostname = window.location.origin.replace(/^http/, "ws");
    this.props.connect(`${hostname}/chat`);
  }

  componentDidUpdate(prevProps: Readonly<ReturnType<typeof mapStateToProps>>) {
    if (prevProps.incomingMessage !== this.props.incomingMessage) {
      addResponseMessage(this.props.incomingMessage);
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({
      value: e.target.value,
    });
  };

  handleNewUserMessage = () => {
    this.props.send({ type: "MESSAGE_TO_SERVER", data: this.state.value });
  };

  render(): React.ReactElement {
    return (
      <Widget
        handleNewUserMessage={this.handleNewUserMessage}
        title="Чат с оператором"
        subtitle={this.props.isConnected ? "Мы на связи" : "Мы offline"}
        senderPlaceHolder="..."
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
      dispatch(send(msg));
    },
  };
};

const mapStateToProps = (state: RootState) => ({
  userName: state.auth.userName,
  messages: state.chat.messages,
  incomingMessage: state.chat.incomingMessage,
  isConnected: state.chat.isConnected,
});
export default connect(mapStateToProps, actionProps)(ClientChat);
