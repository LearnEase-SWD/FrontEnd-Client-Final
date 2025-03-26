import { Col, Form, Input, Row } from "antd";

const CreateSession = () => {
  // handle submit o day

  //sau khi submit add data session vao state de get session id cho create lesson

  return (
    <div>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
      >
        <Row justify={`space-around`} gutter={[16, 16]}>
          <Col xs={{ span: 12 }}>
            <Form.Item
              label="Session Name"
              name="name"
              rules={[{ required: true, message: "Please input session name" }]}
            >
              <Input placeholder="Course Name" />
            </Form.Item>
          </Col>
          <Col xs={{ span: 12 }}>
            <Form.Item
              label="Position Order"
              name="position_order"
              rules={[
                { required: true, message: "Please input position order" },
              ]}
            >
              <Input placeholder=" Position Order" />
            </Form.Item>
          </Col>
        </Row>
        {/*  */}
        <Form.Item label="Course Id" name="course_id">
          <Input value={"Course id get dc o step 1"} disabled />
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
      </Form>
    </div>
  );
};

export default CreateSession;
