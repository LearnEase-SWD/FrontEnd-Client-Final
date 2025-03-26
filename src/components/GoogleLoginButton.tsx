// GoogleLoginButton.js
import { useDispatch } from "react-redux"; // Assuming you're using Redux for state management
import {
  loginWithGoogle,
  setIsLoginGoogleStart,
  // setIsLoginGoogleStart,
} from "../redux/slices/authSlices"; // Adjust the import path
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { AppDispatch } from "../redux/store/store";

const GoogleLoginButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleGoogleLogin = (response: CredentialResponse) => {
    dispatch(setIsLoginGoogleStart(response?.credential));
    console.log(response?.credential);
    dispatch(loginWithGoogle(response?.credential as string));
  };

  return <GoogleLogin onSuccess={handleGoogleLogin} />;
};

export default GoogleLoginButton;
