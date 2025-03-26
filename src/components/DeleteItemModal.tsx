import React from "react";
import { Modal, Button } from "antd";

interface DeleteItemModalProps {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
  itemName?: string; // Tên item để hiển thị (course, session, lesson, etc.)
  itemType?: string; // Loại item (hiển thị dạng động: "category", "course", etc.)
}

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  visible,
  onCancel,
  onDelete,
  itemName,
  itemType = "item", // Giá trị mặc định nếu không truyền
}) => {
  return (
    <Modal
      title={`Confirm Delete ${
        itemType.charAt(0).toUpperCase() + itemType.slice(1)
      }`} // Đổi title theo type
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button
          key="cancel"
          onClick={onCancel}
          style={{ borderRadius: "15px" }}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          danger
          onClick={onDelete}
          style={{ borderRadius: "15px" }}
        >
          Delete
        </Button>,
      ]}
    >
      <p>
        Are you sure you want to delete {itemType}{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>{itemName}</span>?
      </p>
    </Modal>
  );
};

export default DeleteItemModal;
