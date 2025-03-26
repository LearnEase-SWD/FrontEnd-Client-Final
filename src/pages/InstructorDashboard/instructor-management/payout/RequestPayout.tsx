import { Card, Table, Button, Tooltip, Modal } from "antd";
import { EyeFilled, RocketFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import PayoutService from "../../../../services/payout.service";
import {
  GetPayoutRequest,
  Payout,
  PayoutStatusEnum,
} from "../../../../models/Payout.model";
import { handleNotify } from "../../../../utils/handleNotify";
import EmptyData from "../../../../components/Empty Data/EmptyData";
import { moneyFormatter } from "../../../../utils/moneyFormatter";
import TransactionListModal from "../../../../components/TransactionListModal";

const RequestPayout = () => {
  const [newPayouts, setNewPayouts] = useState<Payout[]>([]);
  const [isOpenTransaction, setIsOpenTransaction] = useState(false);
  const [currentRequestPayout, setCurrentRequestPayout] = useState<Payout>(
    {} as Payout
  );
  const initialParams: GetPayoutRequest = {
    searchCondition: {
      payout_no: "",
      instructor_id: "",
      is_instructor: true,
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
  };

  const fetchRequestPayouts = async () => {
    const requestParams: GetPayoutRequest = {
      ...initialParams,
      searchCondition: {
        ...initialParams.searchCondition,
        status: PayoutStatusEnum.NEW,
      },
    };
    const response = await PayoutService.getPayout(requestParams);
    const payouts = response.data?.pageData || [];
    setNewPayouts(payouts);
  };

  useEffect(() => {
    fetchRequestPayouts();
  }, []);

  const handleSendToAdmin = async (payout: Payout) => {
    const params = {
      status: PayoutStatusEnum.REQUEST_PAYOUT,
      comment: "Request payout by instructor",
    };
    await PayoutService.updatePayoutStatus(payout._id, params);
    handleNotify(
      "Payout Sent For Request",
      "Payout request has been sent to admin."
    );
    fetchRequestPayouts();
  };

  const handleViewTransaction = (item: Payout) => {
    setIsOpenTransaction(true);
    setCurrentRequestPayout(item);
  };

  const columns = [
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   filters: [
    //     { text: PayoutStatusEnum.NEW, value: PayoutStatusEnum.NEW },
    //     { text: PayoutStatusEnum.REQUEST_PAYOUT, value: PayoutStatusEnum.REQUEST_PAYOUT },
    //   ],
    //   onFilter: (value: any, record: any) => record.status === value,
    //   render: (status: PayoutStatusEnum) => {
    //     const statusColors = {
    //       [PayoutStatusEnum.NEW]: "blue",
    //       [PayoutStatusEnum.REQUEST_PAYOUT]: "yellow",
    //       [PayoutStatusEnum.COMPLETED]: "green",
    //       [PayoutStatusEnum.REJECTED]: "red",
    //     };
    //     return <Tag color={statusColors[status] || "gray"}>{status}</Tag>;
    //   },
    // },
    // {
    //   title: "Transaction ID",
    //   dataIndex: "transactions",
    //   key: "transactions",
    //   render: (transactions: Transaction[]) =>
    //     transactions.map((transaction, index) => (
    //       <span key={index}>{transaction.purchase_id},</span>
    //     )),
    // },
    {
      title: "Total",
      dataIndex: "balance_origin",
      key: "balance_origin",
      ellipsis: true,
      align: "right" as const,
      render: (money: number) => moneyFormatter(money),
    },
    {
      title: "Commission",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
      ellipsis: true,
      align: "right" as const,
      render: (money: number) => moneyFormatter(money),
    },
    {
      title: "Earnings",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
      ellipsis: true,
      align: "right" as const,
      render: (money: number) => moneyFormatter(money),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      ellipsis: true,
      align: "center" as const,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Transactions",
      key: "view_transaction",
      align: "center" as const,
      fixed: "right" as const,
      render: (_: any, record: Payout) => {
        return (
          <div>
            <Tooltip title="View Details">
              <Button
                className="text-red-600"
                icon={<EyeFilled />}
                type="text"
                onClick={() => handleViewTransaction(record)}
              ></Button>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      fixed: "right" as const,
      render: (record: Payout) => (
        <Tooltip title="Send to admin for approval">
          <Button
            type="text"
            icon={<RocketFilled style={{ color: "green" }} />}
            onClick={() => handleSendToAdmin(record)}
          />
        </Tooltip>
      ),
    },
  ];

  const newPayoutsLocale = {
    emptyText: (
      <EmptyData
        description="New payouts will appear here when they're ready for processing"
        message="No new payouts to process"
      />
    ),
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">Request Payout</h3>
      <Table
        dataSource={newPayouts}
        columns={columns}
        pagination={{ pageSize: 10 }}
        tableLayout="fixed"
        rowKey="payout_no"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
        locale={newPayoutsLocale}
      />
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

export default RequestPayout;
