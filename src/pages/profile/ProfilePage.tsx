import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Tabs,
  Typography,
  Row,
  Col,
  Statistic,
  Progress,
  List,
  Tag,
  Modal,
  Skeleton,
} from "antd";
import { StarOutlined } from "@ant-design/icons";

import {
  BookOutlined,
  UserOutlined,
  ClockCircleOutlined,
  StarFilled,
} from "@ant-design/icons";
import DynamicBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useCustomNavigate } from "../../hooks/customNavigate";
import { User } from "../../models/UserModel";
import { useParams } from "react-router-dom";
import { UserService } from "../../services/user.service";
import { Course, GetCourses } from "../../models/Course.model";
import ClientService from "../../services/client.service";
import dayjs from "dayjs";
import { renderContent } from "../../utils/renderContent";
import { capitalize } from "lodash";
import SubscribeButton from "../../components/SubscribeButton";
// import { handleNotify } from "../../utils/handleNotify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import SubscriptionService from "../../services/subscription.service";
// import { authorize } from "../../utils/authorize";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState<User>({} as User);
  const [userCourse, setUserCourse] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const { currentUser, token } = useSelector(
    (state: RootState) => state.auth.login
  );
  const [isSubscribed, setIsSubscribed] = useState<boolean | undefined>();
  // const [loadingData, setLoadingData] = useState(true);

  const showModal = (image: string) => {
    setModalImage(image);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UserService.getUser(id as string);
        setUserData(res?.data as User);
      } finally {
        setLoading(false);
        checkDataLoaded();
      }
    };

    const fetchCourseById = async () => {
      try {
        const searchParam: GetCourses = {
          searchCondition: {
            keyword: "",
            category_id: "",
            user_id: id,
            is_deleted: false,
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10,
          },
        };
        const res = await ClientService.getCourses(searchParam);
        const courses = res.data?.pageData as Course[];
        setUserCourse(courses);
        const students = courses.reduce(
          (acc, course) => acc + course.enrolled,
          0
        );
        const minutes = courses.reduce(
          (acc, course) => acc + course.full_time,
          0
        );
        setTotalStudents(students);
        setTotalMinutes(minutes);
      } finally {
        setCoursesLoading(false);
        checkDataLoaded();
      }
    };

    // Call both API fetches
    fetchData();
    fetchCourseById();
  }, [id]);

  // Function to check if both data are loaded
  const checkDataLoaded = () => {
    if (!loading && !coursesLoading) {
      return;
    }
  };

  useEffect(() => {
    if (userData.name && currentUser !== undefined) {
      checkSubscribed();
    } else if (currentUser === undefined && token === undefined) {
      setIsSubscribed(false);
    }
  }, [userData, currentUser]);

  const checkSubscribed = async () => {
    if (token === null) {
      setIsSubscribed(false);
      return;
    }

    const response = await SubscriptionService.checkSubscription("");
    if (response.data?.pageData) {
      setIsSubscribed(
        Boolean(
          response.data.pageData.find(
            (object) => object.instructor_name === userData.name
          )
        )
      );
      console.log(
        Boolean(
          response.data.pageData.find(
            (object) => object.instructor_name === userData.name
          )
        )
      );
    }
  };

  const fetchCourseById = async () => {
    try {
      const searchParam: GetCourses = {
        searchCondition: {
          keyword: "",
          category_id: "",
          user_id: id,
          is_deleted: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      };
      const res = await ClientService.getCourses(searchParam);
      const courses = res.data?.pageData as Course[];
      setUserCourse(courses);
      const students = courses.reduce(
        (acc, course) => acc + course.enrolled,
        0
      );
      console.log(students);
      const minutes = courses.reduce(
        (acc, course) => acc + course.full_time,
        0
      );
      console.log(minutes);
      setTotalStudents(students);
      setTotalMinutes(minutes);
    } finally {
      setCoursesLoading(false);
    }
  };

  const handleTabChange = (activeKey: string) => {
    if (activeKey === "2" && userCourse.length === 0) {
      fetchCourseById();
    }
  };

  // const handleSubscription = () => {
  //   if (authorize(currentUser.role)) return true

  // }

  const instructorInfo = {
    name: userData.name,
    bank_information: userData.bank_account_name,
    bank_account_no: userData.bank_account_no,
    bank_name: userData.bank_name,
    email: userData.email,
    role: userData.role,
    avatar: userData?.avatar_url,
    coverPhoto: userData?.avatar_url,
    phone: userData.phone_number,
    bio: userData.description,
    coursesCreated: userCourse.length,
    totalStudents,
    teachingHours: totalMinutes,
    courses: userCourse,
    _id: userData._id,
  };

  const navigate = useCustomNavigate();

  const ProfileHeader = () =>
    loading || isSubscribed === undefined ? (
      <div className="flex items-end mt-32 z-10">
        <Skeleton.Avatar active size={160} className="ml-4 mb-24" />
        <div className="ml-5 flex-1">
          <Skeleton active paragraph={{ rows: 4 }} />
        </div>
      </div>
    ) : (
      <div className="relative z-10">
        {/* Cover Image */}
        <div className="w-full h-48 sm:h-60 lg:h-60 relative">
          {loading || isSubscribed === undefined ? null : (
            <img
              alt="Cover"
              src={instructorInfo.avatar}
              className="w-full h-full object-cover"
            />
          )}
        </div>
  
        {/* Layout cho điện thoại */}
        <div className="lg:hidden flex flex-col items-center pt-16 relative">
          {/* Avatar */}
          <Avatar
            src={instructorInfo.avatar || undefined}
            size={160}
            icon={!instructorInfo.avatar && <UserOutlined />}
            className="absolute -top-20 border-4 border-black rounded-full"
            onClick={() =>
              instructorInfo.avatar && showModal(instructorInfo.avatar as string)
            }
          />
  
          {/* Info */}
          <div className="text-center mt-20">
            <Title level={2} className="p-0 !mb-0">
              {instructorInfo.name}
            </Title>
            <div>
              <Text type="secondary">{capitalize(instructorInfo.role)}</Text>
            </div>
          </div>
  
          {/* Subscribe Button */}
          <div className="mt-4">
            <SubscribeButton
              initialSubscribedValue={isSubscribed}
              instructorName={instructorInfo.name}
              instructorId={instructorInfo._id}
              userRole={currentUser.role}
            />
          </div>
        </div>
  
        {/* Layout cho laptop */}
        <div className="hidden lg:flex items-end justify-between px-4 relative">
          {/* Avatar */}
          <Avatar
            src={instructorInfo.avatar || undefined}
            size={160}
            icon={!instructorInfo.avatar && <UserOutlined />}
            className="absolute -top-20 border-4 border-black rounded-full"
            onClick={() =>
              instructorInfo.avatar && showModal(instructorInfo.avatar as string)
            }
          />
  
          {/* Info */}
          <div className="ml-5 mt-16">
            <Title level={2} className="p-0 !mb-0">
              {instructorInfo.name}
            </Title>
            <div>
              <Text type="secondary">{capitalize(instructorInfo.role)}</Text>
            </div>
          </div>
  
          {/* Subscribe Button */}
          <div className="ml-auto mt-16">
            <SubscribeButton
              initialSubscribedValue={isSubscribed}
              instructorName={instructorInfo.name}
              instructorId={instructorInfo._id}
              userRole={currentUser.role}
            />
          </div>
        </div>
      </div>
    );
  
  
  

  const AboutTab = () =>
    loading || isSubscribed === undefined ? (
      <Skeleton active paragraph={{ rows: 4 }} />
    ) : (
      <>
        <Paragraph className="text-base">
          {renderContent(instructorInfo.bio ?? "")}
        </Paragraph>
        <StatsTab />
        <Title level={4}>Contact</Title>
        <Paragraph>Email: {instructorInfo.email}</Paragraph>
        <Paragraph>Phone: {instructorInfo.phone}</Paragraph>
      </>
    );

  const CoursesTab = () =>
    coursesLoading ? (
      <List
        itemLayout="vertical"
        dataSource={[1, 2, 3]} // Dummy data for loading state
        renderItem={() => (
          <List.Item>
            <Skeleton active avatar paragraph={{ rows: 3 }} />
          </List.Item>
        )}
      />
    ) : (
      <List
        itemLayout="vertical"
        dataSource={instructorInfo.courses}
        renderItem={(course: Course) => (
          <List.Item
            key={course._id}
            className="flex justify-between items-center p-5 border-b border-gray-200 pb-6"
          >
            <div className="flex-1">
              <List.Item.Meta
                title={
                  <a onClick={() => navigate(`/course/${course._id}`, true)}>
                    {course.name}
                  </a>
                }
                description={course.description}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2 pb-6">
                <Tag
                  color="orange"
                  className="max-w-xs truncate h-12 py-2 text-lg flex items-center"
                >
                  Created at: {dayjs(course.created_at).format("DD/MM/YYYY")}
                </Tag>
                <Tag
                  color="green"
                  className="max-w-xs truncate h-12 py-2 text-lg flex items-center"
                >
                  Level: {course.level}
                </Tag>
                <Tag className="bg-orange-500 text-white font-jost max-w-xs truncate h-12 py-2 text-lg flex items-center">
                  {course.category_name}
                </Tag>
                <Tag className="bg-gray-500 text-white font-jost max-w-xs truncate h-12 py-2 text-lg text-right">
                  {course.full_time} minutes
                </Tag>
                <Tag
                  color="blue"
                  className="text-white font-jost max-w-xs truncate h-12 py-2 text-lg text-right"
                >
                  {course.enrolled} enrolled
                </Tag>
                <Tag className="bg-blue-800 text-white font-jost flex items-center max-w-xs truncate h-12 py-2 text-lg text-right">
                  <div className="flex items-center justify-end w-full">
                    {renderStars(course.average_rating)}
                    <span className="ml-2">
                      {course.average_rating > 0
                        ? `${course.average_rating.toFixed(1)} rating`
                        : ""}
                    </span>
                  </div>
                </Tag>
              </div>
            </div>
          </List.Item>
        )}
      />
    );

  // Function to render stars based on rounded average rating
  const renderStars = (averageRating: number) => {
    if (averageRating === 0) {
      return <Text className="text-white text-lg">No rating</Text>;
    }

    const roundedRating = Math.round(averageRating);
    return (
      <>
        {Array.from({ length: 5 }, (_, index) =>
          index < roundedRating ? (
            <StarFilled key={index} className="text-yellow-400" />
          ) : (
            <StarOutlined key={index} className="text-gray-300" />
          )
        )}
      </>
    );
  };

  const StatsTab = () =>
    loading ? (
      <Skeleton active paragraph={{ rows: 4 }} />
    ) : (
      <>
        <Row gutter={16}>
          <Col span={8}>
            <Statistic
              title="Courses Created"
              value={instructorInfo.coursesCreated}
              prefix={<BookOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Total Students"
              value={instructorInfo.totalStudents}
              prefix={<UserOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic
            className="whitespace-nowrap"
              title="Teaching Minutes"
              value={instructorInfo.teachingHours}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
        </Row>
        <Title level={4} className="mt-6">
          Average Course Rating
        </Title>
        <Progress
          percent={
            instructorInfo.courses.length > 0
              ? (instructorInfo.courses.reduce(
                  (acc, course) => acc + course.average_rating,
                  0
                ) /
                  instructorInfo.courses.length) *
                20
              : 0
          }
          status="active"
          format={(percent) => `${((percent ?? 0) / 20).toFixed(1)} / 5`}
        />
      </>
    );

  return (
    <main className="mt-2 min-h-screen pb-40 z-0">
      <div className="p-4 pb-0">
        <DynamicBreadcrumb />
        <Card className="relative custom-card">
          <div className="w-full absolute h-48 sm:h-60 lg:h-60">
            {loading || isSubscribed === undefined ? (
              ""
            ) : (
              <img
                alt="Cover"
                src={instructorInfo.avatar}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <ProfileHeader />

          <Modal
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            centered
          >
            <img alt="Enlarged" src={modalImage} className="w-full" />
          </Modal>

          <Tabs
            defaultActiveKey="1"
            className="mt-6 custom-tabs font-exo"
            onChange={handleTabChange}
          >
            <TabPane tab="About" key="1">
              <AboutTab />
            </TabPane>

            <TabPane tab="Courses" key="2">
              <CoursesTab />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </main>
  );
};

export default ProfilePage;
