import React, { Component } from "react";
import { Avatar, Button, Col, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { UserOutlined } from "@ant-design/icons";
import ToolBar from "./ToolBar";
import { logout } from "../../store/authSlice";
import { ThunkProps } from "../utils/types-helper";

export class SiteHeader extends Component<
  RouteComponentProps &
    ReturnType<typeof mapStateToProps> &
    ThunkProps<typeof mapDispatchThunkToProps>
> {
  render(): React.ReactElement {
    return (
      <Header>
        <div className="logo" />

        <Row>
          <Col flex="auto">
            <ToolBar />
          </Col>
          <Col flex="50px">
            {this.props.isAuthenticated && (
              <>
                <Avatar
                  style={{
                    backgroundColor: "#87d068",
                  }}
                  icon={<UserOutlined />}
                ></Avatar>
              </>
            )}
          </Col>
          {!this.props.isAuthenticated ? (
            <Col flex="200px">
              <Button
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                SignIn
              </Button>

              <Button
                onClick={() => {
                  this.props.history.push("/register");
                }}
              >
                Register
              </Button>
            </Col>
          ) : (
            <Col flex="100px">
              <Button onClick={this.props.logout}>Logout</Button>
            </Col>
          )}
        </Row>
      </Header>
    );
  }
}
const mapDispatchThunkToProps = {
  logout: logout,
};

const mapStateToProps = (state: RootState) => ({
  userName: state.auth.userName,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { ...mapDispatchThunkToProps })(
  withRouter(SiteHeader)
);
