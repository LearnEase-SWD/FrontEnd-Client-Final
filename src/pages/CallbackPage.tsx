import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../redux/slices/authSlices";// Đảm bảo đúng đường dẫn
import axios from "axios";

type GetUserIdType = {
  userEmail: string;
  userId: string;
  id: string
};
const CallbackPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const userEmail = params.get("userEmail");
    console.log(window.location.search);
    if (accessToken && userEmail) {

      localStorage.setItem("token", accessToken);

      localStorage.setItem("userEmail", "tranthib@example.com");
      const fetchuser = async () => {
        try {
          const response = await axios.get<GetUserIdType>(`https://localhost:7002/api/users/email/${userEmail}`);
          const getUser = response.data; // Extract the data from the response
          localStorage.setItem("userId", "user-2");
        } catch (error) {
          console.error("Failed to fetch courses:", error);
        }
      };
      fetchuser();
      dispatch<any>(loginWithGoogle({ accessToken, userEmail }))
        .unwrap()
        .then(() => {
          navigate("/");  // Redirect to home page or dashboard
        })
        .catch(() => {
          navigate("/login");  // Redirect to login page if there is an error
        });
    } else {
      navigate("/login");  // If parameters are missing, redirect to login
    }
  }, [dispatch, navigate]);

  return <div>Đang xử lý đăng nhập...</div>;  // Display a loading message
};

export default CallbackPage;


