import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Input, Spin } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  resendTokenEmail,
  verifyTokenEmail,
} from "../../services/auth.service";
// import { AuthRequest } from "../../services/apiAuthRequest";

// khi click vao link thi no se load de kiem tra con token co ton tai ko
// ton tai thi thong bao success va 5 giay sau se tro ve trang login
// ko ton tai thi no se thong bao fail va cho minh nut button de resend lai
const VerifySuccessToken = () => {
 
  const { verification_id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const [emailResend, setEmailResend] = useState("");

  const { verifyToken, resendToken } = useSelector(
    (state: RootState) => state.auth
  );
  console.log(verification_id);
  useEffect(() => {
    verifyTokenEmail(verification_id as string, dispatch);
  }, [verification_id, dispatch]);

  // automatically navigate to login after 5s
  useEffect(() => {
    if (verifyToken.success) {
      const timer = setTimeout(() => {
        window.location.href = "/login";
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [verifyToken.success]);

  const handleResendToken = () => {
    resendTokenEmail(emailResend, dispatch);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailResend(e.target.value);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="shadow-lg rounded-lg w-full max-w-lg p-6 bg-white">
        {verifyToken.loading ? (
          <Spin />
        ) : (
          <div className="flex flex-col items-center">
            <Player
              src={
                verifyToken.success
                  ? `https://lottie.host/c44385c4-2fe6-4f31-ad79-360aa6a07cf8/LBhRQt2hpO.json`
                  : `https://lottie.host/07813174-03b1-4bca-be3d-40a7d6c5ca14/houbQ26KG4.json`
              }
              loop
              autoplay
              className="h-60 w-full mb-6"
              renderer="canvas"
            />
            <h2 className="text-4xl font-medium my-5 text-center">
              Verify{" "}
              <span>{verifyToken.success ? "Successfully" : "Failed"}</span>
            </h2>
            <div className="w-full px-6">
              {verifyToken.success ? (
                <div className="text-blue-500 text-lg text-center">
                  Your email has been verified. Please{" "}
                  <NavLink to={"/login"}>
                    <span className="underline hover:text-[#FF782D]">
                      click here
                    </span>
                  </NavLink>{" "}
                  to return to the login page.
                </div>
              ) : (
                <div className="text-red-500 text-lg text-center">
                  Verification token has expired. Please input your email below
                  to receive a new verification link.
                </div>
              )}

              <div className="mt-6">
                {verifyToken.success ? (
                  <div>{/* Auto-redirect after 5 seconds to login */}</div>
                ) : (
                  <div className="flex gap-4">
                    <Input
                      placeholder="Enter your email"
                      className="w-full"
                      size="large"
                      onChange={handleInputChange}
                    />
                    <Button
                      className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                      color="primary"
                      size="large"
                      onClick={handleResendToken}
                    >
                      {resendToken.loading ? <Spin /> : <span> Re-verify</span>}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifySuccessToken;
