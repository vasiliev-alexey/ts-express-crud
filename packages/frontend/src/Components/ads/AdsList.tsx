import { Button, Card, Pagination, Row, Tooltip } from "antd";
import React, { Component } from "react";
import { RootState } from "../../store/store";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import postService from "../../api/postService";
import { convertFromRaw, EditorState } from "draft-js";
import Comment from "./Comment";
import { EditOutlined, CommentOutlined, SendOutlined } from "@ant-design/icons";
import CommentList from "./CommentList";
import { CommentType } from "./types";

type DispatchPropsType = RouteComponentProps &
  ReturnType<typeof mapStateToProps>;

type record = {
  _id: string;
  title: string;
  contacts: string;
  userName: string;
  body: string;
  comments?: { username: string }[];
};

class AdsList extends Component<DispatchPropsType> {
  state = {
    isLoading: false,
    showAddComment: false,
    showListComment: false,
    data: [] as record[],
    commentText: "",
    currentPostId: "",
    comments: [] as CommentType[],
  };

  async componentDidMount() {
    const data = await postService.getPosts();

    this.setState({ isLoading: true, data: data });
  }

  render() {
    if (!this.state.isLoading) {
      return <p>wait</p>;
    }

    return (
      <>
        <Row justify="center" align="middle">
          {this.state.data.map((rec) => {
            let d = "";

            if (rec.body) {
              const draft = EditorState.createWithContent(
                convertFromRaw(JSON.parse(rec.body))
              );

              if (draft) {
                d = draft.getCurrentContent().getPlainText();
              }
            }

            return (
              <Card
                key={rec._id}
                title={rec.title}
                extra={
                  this.props.isAuthenticated &&
                  this.props.currentUserName === rec.userName && (
                    <>
                      <Tooltip title="Редактировать" color="cyan">
                        <Button
                          onClick={() => {
                            this.props.history.push(`/editAd/${rec._id}`);
                          }}
                          type="primary"
                          icon={<EditOutlined />}
                        ></Button>
                      </Tooltip>
                      <Tooltip title="Добавить комментарий" color="green">
                        <Button
                          type="ghost"
                          onClick={() =>
                            this.setState({
                              showAddComment: true,
                              currentPostId: rec._id,
                            })
                          }
                          icon={<SendOutlined />}
                        />
                      </Tooltip>

                      {rec.comments && rec.comments.length > 0 && (
                        <Tooltip title="Комментарии" color="geekblue">
                          <Button
                            type="ghost"
                            onClick={() =>
                              this.setState({
                                showListComment: true,
                                comments: rec.comments,
                              })
                            }
                            icon={<CommentOutlined />}
                          />
                        </Tooltip>
                      )}
                    </>
                  )
                }
                style={{ width: "80%" }}
                hoverable
              >
                <p>Автор: {rec.userName}</p>
                <p>{d}</p>
                <p>Контакты: {rec.contacts}</p>
              </Card>
            );
          })}
        </Row>

        <Row justify="center" align="middle">
          <Pagination defaultCurrent={1} total={50} />
        </Row>

        <Comment
          visible={this.state.showAddComment}
          postId={this.state.currentPostId}
          handleCancel={() => {
            this.setState({ showAddComment: false, commentText: null });
          }}
          handleOk={() => {
            this.setState({ showAddComment: false, commentText: null });
          }}
        ></Comment>

        <CommentList
          visible={this.state.showListComment}
          comments={this.state.comments}
          handleCancel={() => {
            this.setState({ showListComment: false, comments: [] });
          }}
          handleOk={() => {
            this.setState({ showListComment: false, comments: [] });
          }}
        ></CommentList>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUserName: state.auth.userName,
});

export default connect(mapStateToProps, {})(withRouter(AdsList));
