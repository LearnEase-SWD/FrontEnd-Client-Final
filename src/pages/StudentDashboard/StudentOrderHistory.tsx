import { useEffect, useState } from "react";
import { Card, Table, Button, Modal } from "antd";

import { GetPurchases, Purchase } from "../../models/Purchase.model";
import { PageInfo } from "../../models/SearchInfo.model";
import PurchaseService from "../../services/purchase.service";
import GlobalSearchUnit from "../../components/GlobalSearchUnit";

const initializeSearchParam: GetPurchases = {
    searchCondition: {
      purchase_no: "",
      cart_no: "",
      course_id: "",
      status: "",
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 5,
    },
 }



// Define columns for the Purchase Log table 
const StudentOrderHistory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCart, setSelectedCart] = useState<Purchase | null>(null);
  const [purchaseLogList, setPurchaseLogList] = useState<Purchase[]>([]);
  const [currentPurchase, setCurrentPurchase] = useState<PageInfo>(
    {} as PageInfo
  );
  const [purchaseLogSearchParam, setPurchaseLogSearchParam] = useState<GetPurchases>(initializeSearchParam);




  const handleSearch = (values: Record<string, any>) => {
    setPurchaseLogSearchParam((prev) => ({
      pageInfo: { ...prev.pageInfo, pageNum: 1  },
      searchCondition: {
        ...prev.searchCondition,
        purchase_no: values.keyword,
      },
    }));
  };

  const showDetails = (cart: Purchase) => {
    setSelectedCart(cart);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedCart(null);
  };


  useEffect(() => {
    const fetchData = async () => {
      const res = await PurchaseService.getPurchasesStudent(
        purchaseLogSearchParam
      );
      setPurchaseLogList(res?.data?.pageData as Purchase[]);
      setCurrentPurchase(res?.data?.pageInfo as PageInfo);
    };
    fetchData();
  }, [purchaseLogSearchParam]);

  const columns = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
      ellipsis: true,
      render: (text:string) => (
        <span style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block' }}>
          {text}
        </span>
      ),

    },
    {
      title: "Purchase No",
      dataIndex: "purchase_no",
      key: "purchase_no",
      ellipsis: true,

    },
    {
      title: "Cart No",
      dataIndex: "cart_no",
      key: "cart_no",
      ellipsis: true,

    },
    {
      title: "Learner Name",
      dataIndex: "student_name",
      key: "student_name",
      ellipsis: true,

    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      ellipsis: true,
      align: 'right' as const,
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      align: "right" as const,
      render: (discount: number) => `${discount}%`,
    },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "price_paid",
      ellipsis: true,

      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
      ellipsis: true,
      render: (text:string) => (
        <span style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block' }}>
          {text}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      ellipsis: true,

      render: (date: string) => new Date(date).toLocaleDateString(),
    },

    {
      title: "View Details",
      key: "action",
      fixed: 'right' as const,
      render: (_: any, record: Purchase) => (
        <Button type="primary" onClick={() => showDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];
  return (
    <Card>
      <h3 className="text-2xl my-5">Orders History</h3>
      <GlobalSearchUnit placeholder="Search by purchase" onSubmit={handleSearch}
      />
      <Table
        dataSource={purchaseLogList}
        columns={columns}
        pagination={{
          current: currentPurchase.pageNum,
          pageSize: currentPurchase.pageSize,
          total: currentPurchase.totalItems,
          onChange: (pageNum, pageSize) => {
            setPurchaseLogSearchParam((prev) => ({
              ...prev,
              pageInfo: { pageNum, pageSize },
            }));
          },
        }}
        rowKey={(record) => record._id}
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
      {/* Modal for showing detailed information */}
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedCart && (
          <div>
            <p>
              <strong>Course Name:</strong> {selectedCart.course_name}
            </p>
            <p>
              <strong>Purchase No:</strong> {selectedCart.purchase_no}
            </p>
            <p>
              <strong>Cart No:</strong> {selectedCart.cart_no}
            </p>
            <p>
              <strong>Price:</strong> ${selectedCart.price.toFixed(2)}
            </p>
            <p>
              <strong>Discount:</strong> {selectedCart.discount}%
            </p>
            <p>
              <strong>Price Paid:</strong> ${selectedCart.price_paid.toFixed(2)}
            </p>
            <p>
              <strong>Instructor Name:</strong> {selectedCart.instructor_name}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedCart.created_at).toLocaleDateString()}
            </p>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default StudentOrderHistory;
