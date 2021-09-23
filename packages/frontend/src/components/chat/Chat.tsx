import React, { Component } from "react";
import { Avatar, Comment } from "antd";

import avaImg from "../../../public/worker.png";
import avaCustomer from "../../../public/programmer.png";
// import moment from "moment";
import Editor from "./Editor";
// import wsService from "../../api/wsService";
import { RootState } from "../../store/store";
import { connect } from "react-redux";
import { initMessage, sendMessage } from "../../store/chatSlice";

type DispatchPropsType = typeof actionProps &
  ReturnType<typeof mapStateToProps>;

class Chat extends Component<DispatchPropsType> {
  state = {
    submitting: false,
    value: "",
    chatStarted: false,
  };

  componentDidMount() {
    this.props.initMessage();
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

    // wsService.sendActionToServer({
    //   type: "SEND_MESSAGE",
    //   payload: { data: this.state.value },
    // });

    this.props.sendMessage({ type: "SEND_MESSAGE", data: this.state.value });

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
          key={msg.messageBody}
          author={<a>Оператор</a>}
          avatar={customerAvatar}
          content={<p> {msg.messageBody}</p>}
        ></Comment>
      );
    });

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

const actionProps = {
  sendMessage: sendMessage,
  initMessage: initMessage,
};

const mapStateToProps = (state: RootState) => ({
  userName: state.auth.userName,
  messages: state.chat.messages,
});
export default connect(mapStateToProps, actionProps)(Chat);
