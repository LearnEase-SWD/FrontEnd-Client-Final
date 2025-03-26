import { useEffect, useState } from "react";
import { Input, Button, Pagination, Card, Tabs } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useCustomNavigate } from "../../hooks/customNavigate";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { Subscription } from "../../models/Subscription.model";
import SubscribeButton from "../../components/SubscribeButton";
import { GlobalSearchParam } from "../../models/SearchInfo.model";
import SubscriptionService from "../../services/subscription.service";

const initialSubsParam: GlobalSearchParam = {
  pageInfo: {
    pageNum: 1,
    pageSize: 10,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
  },
};

const StudentSubscriptions = () => {
  // const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isInstructor, setIsInstructor] = useState<boolean>(false);
  const { currentUser } = useSelector((state: RootState) => state.auth.login);
  const [subscribers, setSubscribers] = useState<Subscription[]>();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>();

  const navigate = useCustomNavigate();

  useEffect(() => {
    if (currentUser) {
      setIsInstructor(currentUser.role === "instructor");
    }
  }, [currentUser]);

  const fetchSubscriptions = async () => {
    const response = await SubscriptionService.getSubscriptions(
      initialSubsParam
    );
    setSubscriptions(response?.data?.pageData ?? []);
  };

  const fetchSubscribers = async () => {
    const response = await SubscriptionService.getSubscribers(initialSubsParam);
    setSubscribers(response?.data?.pageData ?? []);
  };

  useEffect(() => {
    fetchSubscriptions();
    if (isInstructor) fetchSubscribers();   
  }, [initialSubsParam]);

  // const handleSearch = (value: string) => {

  // }

  const subscriptionsList = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {subscriptions?.map((subscription) => (
        <div
          key={subscription._id}
          className="border p-4 rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer "
        >
          <img
            src={subscription.avatar_url}
            alt={subscription.avatar_url}
            className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-4"
          />
            {/* <UserOutlined className="text-6xl mt-2" /> */}

          <a
            className="text-lg font-semibold font-jost"
            href={`/profile/${subscription.instructor_id}`}
            onClick={(e) =>
              navigate(`/profile/${subscription.instructor_id}`, true, e)
            }
          >
            {subscription.instructor_name}
          </a>
          {/* <p className="text-gray-600">
            <i className="fas fa-phone-alt mr-2"></i>
            {subscription.phone}
          </p>
          <p className="text-gray-600">
            <i className="fas fa-envelope mr-2"></i>
            {subscription.email}
          </p> */}
          <SubscribeButton
            instructorId={subscription.instructor_id}
            instructorName={subscription.instructor_name}
            initialSubscribedValue={true}
            userRole={currentUser.role}
          />
        </div>
      ))}
    </div>
  );

  const subscriberList = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {subscribers?.map((subscriber) => (
        <div
          key={subscriber._id}
          className="border p-4 rounded-lg text-center shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        >
          <div
            // src={subscription.}
            // alt={subscription.name}
            className="w-20 h-20 bg-white rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold mb-20">
            {subscriber.subscriber_name}
          </h3>
          {/* <p className="text-gray-600">
            <i className="fas fa-phone-alt mr-2"></i>
            {subscriber.phone}
          </p>
          <p className="text-gray-600">
            <i className="fas fa-envelope mr-2"></i>
            {subscriber.email}
          </p> */}
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <h3 className="text-2xl my-5">My Subscriptions</h3>

      {/* Search Bar */}
      <div className="flex items-center mb-6">
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined />}
          className="w-80 mr-4"
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          className="view-button"
        >
          Search
        </Button>
      </div>

      {/* Tabs for Subscriptions and Subscribers */}
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Subscriptions" key="1">
          {subscriptionsList}
        </Tabs.TabPane>

        {isInstructor && (
          <Tabs.TabPane tab="Subscribers" key="2">
            {subscriberList}
          </Tabs.TabPane>
        )}
      </Tabs>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <Pagination defaultCurrent={1} pageSize={10} />
      </div>
    </Card>
  );
};

export default StudentSubscriptions;
