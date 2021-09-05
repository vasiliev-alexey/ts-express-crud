import { Button, Card, Pagination, Row } from "antd";
import React, { Component } from "react";
import { RootState } from "../../store/store";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import postService from "../../api/postService";
import { convertFromRaw, EditorState } from "draft-js";

type DispatchPropsType = RouteComponentProps &
  ReturnType<typeof mapStateToProps>;

type record = {
  _id: string;
  title: string;
  contacts: string;
  userName: string;
  body: string;
};

class AdsList extends Component<DispatchPropsType> {
  state = {
    isLoading: false,
    data: [] as record[],
  };

  async componentDidMount() {
    const data = await postService.getPosts();
    console.log(data);

    // this.props.form.setFieldsValue(data.field)

    this.setState({ isLoading: true, data: data });
  }

  render() {
    if (!this.state.isLoading) {
      console.log("wait");
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
                    <Button
                      onClick={() => {
                        this.props.history.push(`/editAd/${rec._id}`);
                      }}
                      type="primary"
                    >
                      Edit
                    </Button>
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
          <Pagination
            defaultCurrent={1}
            total={50}
            onChange={this.#pageChanged}
          />
        </Row>
      </>
    );
  }

  #pageChanged = (page: number, pageSize: number) => {
    console.log("ss", page, pageSize);
  };
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUserName: state.auth.userName,
});

export default connect(mapStateToProps, {})(withRouter(AdsList));
