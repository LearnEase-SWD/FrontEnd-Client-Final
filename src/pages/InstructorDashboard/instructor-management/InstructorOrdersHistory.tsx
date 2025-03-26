import { useEffect, useState } from "react";
import { Button, Card, Table, Tag, Checkbox, Modal } from "antd";
import PurchaseService from "../../../services/purchase.service";
import { GetPurchases, Purchase, PurchaseStatusEnum } from "../../../models/Purchase.model"; 
import GlobalSearchUnit from "../../../components/GlobalSearchUnit";
import { statusFormatter } from "../../../utils/statusFormatter";
import { PlusCircleOutlined } from "@ant-design/icons";
import PayoutService from "../../../services/payout.service";
import { CreatePayout } from "../../../models/Payout.model";
import { handleNotify } from "../../../utils/handleNotify";
// import EmptyData from "../../../components/Empty Data/EmptyData";


const initialParams: GetPurchases = {
  searchCondition: {
    purchase_no: "",
    cart_no: "",
    course_id: "",
  },
  pageInfo: {
    pageNum: 1,
    pageSize: 5,
  },
};

const InstructorSalesHistory = () => {
  const [salesHistory, setSalesHistory] = useState<Purchase[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Purchase | null>(null); // Thêm state cho đơn hàng được chọn
  const [searchParams, setSearchParams] = useState<GetPurchases>(initialParams)
  const [totalItems, setTotalItems] = useState<number>();


  const handleSelect = (key: React.Key) => {
    const newSelectedRowKeys = selectedRowKeys.includes(key)
      ? selectedRowKeys.filter((k) => k !== key)
      : [...selectedRowKeys, key];
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleCreateOrder = async () => {

      const selectedOrders = salesHistory.filter(order =>
        selectedRowKeys.includes(order.purchase_no)
      );
  
      const transaction_ids = selectedOrders.map(order => ({
        purchase_id: order._id,
      }));
  
      const createPayout: CreatePayout = {
        instructor_id: selectedOrders[0].instructor_id,
        transactions: transaction_ids,  
      };

      console.log(createPayout)


      const response = await PayoutService.createPayout(createPayout);
      if (response.success) {
        handleNotify("Payout created!", "Your payout was created successfully")
        setSelectedRowKeys([])
        fetchSalesHistory()
      }
  };

  const handleAction = (order: Purchase) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const columns = [
      { 
        title: "Select",
        dataIndex: "select",
        key: "select",
        fixed: true,
        align: 'center' as const,
        render: (_: any, record: Purchase) => (
          <Checkbox
            checked={selectedRowKeys.includes(record.purchase_no)}
            onChange={() => handleSelect(record.purchase_no)}
            disabled={record.status !== PurchaseStatusEnum.NEW }
          />
        ),
      },
    {
      title: "Purchase Number",
      dataIndex: "purchase_no",
      key: "purchaseNumber",
      ellipsis: true,
    },
    {
      title: "Cart No",
      dataIndex: "cart_no",
      key: "CartNo",
    },
    {
      title: "Course",
      dataIndex: "course_name",
      key: "name",
      ellipsis: true, 
      render: (text:string) => (
        <span style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block' }}>
          {text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // filters: [
      //   { text: "Completed", value: "Completed" },
      //   { text: "Pending", value: "Pending" },
      //   { text: "Refunded", value: "Refunded" },
      // ],
      // onFilter: (value: any, record: any) =>
      //   record.status.trim() === value.trim(),
      render: (status: string) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === PurchaseStatusEnum.REQUEST_PAID
              ? "orange"
              : "blue" // Màu cho trạng thái khác (Refunded)
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Price Paid",
      dataIndex: "price_paid",
      key: "pricePaid",
      align: "right" as const,
      ellipsis: true,
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "studentName",
      ellipsis: true,

    },
    {
      title: "Action",
      key: "action",
      fixed: 'right' as const,
      render: (record: any) => (
        <Button type="primary" onClick={() => handleAction(record)}>
          View Details
        </Button>
      ),
    },
  ];

  const fetchSalesHistory = async () => {
    const response = await PurchaseService.getPurchasesInstructor(searchParams);
    setSalesHistory(response.data?.pageData || []);
    setTotalItems(response?.data?.pageInfo?.totalItems);
  };


  useEffect(() => {
    fetchSalesHistory();
  }, [searchParams]);

  const handleSearch = (values: Record<string, any>) => {
    console.log(values)
    setSearchParams({
      pageInfo: { ...searchParams.pageInfo, pageNum: 1  },
      searchCondition: {
        ...searchParams.searchCondition,
        purchase_no: values.keyword,
        status: values.status
      }
    });
  };

  

  


  return (
    <Card>
      <h3 className="text-2xl my-5">Orders</h3>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
      <GlobalSearchUnit 
            placeholder="Search By Course Name"
            selectFields={[
              {
                name: "status",
                options:  Object.values(PurchaseStatusEnum).map((status) => ({label: statusFormatter(status), value: status})),
                placeholder: "Filter by Status"
              }
            ]}
            onSubmit={handleSearch}
        />

        <Button
          onClick={handleCreateOrder}
          icon={<PlusCircleOutlined />}
          shape="round"
          variant="solid"
          color="primary"
          disabled={selectedRowKeys.length === 0}
          className={`${selectedRowKeys.length === 0 && "disabled"} `}
        >
          Create Payout
        </Button>
      </div>
      <Table<Purchase>
        dataSource={salesHistory}
        columns={columns}
        scroll={{ x: 'max-content' }}
        pagination={{
          pageSize: 5,
          total: totalItems, 
          current: searchParams.pageInfo.pageNum,
          onChange: (page) =>
            setSearchParams({
              ...searchParams,
              pageInfo: { ...searchParams.pageInfo, pageNum: page},
            }),
        }}
        rowKey="purchase_no"
        bordered
        style={{ borderRadius: "8px" }}
        // locale={{emptyText: <EmptyData message="No orders found" description="No orders found for the given search parameters"/>}}
      />

      {/* Modal for showing detailed information */}
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <p><strong>Purchase No:</strong> {selectedOrder.purchase_no}</p>
            <p><strong>Course Name:</strong> {selectedOrder.course_name}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Price Paid:</strong> ${selectedOrder.price_paid.toFixed(2)}</p>
            <p><strong>Student Name:</strong> {selectedOrder.student_name}</p>
            {/* Add more details here as needed */}
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default InstructorSalesHistory;