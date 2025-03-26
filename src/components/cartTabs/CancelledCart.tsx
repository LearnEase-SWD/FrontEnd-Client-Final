import { List, Button, Empty, Space, Typography } from "antd";
import {
  ShoppingCartOutlined,

  ArrowRightOutlined,
  DeleteOutlined,

} from "@ant-design/icons";
import { Cart, CartItem } from "../../models/Cart.model";

const { Text } = Typography;


interface OrderProps {
  carts: Cart[];
  total: number;
  navigate: (path: string) => void;
  orderDate?: string;
  orderNumber?: string;
  paymentStatus?: string;
  repurchaseCart: (cartItem: CartItem) => void;
  removeCart: (cartItem: CartItem) => void;
  isLoading?: boolean; 
}


// Purchased Orders Component
const CancelledOrders: React.FC<OrderProps> = ({
  carts,
  navigate,
  repurchaseCart,
  removeCart,
  isLoading
}) => {
  return (
    <>
      <h1 className="mb-2 pt-4 text-4xl font-semibold">Cancelled Payments</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full">
          {carts.length > 0 && (
            <List
              itemLayout="horizontal"
              dataSource={carts}
              renderItem={(cart) => (
                <List.Item
                  key={cart._id}
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
                      className="mt-4 sm:w-full sm:text-base text-xs w-24 view-button ant-btn-variant-solid font-jost"
                      onClick={() => repurchaseCart({_id: cart._id,cart_no: cart.cart_no})}
                    >
                      Repurchase <ArrowRightOutlined />
                    </Button>,
                    <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeCart({_id: cart._id, cart_no: cart.cart_no})}
                    aria-label={`Remove ${cart.course_name} from cart`}
                  />
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


export default CancelledOrders