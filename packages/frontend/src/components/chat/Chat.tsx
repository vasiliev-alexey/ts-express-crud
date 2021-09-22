import React, { Component } from "react";
import { Avatar, Comment } from "antd";

import avaImg from "../../../public/worker.png";
import avaCustomer from "../../../public/programmer.png";
import moment from "moment";
import Editor from "./Editor";
import wsService from "../../api/wsService";
import { RootState } from "../../store/store";
import { connect } from "react-redux";

class Chat extends Component {
  state = {
    submitting: false,
    value: "",
  };

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = (): void => {
    wsService.sendActionToServer({
      type: "SEND_MESSAGE",
      payload: { data: this.state.value },
    });

    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [
          {
            author: "Han Solo",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
    }, 1000);
  };
  // Editor = () => (
  //   <>
  //     <Form.Item>
  //       <TextArea
  //         rows={4}
  //         onChange={this.handleChange}
  //         value={this.state.value}
  //       />
  //     </Form.Item>
  //     <Form.Item>
  //       <Button
  //         htmlType="submit"
  //         loading={this.state.submitting}
  //         onClick={this.handleSubmit}
  //         type="primary"
  //       >
  //         Add Comment
  //       </Button>
  //     </Form.Item>
  //   </>
  // );

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

    return (
      <div>
        <Comment
          author={<a>Оператор</a>}
          avatar={customerAvatar}
          content={<p>Привет = что вы хотите услышать ? </p>}
        ></Comment>
        <Comment
          content={<p>Привет = что вы хотите услышать ? </p>}
          author={<a>Оператор</a>}
          avatar={operatorAvatar}
        ></Comment>
        <Comment content={<p> Есть еще вопросы ? </p>}></Comment>

        <Comment
          avatar={operatorAvatar}
          content={
            <Editor
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              submitting={this.state.submitting}
              value={this.state.value}
            />
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  userName: state.auth.userName,
});
export default connect(mapStateToProps)(Chat);
