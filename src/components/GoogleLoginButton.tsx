// // GoogleLoginButton.js
// import { useDispatch } from "react-redux"; // Assuming you're using Redux for state management
// import {
//   loginWithGoogle,
//   setIsLoginGoogleStart,
//   // setIsLoginGoogleStart,
// } from "../redux/slices/authSlices"; // Adjust the import path
// import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
// import { AppDispatch } from "../redux/store/store";
import { FcGoogle } from "react-icons/fc";
const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5121/api/auth/login";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 transition"
    >
      <FcGoogle className="text-2xl" />
      Đăng nhập với Google
    </button>
  );
};

export default GoogleLoginButton;
