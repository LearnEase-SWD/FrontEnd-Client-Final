import React, { useState } from "react";
import { Table, Input, Card, Tag, TableProps, Button, Modal, Tabs } from "antd";
import {
  SearchOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  Payout,
  payouts,
  PayoutStatusEnum,
} from "./monitors/course/courseList";


interface Transaction {
  transaction_id: string;
  price: number;
  discount: number;
  price_paid: number;
  purchase_id: string;
  created_at: string;
}

const PayoutManagement: React.FC = () => {
  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    useState(false);
  const [filterSelection, setFilterSelection] = useState({
    selection: "",
    search: "",
  });
  const [activeTab, setActiveTab] = useState("Request Payout"); // Default active tab
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterSelection({ ...filterSelection, [name]: value });
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleTransactionModalCancel = () => {
    setIsTransactionModalVisible(false);
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionModalVisible(true);
  };
  // Có thể thêm button để nhập --> click button --> hiển thị kết quả search
  const filteredPayouts = payouts.filter((payout) => {
    // search by Payout No
    const searchMatch = filterSelection.search
      ? payout.payout_no
          .toLowerCase()
          .includes(filterSelection.search.toLowerCase())
      : true;
    if (activeTab === "Request Payout") {
      return (
        (payout.status === PayoutStatusEnum.request_payout ||
          payout.status === PayoutStatusEnum.new) &&
        searchMatch
      );
    } else if (activeTab === "Completed") {
      return payout.status === PayoutStatusEnum.completed && searchMatch;
    } else if (activeTab === "Rejected") {
      return payout.status === PayoutStatusEnum.rejected && searchMatch;
    }
    return searchMatch;
  });

  const columns: TableProps<Payout>["columns"] = [
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_id",
      key: "instructor_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: PayoutStatusEnum.new, value: PayoutStatusEnum.new },
        {
          text: PayoutStatusEnum.request_payout,
          value: PayoutStatusEnum.request_payout,
        },
        { text: PayoutStatusEnum.completed, value: PayoutStatusEnum.completed },
        { text: PayoutStatusEnum.rejected, value: PayoutStatusEnum.rejected },
      ],
      onFilter: (value: any, record: Payout) => record.status === value,
      render: (status: PayoutStatusEnum) => {
        switch (status) {
          case PayoutStatusEnum.new:
            return <Tag color="blue">New</Tag>;
          case PayoutStatusEnum.request_payout:
            return <Tag color="yellow">Request Payout</Tag>;
          case PayoutStatusEnum.completed:
            return <Tag color="green">Completed</Tag>;
          case PayoutStatusEnum.rejected:
            return <Tag color="red">Rejected</Tag>;
          default:
            return null; // Hoặc một tag mặc định nếu cần
        }
      },
    },
    {
      title: "Balance Origin",
      dataIndex: "balance_origin",
      key: "balance_origin",
    },
    {
      title: "Balance Instructor Paid",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
    },
    {
      title: "Balance Instructor Received",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
    },
    {
      title: "Transaction",
      key: "balance_origin",
      render: () => {
        const transaction: Transaction = {
          transaction_id: "TX12345", // data test
          price: 100,
          discount: 10,
          price_paid: 90,
          purchase_id: "PUR12345",
          created_at: "2024-01-01",
        };
        return (
          <p
            className="font-medium text-blue-500 cursor-pointer hover:font-bold active:text-blue-300"
            onClick={() => handleViewTransaction(transaction)}
          >
            View
          </p>
        );
      },
    },
    {
      // Can use action with Request payout & New status only
      title: "Actions",
      key: "action",
      render: (_, record: Payout) => (
        <>
          <Button
            type="text"
            className="text-green-600"
            icon={<CheckOutlined />}
            disabled={
              record.status !== PayoutStatusEnum.request_payout &&
              record.status !== PayoutStatusEnum.new
            }
          >
            Approve
          </Button>
          <Button
            className="text-red-600"
            type="text"
            icon={<CloseOutlined />}
            disabled={
              record.status !== PayoutStatusEnum.request_payout &&
              record.status !== PayoutStatusEnum.new
            }
          >
            Reject
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <h3 className="text-2xl my-5">Payout Management</h3>
        <div className="flex flex-col justify-between mb-5 lg:flex-row">
          {/* Search */}
          <Input
            placeholder="Search by Payout number"
            prefix={<SearchOutlined />}
            className="w-full md:w-1/3 mb-2 md:mb-0"
            onChange={handleOnChange}
            name="search"
          />
        </div>

        {/* Tabs for Request Payout, Completed, Rejected */}
        <Tabs defaultActiveKey="Request Payout" onChange={handleTabChange}>
          <Tabs.TabPane tab="Request Payout" key="Request Payout">
            <Table
              dataSource={filteredPayouts}
              columns={columns}
              pagination={{ pageSize: 5 }}
              rowKey="payout_no"
              bordered
              style={{ borderRadius: "8px" }}
              scroll={{ x: true }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Completed" key="Completed">
            <Table
              dataSource={filteredPayouts}
              columns={columns}
              pagination={{ pageSize: 5 }}
              rowKey="payout_no"
              bordered
              style={{ borderRadius: "8px" }}
              scroll={{ x: true }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Rejected" key="Rejected">
            <Table
              dataSource={filteredPayouts}
              columns={columns}
              pagination={{ pageSize: 5 }}
              rowKey="payout_no"
              bordered
              style={{ borderRadius: "8px" }}
              scroll={{ x: true }}
            />
          </Tabs.TabPane>
        </Tabs>
        {/* Transaction Details Modal */}
        <Modal
          title="Transaction Details"
          open={isTransactionModalVisible}
          onCancel={handleTransactionModalCancel}
          footer={null}
          width={800} // Thêm width để không bị overflow Table
        >
          {selectedTransaction && (
            <Table
              dataSource={[
                {
                  key: "1",
                  transaction_id: selectedTransaction.transaction_id,
                  price: `$${selectedTransaction.price}`,
                  discount: `$${selectedTransaction.discount}`,
                  price_paid: `$${selectedTransaction.price_paid}`,
                  purchase_id: selectedTransaction.purchase_id,
                  created_at: selectedTransaction.created_at,
                },
              ]}
              columns={[
                {
                  title: "Transaction ID",
                  dataIndex: "transaction_id",
                  key: "transaction_id",
                },
                {
                  title: "Price",
                  dataIndex: "price",
                  key: "price",
                },
                {
                  title: "Discount",
                  dataIndex: "discount",
                  key: "discount",
                },
                {
                  title: "Price Paid",
                  dataIndex: "price_paid",
                  key: "price_paid",
                },
                {
                  title: "Purchase ID",
                  dataIndex: "purchase_id",
                  key: "purchase_id",
                },
                {
                  title: "Created At",
                  dataIndex: "created_at",
                  key: "created_at",
                },
              ]}
              pagination={false} // Disable pagination
              bordered
            />
          )}
        </Modal>
      </Card>
    </div>
  );
};

export default PayoutManagement;
