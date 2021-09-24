import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { registerWithNameAndPassword } from "../../../store/authSlice";
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

class Register extends Component<DispatchPropsType, StateType> {
  #onFinish = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    this.props.registerUser({
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
        name="register_login"
        className="login-form"
        data-testid={"register-form-data-id"}
        initialValues={{ username: "root", password: "root" }}
        onFinish={this.#onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
          extra={
            this.props.auth.errorMessage && (
              <p
                data-testid={"register-form-data-error-id"}
                className="register-form-data-error"
              >
                {this.props.auth.errorMessage}
              </p>
            )
          }
        >
          <Input
            name="username"
            prefix={<UserOutlined className="site-form-item-icon" />}
            data-testid={"register-form-username-data-id"}
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
            data-testid={"register-form-password-data-id"}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            data-testid={"register-form-submit-data-id"}
          >
            Register
          </Button>

          <Button type="dashed" htmlType="reset" className="login-form-button">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchThunkToProps = {
  registerUser: registerWithNameAndPassword,
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  ...mapDispatchThunkToProps,
})(Register);
