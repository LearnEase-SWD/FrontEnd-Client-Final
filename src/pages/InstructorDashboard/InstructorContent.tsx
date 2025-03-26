import { Col, Divider, Row, Card, Table, Typography } from "antd";
import {
  WalletOutlined,
  DashboardOutlined,
  UserOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import CourseService from "../../services/course.service";
import PayoutService from "../../services/payout.service";
import { Payout, PayoutStatusEnum } from "../../models/Payout.model";
import dayjs from "dayjs";
import { RootState } from "../../redux/store/store";
import { UserService } from "../../services/user.service";
import { User } from "../../models/UserModel";
import { useSelector } from "react-redux";
import SubscriptionService from "../../services/subscription.service";
import { GlobalSearchParam } from "../../models/SearchInfo.model";
import CountUp from "react-countup";

// Tạo một component Card để tái sử dụng

interface InfoCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  gradient: string;
  color: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  value,
  icon,
  gradient,
  color,
}) => (
  <Col className="gutter-row" xs={24} sm={12} md={8} lg={6}>
    <Card
      style={{
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        margin: "8px 0",
        background: gradient,
        borderBottom: `4px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "16px" }}>
          <div
            style={{
              backgroundColor: color,
              borderRadius: "50%",
              padding: "20px",
              display: "inline-block",
            }}
          >
            {icon}
          </div>
        </div>
        <div style={{ flex: 1, textAlign: "right" }}>
          <h2
            style={{ fontWeight: "bold", fontSize: "15px", color: "#4a5568" }}
          >
            {title}
          </h2>
          <p style={{ fontWeight: "bold", fontSize: "24px", margin: 0 }}>
            {value}
          </p>
        </div>
      </div>
    </Card>
  </Col>
);

const InstructorContent = () => {
  const [_payout, setPayout] = useState<Payout[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { currentUser } = useSelector((state: RootState) => state.auth.login);
  const [counts, setCounts] = useState({ courses: 0, totalBalance: 0 });
  const [totalSubcriptions, setTotalSubcriptions] = useState<number>(0);

  const defaultPayload = {
    searchCondition: {
      keyword: "",
      role: "",
      status: true,
      is_verified: true,
      is_delete: false,
    },
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
  };

  // Tách fetchCounts vào hook useCallback để giảm re-fetch
  const fetchCounts = useCallback(async () => {
    try {
      const [coursesRes, totalBalanceRes] = await Promise.all([
        CourseService.getCourses({
          ...defaultPayload,
          searchCondition: {
            ...defaultPayload.searchCondition,
            is_deleted: false,
            status: "",
            category_id: "",
          },
        }),
        UserService.getUser(currentUser._id),
      ]);
      const user = totalBalanceRes?.data as User;
      const userBalance = user?.balance_total || 0;
      setCounts({
        courses: coursesRes.data?.pageInfo?.totalItems || 0,
        totalBalance: userBalance,
      });
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  }, [currentUser._id]);

  // Tránh tái tạo fetchPayout mỗi lần render
  const fetchPayout = useCallback(async () => {
    const statuses = [PayoutStatusEnum.NEW, PayoutStatusEnum.COMPLETED];
    const searchParams = {
      searchCondition: {
        payout_no: "",
        instructor_id: "",
        is_instructor: false,
        is_delete: false,
      },
      pageInfo: { pageNum, pageSize },
    };

    try {
      const responses = await Promise.all(
        statuses.map((status) =>
          PayoutService.getPayout({
            ...searchParams,
            searchCondition: { ...searchParams.searchCondition, status },
          })
        )
      );

      const responseData = responses.flatMap(
        (response) => response.data?.pageData || []
      );
      setTransactions(
        responseData.flatMap(
          (payout) =>
            payout.transactions?.map((transaction) => ({
              ...transaction,
              instructor_name: payout.instructor_name,
              payout_no: payout.payout_no,
            })) || []
        )
      );
      setPayout(responseData);
      setTotal(
        responses.reduce(
          (sum, response) => sum + (response.data?.pageInfo?.totalItems || 0),
          0
        )
      );
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }, [pageNum, pageSize]);

  const fetchSubscribers = async () => {
    try {
      const searchParams: GlobalSearchParam = {
        searchCondition: {
          keyword: "",
          is_deleted: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      };
      const response = await SubscriptionService.getSubscribers(searchParams);
      if (response?.success) {
        setTotalSubcriptions(response.data?.pageInfo?.totalItems || 0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCounts();
    fetchPayout();
    fetchSubscribers();
  }, [fetchCounts, fetchPayout]);

  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns = [
    {
      title: "Payout Number",
      dataIndex: "payout_no",
      key: "payout_no",
    },
    {
      title: "Amount",
      dataIndex: "price",
      key: "price",
      render: (amount: number) => (
        <Typography.Text style={{ color: "#16DBAA", fontWeight: 500 }}>
          ${amount}
        </Typography.Text>
      ),
    },
    {
      title: "Name",
      dataIndex: "instructor_name",
      key: "instructor_name",
      render: (instructorName: string) => (
        <Typography.Text style={{ color: "#4a5568" }}>
          {instructorName}
        </Typography.Text>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (createdAt: string) => {
        return dayjs(createdAt).format("DD/MM/YYYY");
      },
    },
  ];

  return (
    <div>
      <Divider orientation="left">
        <span style={{ marginRight: "8px", fontSize: "18px" }}>
          <DashboardOutlined />
        </span>
        <span style={{ fontSize: "18px" }}>Instructor Dashboard</span>
      </Divider>
      <Row gutter={16}>
        <InfoCard
          title="Total Balance"
          value={<CountUp start={0} end={counts.totalBalance} duration={2} decimals={2} />}
          icon={<WalletOutlined style={{ fontSize: "24px", color: "#fff" }} />}
          gradient="linear-gradient(to bottom, #c6f6d5, #f0fff4)"
          color="#38a169"
        />
        <InfoCard
          title="Total Courses"
          value={<CountUp start={0} end={counts.courses} duration={2} />}
          icon={
            <SnippetsOutlined style={{ fontSize: "24px", color: "#fff" }} />
          }
          gradient="linear-gradient(to bottom, #bee3f8, #ebf8ff)"
          color="#4299e1"
        />
        <InfoCard
          title="Total Subscribers"
          value={<CountUp start={0} end={totalSubcriptions} duration={2} />}
          icon={<UserOutlined style={{ fontSize: "24px", color: "#fff" }} />}
          gradient="linear-gradient(to bottom, #fed7e2, #fff5f7)"
          color="#d53f8c"
        />
      </Row>
      <Divider orientation="left">
        <span style={{ fontSize: "18px" }}>Latest Transactions</span>
      </Divider>
      <Table
        dataSource={transactions}
        columns={columns}
        pagination={{
          current: pageNum,
          pageSize,
          total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        rowKey="_id"
        bordered
        style={{ borderRadius: "8px" }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default InstructorContent;
