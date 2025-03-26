import { List, Button, Empty, Space, Typography, Checkbox } from "antd";
import { ArrowRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { Cart } from "../../models/Cart.model";

const { Text } = Typography;


interface OrderProps {
  carts: Cart[];
  total: number;
  navigate: (path: string) => void;
  orderDate?: string;
  orderNumber?: string;
  paymentStatus?: string;
  selectedCarts: string[];
  toggleSelectCart: (cartId: string) => void;
}

// Unpa_id Orders Component
const UnpaidOrders: React.FC<OrderProps> = ({
  carts,
  selectedCarts,
  navigate,
  toggleSelectCart,
}) => {
  const handleToggleSelect = useCallback(
    (cartId: string) => {
      toggleSelectCart(cartId);
    },
    [toggleSelectCart]
  );

  const handleMultipleSelection = () => {
    navigate("/cart/checkout");
  }
  return (
    <>
      <h1 className="mb-2 pt-4 text-4xl font-semibold">Awaiting Payment</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full">
          {carts.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={carts}
              renderItem={(cart) => (
                <List.Item
                  key={cart._id}
                  actions={[
                    <div key={cart._id}>
                      <Text className={`font-jost px-8 text-base`}>
                        <span className={`${cart.discount ? "line-through text-gray-400 text-sm pr-2" : "text-black text-right"}`}>đ{cart.price.toFixed(0)} </span>
                        {cart.discount > 0 &&  `đ${cart.price * (100 - cart.discount)/100}`
                        }
                      </Text>
                      <Text type="warning">
                        <ClockCircleOutlined /> Awaiting Payment
                      </Text>
                    </div>,
                    <Button
                      key={cart._id}
                      type="primary"
                      size="large"
                      className="w-full mt-4 view-button ant-btn-variant-solid font-jost"
                      onClick={() => navigate("/cart/checkout")}
                      disabled={selectedCarts.length === 0}
                    >
                      Pay Now <ArrowRightOutlined />
                    </Button>,
                  ]}
                  onClick={() => handleToggleSelect(cart._id)}
                  className="cursor-pointer"
                >
                  <Checkbox
                    checked={selectedCarts.includes(cart._id)}
                    onChange={() => handleToggleSelect(cart._id)}
                    className="mr-4 custom-checkbox"
                  />
                  <List.Item.Meta
                    avatar={
                      <img
                        src={cart.course_image}
                        alt={cart.course_name}
                        className="w-24 h-16 object-cover rounded"
                      />
                    }
                    title={
                      <Text strong className="font-jost">
                        {cart.course_name}
                      </Text>
                    }
                    description={
                      <Space className="flex flex-col items-start">
                        <Text>By {cart.instructor_name}</Text>
                      </Space>
                    }
                  />
                </List.Item>
                
              )}
            />
            
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No unpaid orders"
            />
          )}
        </div>
        
      </div>
      <div className={`w-full flex justify-center ${selectedCarts.length<2 && "hidden"}`}>
          <Button
                      type="primary"
                      size="large"
                      className="w-full mt-4 view-button ant-btn-variant-solid font-jost"
                      onClick={() => handleMultipleSelection()}
                    >
                      Pay All <ArrowRightOutlined />
          </Button>
        </div>
    </>
  );
};

export default UnpaidOrders;
