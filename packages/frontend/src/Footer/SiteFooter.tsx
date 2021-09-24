import React from "react";
import { Col, Modal, Row, Tooltip, Layout } from "antd";
import { MessageFilled } from "@ant-design/icons";
import { addResponseMessage } from "react-chat-widget";
import Chat from "../components/chat/Chat";
import { RootState } from "../store/store";
import { connect } from "react-redux";
import ClientChat from "../components/chat/EncChat";
const Footer = Layout.Footer;

class SiteFooter extends React.Component<ReturnType<typeof mapStateToProps>> {
  state = { isModalVisible: false };

  componentDidUpdate(prevProps: Readonly<ReturnType<typeof mapStateToProps>>) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.handleNewUserMessage(
        this.props.messages[this.props.messages.length - 1]
      );
      addResponseMessage(this.props.messages[this.props.messages.length - 1]);
    }
  }

  handleNewUserMessage = (newMessage: string) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

  render(): React.ReactElement {
    return (
      <>
        <Footer className="site-layout-footer">
          <Row>
            <Col span={21}> Здесь могла быть ваша реклама</Col>
            {this.props.isAuthenticated && (
              <Col span={2}>
                <Tooltip title="Начать чат с оператором" color="cyan">
                  <MessageFilled
                    style={{ fontSize: "64px", color: "#08c" }}
                    onClick={() => this.setState({ isModalVisible: true })}
                  />
                </Tooltip>
              </Col>
            )}
            <Col span={1}>
              <ClientChat />
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
          footer={null}
        >
          <Chat />
        </Modal>
        )
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  userName: state.auth.userName,
  isAuthenticated: state.auth.isAuthenticated,
  messages: state.chat.messages,
});
export default connect(mapStateToProps)(SiteFooter);
