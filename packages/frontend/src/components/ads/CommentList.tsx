import React, { Component } from "react";
import { Modal } from "antd";
import { CommentType } from "./types";

type PropsType = {
  visible: boolean;
  comments: CommentType[];
  handleOk: () => void;
  handleCancel: () => void;
};

class CommentList extends Component<PropsType> {
  render(): React.ReactElement {
    const data = this.props.comments.map((comment) => {
      return (
        <p key={comment._id}>
          {comment.userName} : {comment.body}
        </p>
      );
    });

    return (
      <Modal
        data-testid={"modal-comment-list-data-id"}
        title="Комментарии к объявлению"
        visible={this.props.visible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
      >
        {data}
      </Modal>
    );
  }
}

export default CommentList;
