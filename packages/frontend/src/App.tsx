import React, { Component } from "react";
import { Route } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";

import { connect } from "react-redux";
import { RootState } from "./store/store";

import "./main.css";
import { Layout } from "antd";
import Routes from "./components/Router";
import SiteHeader from "./components/Header/Header";
import SiteFooter from "./Footer/SiteFooter";
const { Content } = Layout;

class App extends Component<ReturnType<typeof mapStateToProps>> {
  render(): React.ReactElement {
    return (
      <>
        <Layout className="layout">
          <Router>
            <SiteHeader />
          </Router>

          <Content className="site-layout-content">
            <Router>
              <Routes />
            </Router>
          </Content>

          <SiteFooter />
        </Layout>

        <Router>
          <Route
            exact
            path="/"
            render={() => (this.props.isAuthenticated ? <div /> : <div />)}
          />
        </Router>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(App);
