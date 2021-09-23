import React from "react";
import { Button, Form, Input } from "antd";

const { TextArea } = Input;

type PropsType = {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
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
            Add Comment
          </Button>
        </Form.Item>
      </>
    );
  }
}

export default Editor;
