import { useEffect, useState } from "react";
import { Modal, Table, Rate, Button, Popconfirm} from "antd";
import { GetReviews, Review } from "../../../models/Review.model";
import ReviewService from "../../../services/review.service";
import { handleNotify } from "../../../utils/handleNotify";

interface ReviewModalProps {
  courseId: string;
  visible: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  courseId,
  visible,
  onClose,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (visible && courseId) {
      fetchReviews();
    }
  }, [visible, courseId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const searchParams: GetReviews = {
        searchCondition: {
          course_id: courseId,
          rating: 0,
          is_instructor: false,
          is_rating_order: false,
          is_deleted: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 100,
        },
      };
      const res = await ReviewService.getReviews(searchParams);
      const pageData = res.data?.pageData ?? [];
      setReviews(pageData);
      console.log("Review list:", pageData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await ReviewService.deleteReview(reviewId);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
      handleNotify("Success", "Review deleted successfully!", "success");
    } catch (error) {
      handleNotify(
        "Error",
        "Failed to delete review. Please try again.",
        "error"
      );
    }
  };

  const columns = [
    {
      title: "Reviewer Name",
      dataIndex: "reviewer_name",
      key: "reviewer_name",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled value={rating} />,
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, reviews: Review) => (
        <Popconfirm
          title="Are you sure you want to delete this review?"
          onConfirm={() => handleDelete(reviews._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Modal
      title="Course Reviews"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Table
        columns={columns}
        dataSource={reviews}
        pagination={{ pageSize: 5 }}
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
        loading={loading}
      />
    </Modal>
  );
};

export default ReviewModal;
