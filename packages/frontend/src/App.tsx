import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { HashRouter as Router } from "react-router-dom";

import { connect } from "react-redux";
import { RootState } from "./store/store";

import "./main.css";
import { Layout } from "antd";
import Routes from "./components/Router";
import SiteHeader from "./components/Header/Header";
const { Content, Footer } = Layout;

class App extends Component<ReturnType<typeof mapStateToProps>> {
  render(): React.ReactElement {
    return (
      <>
        <Layout className="layout">
          <Router>
            <SiteHeader />
          </Router>
          <Content style={{ padding: "0 50px", minHeight: "750px" }}>
            {/*<div className="site-layout-content">Content</div>*/}
            <Router>
              <Routes />
            </Router>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Здесь могла быть ваша реклама
          </Footer>
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
