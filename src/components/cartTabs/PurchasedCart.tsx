import { List, Button, Empty, Space, Typography } from "antd";
import { ArrowRightOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Cart } from "../../models/Cart.model";

const { Text } = Typography;

interface OrderProps {
  carts: Cart[];
  total: number;
  navigate: (path: string) => void;
  orderDate?: string;
  orderNumber?: string;
  paymentStatus?: string;
  isLoading?: boolean;
}

// Purchased Orders Component
const PurchasedOrders: React.FC<OrderProps> = ({
  carts,
  navigate,
  isLoading = false,
}) => {
  return (
    <>
      <h1 className="mb-2 pt-4 text-4xl font-semibold">Purchased Courses</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full">
          {carts.length > 0 && (
            <List
              itemLayout="horizontal" // Change layout for more vertical space
              dataSource={carts}
              renderItem={(cart) => (
                <List.Item key={cart._id} 
                  className="relative"
                  actions={[
                    <div key={cart._id}>
                    <Text className={`font-jost sm:px-8 text-base`}>
                      <span className={`${cart.discount ? "line-through sm:inline-block hidden text-gray-400 text-xs sm:text-sm pr-2" : "text-black text-right text-xs sm:text-sm "}`}>
                        ${cart.price.toFixed(0)}
                      </span>
                      <span className="text-xs sm:text-sm">{cart.discount > 0 && `$${(cart.price * (100 - cart.discount)) / 100}`}</span>
                    </Text>
                  </div>,
                    <Button
                      key={cart._id}
                      type="primary"
                      size="large"
                      className="mt-4 sm:w-full sm:text-base text-xs w-16 view-button ant-btn-variant-solid font-jost"
                      onClick={() => navigate(`/course/${cart.course_id}`)}
                    >
                      Learn <ArrowRightOutlined />
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <img
                        src={cart.course_image}
                        alt={cart.course_name}
                        className="w-24 h-16 object-cover rounded sm:inline-block hidden"
                      />
                    }
                    title={
                      <div className="whitespace-nowrap  overflow-ellipsis overflow-hidden sm:w-auto">
                      <Text strong className="font-jost hover:text-orange-400 transition whitespace-nowrap " onClick={() => navigate(`/course/${cart.course_id}`)}>
                        {cart.course_name}
                      </Text>
                      </div>
                    }
                    description={
                      <Space className="flex flex-col items-start pt-0 mt-0 justify-end space-y-0 hitespace-nowrap  overflow-ellipsis overflow-hidden">
                        <Text className="whitespace-nowrap overflow-ellipsis overflow-hidden w-auto">By {cart.instructor_name}</Text>
                      </Space>
                    }
                  />
                  
                </List.Item>
              )}
            />
          )}
          {carts.length === 0 && isLoading === false && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Space direction="vertical" align="center">
                  <Text>You haven't purchased any carts yet</Text>
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => navigate("/course")}
                    className="bg-orange-500 font-jost p-8 py-5 hover:bg-orange-600 view-button ant-btn-variant-solid"
                  >
                    Browse Courses
                  </Button>
                </Space>
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PurchasedOrders;
