// import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Modal } from "antd";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { AppDispatch, RootState } from "../../redux/store/store";
import ModalRegisterGoogle from "../../components/ModalRegisterGoogle";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import { loginWithGoogle } from "../../redux/slices/authSlices";

export type LoginProps = {
  email: string;
  password: string;
};

const Loginpage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user info in URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const encodedUserInfo = urlParams.get('user');
    const errorParam = urlParams.get('error');

    if (encodedUserInfo) {
      try {
        // Decode and parse user information
        const userInfo = JSON.parse(decodeURIComponent(encodedUserInfo));

        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('accessToken', userInfo.accessToken);

        // Clear URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);

        // Redirect to home page
        navigate('/');
      } catch (error) {
        console.error('Error parsing user info:', error);
        Modal.error({
          title: 'Login Error',
          content: 'Có lỗi xảy ra khi xử lý đăng nhập. Vui lòng thử lại.',
        });
      }
    } else if (errorParam) {
      Modal.error({
        title: 'Login Error',
        content: 'Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.',
      });
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    try {
      window.location.href = "https://localhost:7002/api/auth/loginPage";
    } catch (error) {
      console.error("Error while redirecting to Google login:", error);
      Modal.error({
        title: "Login Error",
        content: "Could not initiate Google login. Please try again.",
      });
    }
  };

  return (
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
          Login
        </h1>

        <div className="flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-2xl" />
            Đăng nhập với Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
