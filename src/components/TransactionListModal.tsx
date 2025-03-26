import { Card, Table } from "antd";
import dayjs from "dayjs";

import { Payout } from "../models/Payout.model";
import React from "react";
type TransactionListModalType = {
  item: Payout;
};
const TransactionListModal: React.FC<TransactionListModalType> = ({ item }) => {
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "_id",
      key: "_id",
      align: "center" as const,
      
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center" as const,
      render: (balance : number) =>{
        return <div>
          {`$${balance}`}
        </div>
      }
    },
    {
      title: "Price paid",
      dataIndex: "price_paid",
      key: "price_paid",
      align: "center" as const,
      render: (balance : number) =>{
        return <div>
          {`$${balance}`}
        </div>
      }
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      align: "center" as const,
      render: (balance : number) =>{
        return <div>
          {`${balance}%`}
        </div>
      }
    },
    {
      title: "Create at",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => {
        return <div>{dayjs(created_at).format("DD/MM/YYYY HH:mm")}</div>;
      },
      align: "center" as const,
    },
  ];
  return (
    <div>
      <Card>
        <h3 className="text-2xl my-5">Transaction</h3>
        <Table
          dataSource={item.transactions}
          columns={columns}
          pagination={{
            pageSize: 5,
          }}
          rowKey={(record) => record._id}
          bordered
          style={{ borderRadius: "8px" }}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default TransactionListModal;
