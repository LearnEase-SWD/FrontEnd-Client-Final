import { Button, Modal } from "antd";
import BlogService from "../../../services/blog.service";
import { handleNotify } from "../../../utils/handleNotify";


interface DeleteBlogProps {
  id: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const DeleteBlog: React.FC<DeleteBlogProps> = ({ id, onSuccess, onCancel }) => {
  const handleDelete = async () => {
    try {
      const response = await BlogService.deleteBlog(id);
      if (response.success) {
        handleNotify("Blog deleted successfully", "");
        onSuccess(); // Call the success callback to refresh the blog list
        onCancel(); // Close the modal
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      handleNotify("Error deleting blog", "", "error");
    }
  };

  return (
    <Modal
      title="Confirm Deletion"
      open={true}
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleDelete} style={{ borderRadius: "15px" }}>
          Delete
        </Button>,
        ]}
    >
      <p>Are you sure you want to delete this blog?</p>
    </Modal>
  );
};

export default DeleteBlog;
