// import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Button, Divider, Form, Input, Modal } from "antd";
import { FormProps } from "antd";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlices";
import { AppDispatch, RootState } from "../../redux/store/store";
import ModalRegisterGoogle from "../../components/ModalRegisterGoogle";
import GoogleLoginButton from "../../components/GoogleLoginButton";

export type LoginProps = {
  email: string;
  password: string;
};

const Loginpage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { currentUser, token, loading, is_register_google, success } =
    useSelector((state: RootState) => state.auth.login);

  const navigate = useNavigate();
  const isNotExistAccount = localStorage.getItem("isNotExist");

  useEffect(() => {
    if (isNotExistAccount === "true") {
      setIsOpenModal(true);
    } else {
      setIsOpenModal(false);
    }
  }, [isNotExistAccount]);

  useEffect(() => {
    if (success) {
      setIsOpenModal(false);
    }
  }, [success]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (
        currentUser?.role === "student" ||
        currentUser?.role === "instructor"
      ) {
        navigate("/");
      } else if (currentUser?.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/login");
      }
    }
  }, [currentUser, token, navigate]);

  const onFinish: FormProps<LoginProps>["onFinish"] = async (values) => {
    try {
      const { email, password } = values;
      await dispatch(login({ email, password }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full lg:flex lg:h-[35rem] lg:flex-row lg:rounded-lg mt-12 overflow-hidden shadow-xl">
        {/* BACKGROUND */}
        <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center">
          <Player
            src={`https://lottie.host/d08bd2de-f201-41ed-9ee3-cf8484903ca6/G0I0mLw1Np.json`}
            loop
            autoplay
            className="h-44 w-full md:h-60 lg:h-full"
          />
        </div>
        {/* FORM */}
        <div className="w-full bg-white p-10 lg:w-1/2 lg:p-16 flex flex-col justify-center">
          <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">
            Welcome Back
          </h1>
          <Form
            name="login"
            layout="vertical"
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            {/* username */}
            <Form.Item<LoginProps>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
              className="mb-6"
            >
              <Input
                placeholder="Enter your email"
                className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
              />
            </Form.Item>
            {/* password */}
            <Form.Item<LoginProps>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              className="mb-6"
            >
              <Input.Password
                placeholder="Enter your password"
                className="p-3 text-lg border-gray-300 rounded-lg focus:border-[#FF782D]"
              />
            </Form.Item>
            <div className="flex justify-between items-center mb-6">
              {/* remember */}
              <div className="min-h-8 flex mt-1 underline px-1">
                <NavLink to={"/forgot-password"}>Forgot password</NavLink>
              </div>
            </div>
            {/* login */}
            <Form.Item>
              <Button
                htmlType="submit"
                shape="round"
                className={`bg-[#FF782D] text-xl text-white py-5 font-exo w-full ${
                  !loading && "hover:bg-[#e66e27]"
                }`}
                disabled={loading}
              >
                {!loading ? "Login" : "Login you in..."}
              </Button>
            </Form.Item>
          </Form>
          <Divider plain className="text-gray-500">
            Or sign in with
          </Divider>
          <div className="flex justify-center">
            <GoogleLoginButton />
          </div>
        </div>
        {is_register_google && (
          <Modal
            open={isOpenModal}
            width={800}
            footer={null}
            onCancel={() => {
              setIsOpenModal(false);
              localStorage.setItem("isNotExist", "");
            }}
          >
            <ModalRegisterGoogle />
          </Modal>
        )}
      </div>
      {/* <ModalRegisterGoogle /> */}
    </>
  );
};

export default Loginpage;
