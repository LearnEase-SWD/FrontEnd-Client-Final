import React, { useEffect, useState } from "react";
import { Button, Card, Input, Modal, Table, TableProps, Tooltip } from "antd";
import { EyeFilled, SearchOutlined } from "@ant-design/icons";
import PayoutService from "../../../../services/payout.service"; 
import { GetPayoutRequest, Payout, PayoutStatusEnum } from "../../../../models/Payout.model"; 
import { moneyFormatter } from "../../../../utils/moneyFormatter";
import TransactionListModal from "../../../../components/TransactionListModal";

const AwaitingPayout: React.FC = () => {
  
  const [filteredPayouts, setFilteredPayouts] = useState<Payout[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isOpenTransaction, setIsOpenTransaction] = useState(false);
  const [currentRequestPayout, setCurrentRequestPayout] = useState<Payout>(
    {} as Payout
  );
  const initialParams :GetPayoutRequest= {
    searchCondition: {
      payout_no: "",
      instructor_id: "",
      status: PayoutStatusEnum.REQUEST_PAYOUT,
      is_instructor:true,
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
  };


  const handleViewTransaction = (item: Payout) => {
    setIsOpenTransaction(true);
    setCurrentRequestPayout(item);
  };

  useEffect(() => {
    const fetchPayouts = async () => {
        const response = await PayoutService.getPayout(initialParams); 
        const payouts = response.data?.pageData || [];
        setFilteredPayouts(payouts);
      }


    fetchPayouts();
  }, []);

  const columns: TableProps<Payout>["columns"] = [
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
    },
    {
      title: "Total",
      dataIndex: "balance_origin",
      key: "balance_origin",
      ellipsis: true,
      align: 'right' as const,
      render: (money: number) => moneyFormatter(money),
    },
    {
      title: "Commission",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
      ellipsis: true,
      align: 'right' as const,
      render: (money: number) => moneyFormatter(money),
    },
    {
      title: "Earnings",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
      ellipsis: true,
      align: 'right' as const,
      render: (money: number) => moneyFormatter(money),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      ellipsis: true,
      align: 'center' as const,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Transactions",
      dataIndex: "view_transaction",
      key: "view_transaction",
      align: "center" as const,
      fixed: "right" as const,
      render: (_, record: Payout) => {
        return (
          <div>
            <Tooltip title="View Details">
            <Button
              className="text-red-600"
              icon={<EyeFilled />}
              type="text"
              onClick={() => handleViewTransaction(record)}
            >
            </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <Card>
      <div className="flex">
        <h3 className="text-2xl my-5">Payout Management</h3>
      </div>
      <Input
        placeholder="Search By Payout Number"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <Table
        className="min-w-full"
        dataSource={filteredPayouts.filter((payout) => payout.payout_no.includes(searchKeyword))}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="payout_no"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />

      {/* Modal for showing detailed information */}
      <Modal
        open={isOpenTransaction}
        width={1000}
        closable
        onCancel={() => setIsOpenTransaction(false)}
        footer={null}
      >
        <TransactionListModal item={currentRequestPayout} />
      </Modal>
    </Card>
  );
};

export default AwaitingPayout;

