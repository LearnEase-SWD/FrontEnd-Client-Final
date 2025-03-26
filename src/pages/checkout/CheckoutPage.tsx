import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  List,
  Typography,
  Space,
  Radio,
  Divider,
  message,
  Empty,
} from "antd";
import {
  CreditCardOutlined,
  BankOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { Cart, CartItem } from "../../models/Cart.model";
import { useNavigate } from "react-router-dom";
import { moneyFormatter } from "../../utils/moneyFormatter";

const { Title, Text } = Typography;

interface CheckoutPageProps {
  carts: Cart[];
  // navigate: (path: string) => void;
  cancelCart: (cartItem: CartItem) => void;
  checkout: () => void;
  isLoading?: boolean;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  carts,
  cancelCart,
  checkout,
  isLoading = false
}) => {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const { currentUser } = useSelector((state: RootState) => state.auth.login);
  const navigate = useNavigate();

  const total = carts.reduce((sum, cart) => sum + cart.price_paid, 0);

  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  //   message.success('Order placed successfully!');
  //   navigate('/');
  // };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill in all required fields.");
  };

  return (
    <div className="container mx-auto  py-4 font-jost">
      <h1 className="mb-2 pb-4 text-4xl font-semibold">Awaiting Payment</h1>
      <div className="w-full">
        {carts.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-3/5">
              <Card title="Billing Information" className="mb-8">
                <Form
                  name="checkout"
                  onFinish={checkout}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                >
                  <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your full name!",
                      },
                    ]}
                    initialValue={currentUser?.name}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    initialValue={currentUser?.email}
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Divider />
                  <Title level={4}>Payment Method</Title>
                  <Form.Item name="paymentMethod">
                    <Radio.Group
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      value={paymentMethod}
                    >
                      <Space direction="vertical">
                        <Radio value="credit_card">
                          <Space>
                            <CreditCardOutlined />
                            Credit Card
                          </Space>
                        </Radio>
                        <Radio value="bank_transfer">
                          <Space>
                            <BankOutlined />
                            Bank Transfer
                          </Space>
                        </Radio>
                        <Radio value="paypal">
                          <Space>
                            <DollarOutlined />
                            PayPal
                          </Space>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                  {paymentMethod === "credit_card" && (
                    <>
                      <Form.Item
                        name="cardNumber"
                        label="Card Number"
                        rules={[
                          {
                            required: true,
                            message: "Please input your card number!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Space>
                        <Form.Item
                          name="expiryDate"
                          label="Expiry Date"
                          rules={[{ required: true, message: "Required!" }]}
                        >
                          <Input placeholder="MM/YY" />
                        </Form.Item>
                        <Form.Item
                          name="cvv"
                          label="CVV"
                          rules={[{ required: true, message: "Required!" }]}
                        >
                          <Input />
                        </Form.Item>
                      </Space>
                    </>
                  )}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      className="w-full mt-4 view-button ant-btn-variant-solid font-jost"
                    >
                      Place Order
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
            <div className="w-full lg:w-2/5">
              <Card title="Order Summary" className="sticky top-4">
                <List
                  dataSource={carts}
                  renderItem={(cart) => (
                    <List.Item key={cart._id} className="flex-col flex">
                      {cart.discount > 0 &&
                      <div className="flex w-full h-2 text-gray-400 line-through  justify-end items-center">
                          <Text className="text-gray-400">{moneyFormatter(cart.price)}</Text>
                          <Button
                            type="link"
                            className="text-gray-500 opacity-0 underline text-xs px-2 font-semibold hover:!text-red-500"
                          >
                            Cancel
                          </Button>
                        </div>
                    }
                      <div className="justify-between flex w-full">
                        <Text className="overflow-hidden whitespace-nowrap overflow-ellipsis">{cart.course_name}</Text>
                        <div className="flex  justify-end items-center">
                          <Text className="whitespace-nowrap">{moneyFormatter(cart.price_paid)}</Text>
                          <Button
                            type="link"
                            onClick={() => cancelCart(cart)}
                            className="text-gray-500 underline text-xs px-2 font-semibold hover:!text-red-500"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                      
                    </List.Item>
                    
                  )}
                />
                <Divider />
                <div className="flex justify-between items-center">
                  <Text strong>Total</Text>
                  <Text strong className="text-4xl font-jost ">
                    ${total.toFixed(2)}
                  </Text>
                </div>
              </Card>
            </div>
          </div>
        )} 
        
        {carts.length === 0 && isLoading === false && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <Space direction="vertical" align="center">
                <Text>You have no courses awaiting payment</Text>
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
  );
};

export default CheckoutPage;
