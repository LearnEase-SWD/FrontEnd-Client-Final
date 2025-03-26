import React from "react";
import { Modal, Button } from "antd";

interface DeleteUserModalProps {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
  userName?: string;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  visible,
  onCancel,
  onDelete,
  userName,
}) => {
  return (
    <Modal
      title="Confirm Delete User"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" onClick={onDelete} style={{ borderRadius: "15px" }}>
          Delete
        </Button>,
      ]}
    >
      <p>
        Are you sure you want to delete user{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>{userName}</span>?
      </p>
    </Modal>
  );
};

export default DeleteUserModal;
