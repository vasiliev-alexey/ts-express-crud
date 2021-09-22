import React, { Component } from "react";
import { Avatar, Comment, Form, Input, Button } from "antd";

import avaImg from "../../../public/worker.png";
import avaCustomer from "../../../public/programmer.png";
const { TextArea } = Input;
class Chat extends Component {
  state = {
    submitting: false,
    value: "",
  };

  handleSubmit = () => {
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
            //    datetime: moment().fromNow(),
          },
        ],
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

    // const Editor = ({ onChange, submitting, value }) => (
    //   <>
    //     <Form.Item>
    //       <TextArea rows={4} onChange={onChange} value={value} />
    //     </Form.Item>
    //     <Form.Item>
    //       <Button
    //         htmlType="submit"
    //         loading={submitting}
    //         onClick={this.handleSubmit}
    //         type="primary"
    //       >
    //         Add Comment
    //       </Button>
    //     </Form.Item>
    //   </>
    // );

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

        {/*<Comment*/}
        {/*  avatar={*/}
        {/*    <Avatar*/}
        {/*      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"*/}
        {/*      alt="Han Solo"*/}
        {/*    />*/}
        {/*  }*/}
        {/*  content={*/}
        {/*    <Editor*/}
        {/*      onChange={() => {}}*/}
        {/*      onSubmit={() => {}}*/}
        {/*      submitting={true}*/}
        {/*      value={1}*/}
        {/*    />*/}
        {/*  }*/}
        {/*/>*/}
      </div>
    );
  }
}

export default Chat;
