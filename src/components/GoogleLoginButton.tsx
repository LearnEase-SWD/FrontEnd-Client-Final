// GoogleLoginButton.js
import { useDispatch } from "react-redux";
import { loginWithGoogle } from "../redux/slices/authSlices";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const GoogleLoginButton = () => {
    const dispatch = useDispatch();

    const handleGoogleLogin = async () => {
      try {
        const authWindow = window.open("http://localhost:5121/api/auth/loginPage", "_blank");
    
        if (authWindow) {
          const handleMessage = async (event: MessageEvent) => {
            if (event.origin === "http://localhost:5121") {
              authWindow?.close();
              window.removeEventListener("message", handleMessage);
    
              // Kiểm tra xem event.data có accessToken không
              if (!event.data || typeof event.data.accessToken !== "string") {
                console.error("Invalid access token received");
                return;
              }
    
              const accessToken: string = event.data.accessToken;
    
              try {
                const response = await axios.get<{ accessToken: string }>(
                  `https://localhost:7002/api/auth/google-login?accessToken=${accessToken}`
                );
    
                const token = response.data.accessToken;
    
                // Kiểm tra kiểu của dispatch trước khi gọi
                if (typeof dispatch === "function") {
                  dispatch<any>(loginWithGoogle({ accessToken: token, userEmail: null, userName: null }))
                    .unwrap()
                    .then(() => {
                      console.log("Login successful");
                    })
                    .catch((err: unknown) => {
                      console.error("Login failed:", err);
                    });
                } else {
                  console.error("Dispatch is not a function");
                }
              } catch (apiError) {
                console.error("API request failed:", apiError);
              }
            }
          };
    
          window.addEventListener("message", handleMessage, false);
        } else {
          console.error("Failed to open authentication window.");
        }
      } catch (error) {
        console.error("Google login error:", error);
      }
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