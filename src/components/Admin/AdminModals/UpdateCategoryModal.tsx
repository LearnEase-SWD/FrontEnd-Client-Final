// updateCategory.tsx
import { Modal, Form, Input, Button } from "antd";
import { FC } from "react";
import { Category } from "../../../models/Category.model";

interface EditCategoryProps {
  visible: boolean;
  onClose: () => void;
  category: Category;
  onSave: (values: Category) => void;
}

const UpdateCategory: FC<EditCategoryProps> = ({
  visible,
  onClose,
  category,
  onSave,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    values.name = values.name || "";
    values.parent_category_id = values.description || "";
    values.description = values.description || "";
    onSave(values);
    onClose();
  };

  return (
    <Modal
      title="Edit Category"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: category?.name || "",
          description: category?.description || "",
          parent_category_id: category?.parent_category_id || "",
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            { required: true, message: "Please input the category name!" },
          ]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter description" rows={3} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit" style={{ float: "right", borderRadius: "15px" }}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCategory;
