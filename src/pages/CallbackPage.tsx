import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../redux/slices/authSlices";// Đảm bảo đúng đường dẫn

const CallbackPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy params từ URL
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const userEmail = params.get("userEmail");
    const userName = params.get("userName");

    if (accessToken) {
      dispatch<any>(loginWithGoogle({ accessToken, userEmail, userName }))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default CallbackPage;
