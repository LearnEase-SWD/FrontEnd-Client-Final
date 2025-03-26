import { List, Checkbox, Button, Empty, Card, Space, Typography, Skeleton } from "antd";
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useCallback } from "react";
import { Cart, CartItem } from "../../models/Cart.model";

const { Text } = Typography;

interface MyCartProps {
  carts: Cart[];
  selectedCarts: CartItem[];
  toggleSelectCart: (cartItem: CartItem) => void;
  removeCart: (cartItem: CartItem) => void;
  total: number;
  discounted: number;
  navigate: (path: string) => void;
  onCheckOut: () => void;
  isLoading?: boolean; // New prop for loading state
}

const CartSkeleton = () => (
  <div className="w-full">
    {[1, 2, 3].map((i) => (
      <div key={i} className="mb-4 p-4 border rounded-lg">
        <div className="flex items-center gap-4">
          <Skeleton.Button active className="!w-5 !h-5 !min-w-5" />
          <Skeleton.Image active className="!w-24 !h-16" />
          <div className="flex-1">
            <Skeleton.Input active className="!w-3/4" />
            <Skeleton.Input active size="small" className="!w-1/2 mt-2" />
          </div>
          <Skeleton.Input active className="!w-20 !min-w-20" />
        </div>
      </div>
    ))}
  </div>
);

const OrderSummarySkeleton = () => (
  <Card title="Order Summary" className="sticky top-4">
    <Space direction="vertical" className="w-full">
      <div className="flex justify-between">
        <Skeleton.Input active size="small" className="!w-20" />
        <Skeleton.Input active size="small" className="!w-20" />
      </div>
      <div className="flex justify-between items-center mt-4">
        <Skeleton.Input active size="small" className="!w-20" />
        <Skeleton.Input active size="large" className="!w-32" />
      </div>
      <Skeleton.Button active block className="mt-4" />
    </Space>
  </Card>
);

const MyCart: React.FC<MyCartProps> = ({
  carts,
  selectedCarts,
  toggleSelectCart,
  removeCart,
  total,
  discounted,
  navigate,
  onCheckOut,
  isLoading = false,
}) => {
  const handleToggleSelect = useCallback(
    (cartId: string, cartNo: string) => {
      toggleSelectCart({ cart_no: cartNo, _id: cartId });
    },
    [toggleSelectCart]
  );

  const handleRemoveCart = useCallback(
    (cartId: string, cartNo: string,  e: React.MouseEvent) => {
      e.stopPropagation();
      removeCart({ cart_no: cartNo, _id: cartId });
    },
    [removeCart]
  );

  if (isLoading) {
    return (
      <>
        <h1 className="mb-2 pt-4 text-4xl font-semibold">Your Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full md:w-2/3">
            <CartSkeleton />
          </div>
          <div className="w-full md:w-1/3">
            <OrderSummarySkeleton />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="mb-2 pt-4 text-4xl font-semibold">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          {carts.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={carts}
              renderItem={(cart) => (
                <List.Item
                  key={cart._id}
                  actions={[
                    <div key={cart._id} >
                     <Text className={`font-jost sm:px-8 text-base`}>
                        <span className={`${cart.discount ? "line-through sm:inline-block hidden text-gray-400 text-sm pr-2" : "text-black text-right"}`}>
                          ${cart.price.toFixed(0)}
                        </span>
                        <span>{cart.discount > 0 && `$${(cart.price * (100 - cart.discount)) / 100}`}</span>
                      </Text>
                      <Button
                        type="text"
                        icon={<DeleteOutlined/>}
                        onClick={(e) => handleRemoveCart(cart._id, cart.cart_no, e)}
                        aria-label={`Remove ${cart.course_name} from cart`}
                      />
                    </div>,
                  ]}
                  onClick={() => handleToggleSelect(cart._id, cart.cart_no)}
                  className="cursor-pointer sm:w-auto"
                >
                  <Checkbox
                    checked={selectedCarts.some((selectedCart) => selectedCart._id === cart._id)}
                    onChange={() => handleToggleSelect(cart._id, cart.cart_no)}
                    className="mr-4 custom-checkbox"
                  />
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
                      <Space className="flex flex-col items-start pt-0 mt-0 justify-end space-y-0">
                        <Text className="whitespace-nowrap overflow-ellipsis overflow-hidden w-auto">By {cart.instructor_name}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Space direction="vertical" align="center">
                  <Text>Your cart is empty</Text>
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
        <div className="w-full lg:w-1/3">
          <Card title="Order Summary" className="sticky top-4">
            <Space direction="vertical" className="w-full">
            <div className="flex justify-between">
                <Text>Subtotal</Text>
                <Text>${(discounted + total).toFixed(2)}</Text>
              </div>
              {discounted > 0 &&
              <div className="flex justify-between">
                <Text>You saved</Text>
                <Text>- ${discounted.toFixed(2)}</Text>
              </div>
              }
              <div className="flex justify-between items-center">
                <Text strong>Total</Text>
                <Text strong className="text-4xl font-jost">
                  ${total.toFixed(2)}
                </Text>
              </div>
              <Button
                type="primary"
                size="large"
                className="w-full mt-4 view-button ant-btn-variant-solid font-jost"
                onClick={onCheckOut}
                disabled={selectedCarts.length === 0 || carts.length === 0}
              >
                Proceed to Checkout <ArrowRightOutlined />
              </Button>
            </Space>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MyCart;