import React, { Component } from "react";
import { Modal } from "antd";
import { Input } from "antd";
import postService from "../../api/postService";

const { TextArea } = Input;

type PropsType = {
  visible: boolean;
  postId: string;
  handleOk: () => void;
  handleCancel: () => void;
};

class Comment extends Component<PropsType> {
  state = {
    commentText: "",
  };

  #handleOk = async (): Promise<void> => {
    const rez = await postService.addComment({
      postId: this.props.postId,
      commentText: this.state.commentText,
    });

    if (rez === 201) {
      this.props.handleOk();
    } else {
      //somthing wrong
    }
  };

  #onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({ commentText: e.target.value });
  };

  render(): React.ReactElement {
    return (
      <Modal
        title="Добавить комментарий"
        visible={this.props.visible}
        onOk={this.#handleOk}
        onCancel={this.props.handleCancel}
      >
        <TextArea
          showCount
          maxLength={100}
          onChange={this.#onChange}
          value={this.state.commentText}
        />
      </Modal>
    );
  }
}

export default Comment;
