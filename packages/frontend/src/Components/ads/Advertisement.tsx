import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Button, Form, Input } from "antd";
import postService from "../../api/postService";
import { RouteComponentProps } from "react-router-dom";
import { FormInstance } from "antd/es/form";

const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 3,
  },
};

interface RouterProps {
  id: string;
}

type AdsIdProps = RouteComponentProps<RouterProps>;

class Advertisement extends Component<AdsIdProps> {
  state = {
    editorState: EditorState.createEmpty(),
    editMode: false,
    title: "",
    adId: "",
  };

  #formRef = React.createRef<FormInstance>();

  async componentDidMount(): Promise<void> {
    if (this.props.match.params.id) {
      const adId = this.props.match.params.id;
      this.setState({ adId, editMode: true });

      const ad = await postService.getById(adId);
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(ad.body))
        ),
      });

      this.#formRef.current.setFieldsValue({
        title: ad.title,
        contacts: ad.contacts,
      });
    }
  }

  #onEditorStateChange = (editorState: EditorState): void => {
    this.setState({
      editorState,
    });
  };

  #onFinish = async ({
    title,
    contacts,
  }: {
    title: string;
    contacts: string;
  }): Promise<void> => {
    // const adBody = this.state.editorState;

    if (this.state.editMode) {
      await postService.editPost({
        id: this.state.adId,
        title,
        contacts,
        body: JSON.stringify(
          convertToRaw(this.state.editorState.getCurrentContent())
        ),
      });
    } else {
      await postService.newPost({
        id: null,
        title,
        contacts,
        body: JSON.stringify(
          convertToRaw(this.state.editorState.getCurrentContent())
        ),
      });
    }
  };

  render(): React.ReactElement {
    return (
      <Form
        name="add_ew_post"
        ref={this.#formRef}
        initialValues={{ title: this.state.title, password: "root" }}
        onFinish={this.#onFinish}
      >
        <Form.Item
          name="title"
          rules={[
            { required: true, message: "Пожалуйста введите тему объявления" },
          ]}
        >
          <Input
            name="title"
            placeholder="Продам гараж"
            value={this.state.title}
            onChange={this.#handleChangeTitle}
          />
        </Form.Item>
        <Editor
          editorStyle={{ border: "dotted", minHeight: "600px" }}
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.#onEditorStateChange}
        />
        <Form.Item
          name="contacts"
          rules={[
            {
              required: true,
              message: "Пожалуйста введите как свами связаться",
            },
          ]}
        >
          <Input
            name="contacts"
            placeholder="Неизвестная черепаха,  живущая на острове"
            value={this.state.title}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Подать
          </Button>

          <Button
            type="dashed"
            htmlType="button"
            className="login-form-button"
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            Закрыть
          </Button>
        </Form.Item>
      </Form>
    );
  }

  #handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ title: e.target.value });
  };
}

export default Advertisement;
