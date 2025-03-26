import {  useEffect, useState } from "react";
import { Card, FormProps, Table, Tag, Tooltip } from "antd";
import { GetPurchases, Purchase, PurchaseStatusEnum } from "../../models/Purchase.model";
import PurchaseService from "../../services/purchase.service";
import { PageInfo } from "../../models/SearchInfo.model";
import GlobalSearchUnit from "../../components/GlobalSearchUnit";
import { statusFormatter } from "../../utils/statusFormatter";
import { ellipsisText } from "../../utils/ellipsisText";

const statuses = Object.values(PurchaseStatusEnum);
const columns = [
  {
    title: "Purchase Number",
    dataIndex: "purchase_no",
    key: "purchase_no",
    ellipsis: true,
  },
  {
    title: "Course Name",
    dataIndex: "course_name",
    key: "course_name",
    ellipsis: true,
    render: (course_name: string) => {
      return <Tooltip title={course_name}>{ellipsisText(course_name, 50)}</Tooltip>
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag
        color={
          status === "new"
            ? "green"
            : status === "request_paid"
            ? "orange"
            : "red"
        }
      >
        {status}
      </Tag>
    ),
  },
  {
    title: "Price Paid",
    dataIndex: "price_paid",
    ellipsis: true,
    key: "price_paid",
    align: 'right' as const,
    render: (price: number) => `$${price.toFixed(2)}`,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    align: 'right' as const,
    render: (discount: number) => `${discount}%`,
  },
  {
    title: "Student Name",
    dataIndex: "student_name",
    key: "student_name",
    ellipsis: true,
  },
  {
    title: "Instructor Name",
    dataIndex: "instructor_name",
    key: "instructor_name",
    ellipsis: true,
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    ellipsis: true,
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
];

const Purchaselog = () => {

  //
  const [purchaseLogList, setPurchaseLogList] = useState<Purchase[]>([]);
  const [currentPurchase, setCurrentPurchase] = useState<PageInfo>(
    {} as PageInfo
  );
  const [purchaseLogSearchParam, setPurchaseLogSearchParam] =
    useState<GetPurchases>({
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
    });

  useEffect(() => {
    const fetchData = async () => {
      const res = await PurchaseService.getPurchases(purchaseLogSearchParam);
      setPurchaseLogList(res?.data?.pageData as Purchase[]);
      setCurrentPurchase(res?.data?.pageInfo as PageInfo);
      console.log();
    };
    fetchData();
  }, [purchaseLogSearchParam]);

  const handleSearch :FormProps["onFinish"] = (values) => {
    setPurchaseLogSearchParam((prev) => ({
      ...prev,
      searchCondition: {
        ...prev.searchCondition,
        purchase_no: values.keyword,
        status: values.status,
      },
    }));
  };

  return (
    <Card>
      <h3 className="text-2xl my-5">Purchase Log</h3>
      <GlobalSearchUnit
          placeholder="Search By Purchase Name"
          selectFields={[
            {
              name: "status",
              options: statuses.map((status) => ({ label: statusFormatter(status), value: status })),
              placeholder: "Filter by Status",
            }
          ]}
          onSubmit={handleSearch}
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
    </Card>
  );
};

export default Purchaselog;
