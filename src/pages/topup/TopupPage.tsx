import { useEffect, useState } from "react";
import {
  Card,
  InputNumber,
  Radio,
  Button,
  Modal,
  Space,
  Typography,
  Alert,
} from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { getUser, UserService } from "../../services/user.service";
import { handleNotify } from "../../utils/handleNotify";
import { User } from "../../models/UserModel";

const { Text } = Typography;

const paymentMethods = [
  {
    id: "card",
    name: "Credit Card",
    description: "Pay securely with your credit card",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Fast and secure payment with PayPal",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    description: "Direct transfer from your bank account",
  },
];

const TopUpPage = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading] = useState(false); // Changed initial state to false
  const [error, setError] = useState<string>("");
  const { currentUser } = useSelector((state: RootState) => state.auth.login);
  const [user, setUser] = useState<User>()

  const handleSubmit = () => {
    if (!amount || amount < 5) {
      setError("Minimum amount is $5");
      return;
    }

    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }

    setError("");
    setIsModalOpen(true);
  };

  const handleAmountChange = (value: number | null) => {
    if (value === null) return; 

    if (value === 0) setAmount(value); 

    
    const [integer, decimal] = value.toString().split(".");
    if (decimal === undefined || decimal.length < 2) {
      setAmount(Number(`${integer}.${decimal || "0"}`));
    } else {
      setAmount(value);
    }
  };

  const formatAmount = (value: number | undefined) => {
    if (value == undefined) return "$ 0.00";
    return `$ ${Number(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const handleUpdateBalance = async () => {
    setIsModalOpen(false)
    if (amount) {
       const response = await UserService.updateUser(currentUser._id, {...currentUser, balance:  Number(amount) })
       if (response.success) {    
          fetchUser()   
          handleNotify("Top up successfully", `We've recieved your ${paymentMethod} payment of ${formatAmount(amount)}`)
          setAmount(0)
          setPaymentMethod("")
       }
    }
  }

  const fetchUser = async () => {
      const response =  await getUser(currentUser._id)
      if (response) {
        setUser(response as User);
      } else {
        setUser({} as User); 
      }
  }

  
  useEffect(() => {
    fetchUser()
  },[])




  return (
    <Card className="w-full">
      <Space direction="vertical" size="large" className="w-full">
        <Space direction="vertical" size="small">
          <h3 className="text-2xl mt-5">Top Up</h3>
          <Text className="text-gray-500">
            Add funds to your account balance
          </Text>
        </Space>

        <Card className="bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Current Balance</span>
            <span className="text-xl font-bold">${user?.balance_total || 0.00}</span>
          </div>
        </Card>

        <div className="form-section">
          <div className="form-item">
            <label className="block mb-2">Amount</label>
            <InputNumber
              className="w-full"
              value={amount}
              onChange={handleAmountChange}
              formatter={formatAmount}
              placeholder="0"
              min={5}
              step={0.50}
            />
            <Text className="block mb-6 text-gray-500">
              Minimum top-up amount: $5
            </Text>
          </div>

          <div className="form-item">
            <label className="block mb-2">Payment Method</label>
            <Radio.Group
              className="w-full"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <Space direction="vertical" className="w-full">
                {paymentMethods.map((method) => (
                  <Radio key={method.id} value={method.id} className="w-full">
                    <div className="flex flex-col">
                      <span className="font-medium">{method.name}</span>
                      <span className="text-gray-500">
                        {method.description}
                      </span>
                    </div>
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>

          {error && <Alert message={error} type="error" showIcon />}

          <Button
            onClick={handleSubmit}
            type="primary"
            className="w-full mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Continue to Top Up"}
          </Button>
        </div>

        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          okText="Confirm Top Up"
          onOk={() => handleUpdateBalance() }
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Confirm Top Up</h2>
            {isLoading ? (
              <div className="flex justify-center p-4">
                <span>Loading...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <p>Please review the details of your top-up request:</p>

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span>Amount:</span>
                    <span className="font-semibold">
                      {amount && formatAmount(amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-semibold">
                      {paymentMethods.find((m) => m.id === paymentMethod)?.name ?? "-"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </Space>
    </Card>
  );
};

export default TopUpPage;