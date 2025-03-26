import { Input, Button, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { ChangeEvent, useState } from "react";
import { forgotPassword } from "../../services/auth.service"; 
import { NavLink } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");

  const { loading, success } = useSelector(
    (state: RootState) => state.users.forgotPassword
  );
  const dispatch = useDispatch();
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOnClick = async () => {
    forgotPassword(email, dispatch);
  };

  return (
    <div className="flex justify-center items-center my-20">
      <div>
        {/* Success Notification */}
        {success && (
          <div className="my-4">
            <Alert
              showIcon
              description={
                <>
                  We sent an email to <strong>{email}</strong> with instructions to reset your password.
                  <br />
                  If you do not receive a password reset message <strong>after 1 minute</strong>, verify that you entered
                  <br />
                  the correct email address, or check your spam folder. Click here to <NavLink to={"/login"} className="text-[#FF782D] hover:underline">
                  log in
                  </NavLink>
                </>
              }
              type="success"
              message="Check Your Mail"
              closable
            />
          </div>
        )}

        <h1 className="text-center text-2xl font-extrabold my-4 md:text-4xl lg:text-6xl lg:font-bold lg:my-7">
          Forgot Password
        </h1>
        <p className="text-center font-bold mb-4 md:mb-8">
          Enter your email address and we'll send you instructions to create a new password.
        </p>
        <Input
          className="mb-5 p-3"
          placeholder="Email"
          onChange={handleOnChange}
          value={email}
        />
        <div>
          <Button
            className="w-full bg-[#FF782D] text-xl text-white py-5"
            onClick={handleOnClick}
            loading={loading} 
          >
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
