import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { loginWithEmailAndPassword, logout } from "../../../store/authSlice";
import { ThunkProps } from "../../utils/types-helper";
import { Redirect } from "react-router-dom";

const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 3,
  },
};

export type DispatchPropsType = ReturnType<typeof mapStateToProps> &
  ThunkProps<typeof mapDispatchThunkToProps>;

type StateType = {
  isValid: boolean;
  loginValue: string;
  passwordValue: string;
};

class Login extends Component<DispatchPropsType, StateType> {
  #onFinish = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    if (this.props.auth.isAuthenticated) {
      this.props.logout();
    }

    this.props.loginWithEmailAndPass({
      username,
      password,
    });
  };
  render() {
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ username: "root", password: "root" }}
        onFinish={this.#onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            name="username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>

          <Button type="dashed" htmlType="submit" className="login-form-button">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchThunkToProps = {
  loginWithEmailAndPass: loginWithEmailAndPassword,
  logout: logout,
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  ...mapDispatchThunkToProps,
})(Login);
