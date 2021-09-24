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
// import { initMessage, sendMessage } from "../../store/chatSlice";

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
    console.log("connect", window.location.host);

    this.props.send({ data: this.state.value });
    // wsService.sendActionToServer({
    //   type: "SEND_MESSAGE",
    //   payload: { data: this.state.value },
    // });

    //  this.props.sendMessage({ type: "SEND_MESSAGE", data: this.state.value });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
      });
    }, 1000);
  };

  render(): React.ReactElement {
    const operatorAvatar = (
      <Avatar
        // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        src={String(avaImg)}
        alt="Han Solo"
      />
    );
    const customerAvatar = (
      <Avatar
        // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        src={String(avaCustomer)}
        alt="Han Solo"
      />
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

    console.log("messages", messages);

    return (
      <div>
        {/*<Comment*/}
        {/*  author={<a>Оператор</a>}*/}
        {/*  avatar={customerAvatar}*/}
        {/*  content={<p>Привет = что вы хотите услышать ? </p>}*/}
        {/*></Comment>*/}
        {/*<Comment*/}
        {/*  content={<p>Привет = что вы хотите услышать ? </p>}*/}
        {/*  author={<a>Оператор</a>}*/}
        {/*  avatar={operatorAvatar}*/}
        {/*></Comment>*/}
        {/*<Comment content={<p> Есть еще вопросы ? </p>}></Comment>*/}
        {...messages}
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
    // sendMessage: sendMessage,
    // initMessage: initMessage,
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
export default connect(mapStateToProps, actionProps)(Chat);
