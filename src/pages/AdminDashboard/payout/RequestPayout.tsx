import {
  Card,
  Table,
  TableProps,
  Button,
  Space,
  Modal,
  Tooltip,
  Input,
} from "antd";
import { CheckOutlined, CloseOutlined, EyeFilled } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  GetPayoutRequest,
  Payout,
  PayoutStatusEnum,
  UpdateStatusPayoutRequest,
} from "../../../models/Payout.model";
import PayoutService from "../../../services/payout.service";
import { PageInfo } from "../../../models/SearchInfo.model";
import GlobalSearchUnit from "../../../components/GlobalSearchUnit";
import { handleNotify } from "../../../utils/handleNotify";
import { moneyFormatter } from "../../../utils/moneyFormatter";
const TransactionListModal = React.lazy(
  () => import("../../../components/TransactionListModal")
);

const AdminRequestPayout = () => {
  const [isOpenTransaction, setIsOpenTransaction] = useState(false);
  const [currentRequestPayout, setCurrentRequestPayout] = useState<Payout>(
    {} as Payout
  );

  const [reasonVisible, setReasonVisible] = useState(false);
  const [reason, setReason] = useState("");

  // const [loading, setLoading] = useState(false);
  const [requestPayoutList, setRequestPayoutList] = useState<Payout[]>();
  const [currentRequestPayouts, setCurrentRequestPayouts] = useState<PageInfo>(
    {} as PageInfo
  );
  const [searchRequestPayoutParam, setSearchRequestPayoutParam] =
    useState<GetPayoutRequest>({
      searchCondition: {
        payout_no: "",
        instructor_id: "",
        status: PayoutStatusEnum.REQUEST_PAYOUT,
        is_instructor: false,
        is_delete: false,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
      },
    });

  // fetch request payout
  const fetchDataRequestPayout = async () => {
    const res = await PayoutService.getPayout(searchRequestPayoutParam);
    setRequestPayoutList(res?.data?.pageData as Payout[]);
    setCurrentRequestPayouts(res?.data?.pageInfo as PageInfo);
  };
  useEffect(() => {
    fetchDataRequestPayout();
  }, [searchRequestPayoutParam]);

  const handleViewTransaction = (item: Payout) => {
    setIsOpenTransaction(true);
    setCurrentRequestPayout(item);
  };

  const handleShowReason = (record: any) => {
    setCurrentRequestPayout(record);
    setReasonVisible(true);
  };
  const columns: TableProps<Payout>["columns"] = [
    {
      title: "Payout No",
      dataIndex: "payout_no",
      key: "payout_no",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Instructor Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Total",
      dataIndex: "balance_origin",
      key: "balance_origin",
      align: "center",
      ellipsis: true,
      render: (balance: number) => {
        return <div className="text-right">{moneyFormatter(balance)}</div>;
      },
    },
    {
      title: "Commission",
      dataIndex: "balance_instructor_paid",
      key: "balance_instructor_paid",
      align: "center",
      ellipsis: true,
      render: (balance: number) => {
        return <div className="text-right">{moneyFormatter(balance)}</div>;
      },
    },
    {
      title: "Instructor Earnings",
      dataIndex: "balance_instructor_received",
      key: "balance_instructor_received",
      align: "center",
      ellipsis: true,
      render: (balance: number) => {
        return <div className="text-right">{moneyFormatter(balance)}</div>;
      },
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      ellipsis: true,
      render: (date: string) => new Date(date).toLocaleString(),
      align: "center",
    },
    {
      title: "Transactions",
      dataIndex: "view_transaction",
      key: "view_transaction",
      align: "center",
      render: (_, record: Payout) => {
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
      title: "Actions",
      key: "action",
      align: "center",
      render: (record: Payout) => (
        <Space size="middle">
          <Tooltip title="Accept">
            <Button
              type="text"
              className="text-green-600"
              icon={<CheckOutlined />}
              onClick={() =>
                handleSubmitPreview(PayoutStatusEnum.COMPLETED, record)
              }
            />
          </Tooltip>
          <Tooltip title="Reject">
            <Button
              className="text-red-600"
              type="text"
              icon={<CloseOutlined />}
              onClick={() => handleShowReason(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleSearch = (values: Record<string, any>) => {
    console.log("request payout", values);

    setSearchRequestPayoutParam((prev) => ({
      pageInfo: { ...prev.pageInfo, pageNum: 1  },
      searchCondition: {
        ...prev.searchCondition,
        payout_no: values.keyword,
      },
    }));
  };

  const handleSubmitPreview = async (
    status: PayoutStatusEnum,
    record: Payout
  ) => {
    const formPreview: UpdateStatusPayoutRequest = {
      status,
      comment: reason,
    };
    await PayoutService.updatePayoutStatus(record._id, formPreview);
    setRequestPayoutList((prevList) =>
      prevList?.filter((item) => item._id !== record._id)
    );
    handleNotify("Submit preview successfully", " ");
    setReasonVisible(false);
    console.log(formPreview);
  };

  return (
    <>
      <Card>
        <div className="flex">
          <h3 className="text-2xl my-5">Payout Management</h3>
        </div>
        <div>
          <GlobalSearchUnit
            placeholder="Search By Purchase Name"
            onSubmit={handleSearch}
          />
        </div>
        <Table
          dataSource={requestPayoutList}
          columns={columns}
          pagination={{
            current: currentRequestPayouts.pageNum,
            pageSize: currentRequestPayouts.pageSize,
            total: currentRequestPayouts.totalItems,
            onChange: (pageNum, pageSize) => {
              setSearchRequestPayoutParam((prev) => ({
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
      </Card>
      <Modal
        open={isOpenTransaction}
        width={1000}
        closable
        onCancel={() => setIsOpenTransaction(false)}
        footer={null}
      >
        <TransactionListModal item={currentRequestPayout} />
      </Modal>
      <Modal
        title="Reject Reason"
        open={reasonVisible}
        onCancel={() => setReasonVisible(false)}
        footer={[
          <Button
            color="primary"
            key="submit"
            variant="solid"
            htmlType="submit"
            style={{ borderRadius: "15px" }}
            onClick={() =>
              handleSubmitPreview(
                PayoutStatusEnum.REJECTED,
                currentRequestPayout
              )
            }
          >
            <span>Submit</span>
          </Button>,
        ]}
      >
        <Input.TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ height: "100px" }}
          placeholder="Comment here..."
        />
      </Modal>
    </>
  );
};

export default AdminRequestPayout;
