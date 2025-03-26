import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Upload,
  UploadProps,
  UploadFile,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { API_UPLOAD_FILE } from "../constants/api/upload";
import { User } from "../models/UserModel";
import ReactPlayer from "react-player";
import { handleNotify } from "../utils/handleNotify";
import { uploadPlugin } from "./UploadImageInCKE";
import { uploadCustomRequest } from "../utils/uploadCustomReuquest";

interface UserProfileFormProps {
  currentUser: User;
  onSave: (values: User) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  currentUser,
  onSave,
}) => {
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [videoFileList, setVideoFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        // avatar_url: currentUser.avatar_url
        //   ? [
        //     {
        //       uid: "-1",
        //       url: currentUser.avatar_url,
        //       name: "avatar.jpg",
        //       status: "done",
        //     },
        //   ]
        //   : [],

        name: currentUser.name || "",
        phone_number: currentUser.phone_number || "",
        bank_account_no: currentUser.bank_account_no || "",
        description: currentUser.description || "",
        email: currentUser.email || "",
        bank_name: currentUser.bank_name || "",
        bank_account_name: currentUser.bank_account_name || "",
        video_url: currentUser.video_url || "",
      });
      console.log(currentUser.video_url);

      setImageFileList(
        currentUser.avatar_url
          ? [
              {
                uid: "-1",
                url: currentUser.avatar_url,
                name: "avatar.jpg",
                status: "done",
              },
            ]
          : []
      );
    }
  }, [currentUser, form]);

  const handleImageChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setImageFileList(newFileList);

    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadedImageUrl = newFileList[0].response?.secure_url;
      form.setFieldsValue({ avatar_url: uploadedImageUrl });
      console.log("image url:", uploadedImageUrl);
    } else if (newFileList.length === 0 || newFileList[0].status === "error") {
      form.setFieldsValue({ avatar_url: "" });
    }
  };

  const handleVideoChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setVideoFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadedVideoUrl = newFileList[0].response?.secure_url;
      form.setFieldsValue({ video_url: uploadedVideoUrl });
      console.log("video url:", uploadedVideoUrl);
    } else if (newFileList.length === 0 || newFileList[0].status === "error") {
      form.setFieldsValue({ video_url: "" });
    }
  };

  const handleSubmit = () => {
    const formValues = form.getFieldsValue([
      "name",
      "avatar_url",
      "phone_number",
      "bank_account_no",
      "description",
      "email",
      "bank_name",
      "bank_account_name",
      "video_url",
    ]);

    if (!formValues.avatar_url && currentUser.avatar_url) {
      formValues.avatar_url = currentUser.avatar_url;
    }
    if (!formValues.video_url && currentUser.video_url) {
      formValues.video_url = currentUser.video_url;
    }
    console.log("form values:", formValues);
    onSave(formValues);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      layout="horizontal"
    >
      <Row gutter={16} align="middle">
        <Col span={12}>
          <Row gutter={16} align="middle">
            <Col>
              <Form.Item label="Avatar" name="avatar_url">
                <Upload
                  action={API_UPLOAD_FILE}
                  customRequest={uploadCustomRequest}
                  listType="picture-card"
                  onChange={handleImageChange}
                  fileList={imageFileList}
                  maxCount={1}
                >
                  {imageFileList.length >= 1 ? null : (
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
                      <PlusOutlined />
                      <div>Upload</div>
                    </button>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Form.Item label="Video" name="video_url">
            <Row gutter={16} align="middle">
              <Col>
                <Upload
                  action={API_UPLOAD_FILE}
                  customRequest={uploadCustomRequest}
                  listType="picture-card"
                  accept="video/*"
                  onChange={handleVideoChange}
                  fileList={videoFileList}
                  maxCount={1}
                  beforeUpload={(file) => {
                    const isSupportedFormat = [
                      "video/mp4",
                      "video/webm",
                      "video/ogg",
                      "video/mov",
                    ].includes(file.type);
                    if (!isSupportedFormat) {
                      handleNotify(
                        "File format not supported",
                        "You can only upload MP4, WebM, MOV or OGG video files!",
                        "error"
                      );
                    }
                    return isSupportedFormat || Upload.LIST_IGNORE;
                  }}
                >
                  {videoFileList.length < 1 && (
                    <button
                      style={{ border: 0, background: "none" }}
                      type="button"
                    >
                      <PlusOutlined />
                      <div>Upload</div>
                    </button>
                  )}
                </Upload>
              </Col>
              <Col>
                {videoFileList.length > 0 &&
                videoFileList[0].status === "done" &&
                form.getFieldValue("video_url") ? (
                  <ReactPlayer
                    url={form.getFieldValue("video_url")} // URL từ Cloudinary
                    width={200}
                    height={150}
                    controls
                    style={{ marginLeft: "8px" }}
                  />
                ) : (
                  currentUser.video_url && (
                    <ReactPlayer
                      url={currentUser.video_url} // URL hiện có nếu không upload video mới
                      width={200}
                      height={150}
                      controls
                      style={{ marginLeft: "8px" }}
                    />
                  )
                )}
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              {
                pattern: /^\d{10}$/,
                message: "Phone number must be contain 10 digits",
              },
            ]}
          >
            <Input
              placeholder="Phone Number"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault(); // Prevent invalid characters
                }
              }}
              onPaste={(e) => {
                const pasteData = e.clipboardData.getData("text");
                if (!/^\d+$/.test(pasteData)) {
                  e.preventDefault(); // Block pasting invalid characters
                }
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Bank Name" name="bank_name">
            <Input placeholder="Bank Name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Bank Account Name" name="bank_account_name">
            <Input placeholder="Bank Account Name" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Bank Account"
            name="bank_account_no"
            rules={[
              {
                required: true,
                message: "Please enter your bank account number",
              },
            ]}
          >
            <Input placeholder="Bank Account" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Description" name="description">
        <CKEditor
          editor={ClassicEditor}
          data={currentUser.description || ""}
          onChange={(_, editor) => {
            const data = editor.getData();
            form.setFieldsValue({ description: data });
          }}
          config={{ 
            placeholder: "Enter your description...",
            extraPlugins: [uploadPlugin]
          }}
        />
      </Form.Item>

      <div className="pt-4">
        <Button type="primary" onClick={handleSubmit} style = {{ borderRadius: "15px"}}>
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default UserProfileForm;
