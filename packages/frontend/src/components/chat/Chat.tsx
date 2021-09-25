import React, { Component } from "react";
import { Avatar, Comment } from "antd";
import {
  connect as websocketConnect,
  send,
} from "@giantmachines/redux-websocket";
import avaImg from "../../../public/worker.png";
import avaCustomer from "../../../public/programmer.png";
import Editor from "./Editor";
import { AppDispatch, RootState } from "../../store/store";
import { connect } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

type DispatchPropsType = ReturnType<typeof actionProps> &
  ReturnType<typeof mapStateToProps>;

class Chat extends Component<DispatchPropsType> {
  state = {
    submitting: false,
    value: "",
    chatStarted: false,
  };

  componentDidMount() {
    this.props.connect(`ws://${window.location.host}/chat`);
  }

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = (): void => {
    if (!this.state.value) {
      return;
    }
    this.setState({
      submitting: true,
      chatStarted: true,
    });

    this.props.send({ data: this.state.value });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
      });
    }, 1000);
  };

  render(): React.ReactElement {
    const operatorAvatar = (
      <Avatar src={String(avaImg)} alt="Operator avatar" />
    );
    const customerAvatar = (
      <Avatar src={String(avaCustomer)} alt="Customer Avatar" />
    );

    const messages = this.props.messages.map((msg) => {
      return (
        <Comment
          key={nanoid()}
          author={<a>Оператор</a>}
          avatar={customerAvatar}
          content={<p> {msg}</p>}
        ></Comment>
      );
    });

    return (
      <div>
        {messages}
        <Comment
          avatar={operatorAvatar}
          content={
            <Editor
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              submitting={this.state.submitting}
              value={this.state.value}
              chatStarted={this.state.chatStarted}
            />
          }
        />
      </div>
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
});
export default connect(mapStateToProps, actionProps)(Chat);
