import React, { Component } from "react";
import { Avatar, Button, Col, Row, Tooltip } from "antd";
import { Header } from "antd/es/layout/layout";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
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
              <Tooltip title="Вход" color="geekblue">
                <Button
                  icon={<LoginOutlined />}
                  onClick={() => {
                    this.props.history.push("/login");
                  }}
                />
              </Tooltip>
              <Tooltip title="Регистрация" color="geekblue">
                <Button
                  icon={<ProfileOutlined />}
                  onClick={() => {
                    this.props.history.push("/register");
                  }}
                />
              </Tooltip>
            </Col>
          ) : (
            <Col flex="100px">
              <Tooltip title="Выход" color="geekblue">
                <Button icon={<LogoutOutlined />} onClick={this.props.logout} />
              </Tooltip>
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
