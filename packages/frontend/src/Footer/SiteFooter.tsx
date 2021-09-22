import React from "react";
import { Col, Modal, Row, Tooltip, Layout } from "antd";
import { MessageFilled } from "@ant-design/icons";

import Chat from "../components/chat/Chat";
const Footer = Layout.Footer;

class SiteFooter extends React.Component {
  state = { isModalVisible: false };

  render(): React.ReactElement {
    return (
      <>
        <Footer className="site-layout-footer">
          <Row>
            <Col span={21}> Здесь могла быть ваша реклама</Col>
            <Col span={3}>
              <Tooltip title="Начать чат с оператором" color="cyan">
                <MessageFilled
                  style={{ fontSize: "64px", color: "#08c" }}
                  onClick={() => this.setState({ isModalVisible: true })}
                />
              </Tooltip>
            </Col>
          </Row>
        </Footer>

        <Modal
          className="chat-modal-dialog"
          title="Чат с оператором"
          visible={this.state.isModalVisible}
          onOk={() => this.setState({ isModalVisible: false })}
          onCancel={() => this.setState({ isModalVisible: false })}
          bodyStyle={{ height: "50vh" }}
        >
          <Chat />
        </Modal>
      </>
    );
  }
}

export default SiteFooter;
