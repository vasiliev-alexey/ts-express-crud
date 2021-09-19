import { Button, Card, Pagination, Spin, Tooltip, Alert, Layout } from "antd";
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

const { Content, Footer } = Layout;

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
    isLoading: true,
    showAddComment: false,
    showListComment: false,
    data: [] as record[],
    commentText: "",
    currentPostId: "",
    comments: [] as CommentType[],
    totalPosts: 0,
  };

  async componentDidMount() {
    const { total } = await postService.getPostsInfo();

    this.setState({ totalPosts: total });

    await this.#getPageData(1, 3);
    this.setState({ isLoading: false });
  }

  #getPageData = async (page: number, pageSize: number): Promise<void> => {
    const data = await postService.getPosts((page - 1) * pageSize, pageSize);
    this.setState({ data: data });
  };

  render() {
    const contVh = 85;

    if (this.state.isLoading) {
      return (
        <div data-testid={"spin-wait-data-id"}>
          <Spin tip="Уже загружаю...">
            <Alert
              message="Рассказал бы анекдот, но забыл"
              description="Пожалуйста, наберитесь терпения"
              type="info"
            />
          </Spin>
        </div>
      );
    }

    return (
      <Layout style={{ height: `${contVh}vh` }}>
        <Footer></Footer>
        <Content>
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
                  this.props.isAuthenticated && (
                    <>
                      {this.props.currentUserName === rec.userName && (
                        <Tooltip title="Редактировать" color="cyan">
                          <Button
                            data-testid={"modal-btn-edit-data-id"}
                            onClick={() => {
                              this.props.history.push(`/editAd/${rec._id}`);
                            }}
                            type="primary"
                            icon={<EditOutlined />}
                          ></Button>
                        </Tooltip>
                      )}
                      <Tooltip title="Добавить комментарий" color="green">
                        <Button
                          data-testid={"modal-btn-add-comment-data-id"}
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
                            data-testid={"modal-btn-list-comment-data-id"}
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
                style={{ width: "100%" }}
                hoverable
              >
                <p>Автор: {rec.userName}</p>
                <p>{d}</p>
                <p>Контакты: {rec.contacts}</p>
              </Card>
            );
          })}
        </Content>

        <Footer style={{ textAlign: "center" }}>
          {this.state.totalPosts > 0 && (
            <Pagination
              defaultCurrent={1}
              total={this.state.totalPosts}
              defaultPageSize={3}
              onChange={this.#getPageData}
            />
          )}
        </Footer>

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
      </Layout>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUserName: state.auth.userName,
});

export default connect(mapStateToProps, {})(withRouter(AdsList));
