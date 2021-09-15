import React, { Component } from "react";
import { Menu } from "antd";
import { RootState } from "../../store/store";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

class ToolBar extends Component<
  ReturnType<typeof mapStateToProps> & RouteComponentProps
> {
  #onClick = () => {
    this.props.history.push("/newAd");
  };

  render() {
    return (
      <Menu
        data-testid={"menu-addAdd-data-id"}
        theme="dark"
        mode="horizontal"
        onClick={this.#onClick}
      >
        {this.props.isAuthenticated && (
          <Menu.Item
            data-testid={"ToolBar-addAdd-data-id"}
            key={"add-ads"}
          >{`Подать объявление`}</Menu.Item>
        )}
      </Menu>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(withRouter(ToolBar));
