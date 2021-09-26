import React from "react";
import { Button, Form, Input } from "antd";

const { TextArea } = Input;

type PropsType = {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  chatStarted: boolean;
  submitting:
    | boolean
    | {
        delay?: number;
        handleSubmit: () => void;
      };
  handleSubmit: React.MouseEventHandler<HTMLElement>;
};

class Editor extends React.Component<PropsType> {
  render(): React.ReactElement {
    let btnLabel = this.props.chatStarted
      ? "Отправить сообщение"
      : "Начать чат";
    btnLabel = this.props.submitting ? "Отправляется" : btnLabel;

    return (
      <>
        <Form.Item>
          <TextArea
            rows={4}
            onChange={this.props.handleChange}
            value={this.props.value}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            loading={this.props.submitting}
            onClick={this.props.handleSubmit}
            type="primary"
          >
            {btnLabel}
          </Button>
        </Form.Item>
      </>
    );
  }
}

export default Editor;
