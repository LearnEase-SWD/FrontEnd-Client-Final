import { Button, Col, Form, FormProps, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Session } from "../../../../models/Session.model";
import { Course } from "../../../../models/Course.model";

type SessionOptionsProps = {
  initialState?: Session;
  mode: "create" | "update";
  onFinish: FormProps["onFinish"];
  listCourses: Course[];
};

const SessionOptions: React.FC<SessionOptionsProps> = ({
  initialState,
  mode,
  onFinish,
  listCourses,
}) => {
  const [form] = Form.useForm<Partial<Session>>();

  const [tagOptions, setTagOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (mode === "update") {
      form.setFieldsValue(initialState ?? {});
    }
  }, [mode, initialState, form]);
  const handleTagsChange = (value: string[]) => {
    const uniqueOptions = Array.from(new Set(value)).map((item) => ({
      value: item,
      label: item,
    }));
    setTagOptions(uniqueOptions);
    form.setFieldsValue({ tag: value });
  };
  return (
    <div>
      <Form
        form={form}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Row justify={`space-around`} gutter={[16, 16]}>
          <Col xs={{ span: 12 }}>
            <Form.Item
              label="Session Name"
              name="name"
              rules={[{ required: true, message: "Please input session name" }]}
            >
              <Input placeholder="Session Name" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 12 }}>
            <Form.Item
              label="Position Order"
              name="position_order"
              rules={[
                { required: true, message: "Please input position order" },
              ]}
              normalize={(value) => (value ? Number(value) : value)}
            >
              <Input type="number" placeholder=" Position Order" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Course Name"
          name="course_id"
          rules={[{ required: true, message: "Please select course name" }]}
        >
          <Select
            placeholder="Select course name"
            options={listCourses.map((course: Course, index) => ({
              key: index,
              label: course.name,
              value: course._id,
            }))}
          />
        </Form.Item>
        {/* description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input description" }]}
        >
          <Input.TextArea
            showCount
            maxLength={100}
            // onChange={onChange}
            placeholder="Session description"
            style={{ height: 120, resize: "none" }}
          />
        </Form.Item>

        <Form.Item label="Tags" name="tag">
          <Select
            mode="tags"
            placeholder="Add tags"
            onChange={handleTagsChange}
            options={tagOptions}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="w-full"
            variant="solid"
            color="primary"
            htmlType="submit"
          >
            {mode === "create" ? "Create" : "Change"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SessionOptions;
