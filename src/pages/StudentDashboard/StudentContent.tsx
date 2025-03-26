import { Col, Divider, Row, Card, Table } from "antd";
import {
  WalletOutlined,
  DashboardOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { UserService } from "../../services/user.service";
import { User } from "../../models/UserModel";
import { CartStatusEnum, SearchCartByStatus } from "../../models/Cart.model";
import CartService from "../../services/cart.service";
import CountUp from "react-countup";
import { GetPurchases, Purchase } from "../../models/Purchase.model";
import PurchaseService from "../../services/purchase.service";
import dayjs from "dayjs";

const cardStyle = {
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  margin: "8px 0",
};

const StudentContent = () => {
  const columns = [
    {
      title: "Payout Number",
      dataIndex: "purchase_no",
      key: "purchase_no",
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
      title: "Date",
      dataIndex: "created_at", 
      key: "date",
      render: (text: string) => (dayjs(text).format("DD/MM/YYYY")),
    },
  ];
  const { currentUser } = useSelector((state: RootState) => state.auth.login);
  const [totalCourse, setTotalCourse] = useState<number>(0);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [purchaseLogList, setPurchaseLogList] = useState<Purchase[]>([]);
  const initialCourseSearchParams: SearchCartByStatus = {
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
    searchCondition: {
      status: CartStatusEnum.COMPLETED,
      is_deleted: false,
    },
  };
  const initializePurchasedSearchParam: GetPurchases = {
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
  };
  const fetchTotal = async () => {
    try {
      const userResponse = await UserService.getUser(currentUser._id);
      const courseResponse = await CartService.getCartsByStatus(
        initialCourseSearchParams
      );
      const user = userResponse?.data as User;
      setTotalBalance(user?.balance_total || 0);
      setTotalCourse(courseResponse.data?.pageInfo?.totalItems || 0);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchPurchased = async () => {
    try {
      const purchasedResponse = await PurchaseService.getPurchasesStudent(
        initializePurchasedSearchParam
      );

      const purchaseData = purchasedResponse?.data?.pageData || []; 
      const limitedPurchaseLogList = purchaseData.slice(0, 3) as Purchase[];

      setPurchaseLogList(limitedPurchaseLogList);

    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };
  useEffect(() => {
    fetchTotal();
    fetchPurchased();
  }, []);
  return (
    <div>
      <Divider orientation="left">
        <span style={{ marginRight: "8px", fontSize: "18px" }}>
          <DashboardOutlined />
        </span>
        <span style={{ fontSize: "18px" }}>Student Dashboard</span>
      </Divider>
      <Row gutter={16}>
        <Col className="gutter-row" xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              ...cardStyle,
              background: "linear-gradient(to bottom, #c6f6d5, #f0fff4)",
              borderBottom: "4px solid #38a169",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "16px" }}>
                <div
                  style={{
                    backgroundColor: "#38a169",
                    borderRadius: "50%",
                    padding: "20px",
                    display: "inline-block",
                  }}
                >
                  <WalletOutlined style={{ fontSize: "24px", color: "#fff" }} />
                </div>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <h2
                  style={{
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: "#4a5568",
                  }}
                >
                  Total Balance
                </h2>
                <p style={{ fontWeight: "bold", fontSize: "24px", margin: 0 }}>
                  {
                    <CountUp
                      start={0}
                      end={totalBalance}
                      duration={2}
                      decimals={2}
                    />
                  }
                </p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              ...cardStyle,
              background: "linear-gradient(to bottom, #bee3f8, #ebf8ff)",
              borderBottom: "4px solid #4299e1",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "16px" }}>
                <div
                  style={{
                    backgroundColor: "#4299e1",
                    borderRadius: "50%",
                    padding: "20px",
                    display: "inline-block",
                  }}
                >
                  <SnippetsOutlined
                    style={{ fontSize: "24px", color: "#fff" }}
                  />
                </div>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <h2
                  style={{
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: "#4a5568",
                  }}
                >
                  Total Courses
                </h2>
                <p style={{ fontWeight: "bold", fontSize: "24px", margin: 0 }}>
                  {<CountUp start={0} end={totalCourse} duration={2} />}
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Divider orientation="left">
        <span style={{ fontSize: "18px" }}>Latest Transactions</span>
      </Divider>
      <Table
        dataSource={purchaseLogList}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="key"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default StudentContent;
