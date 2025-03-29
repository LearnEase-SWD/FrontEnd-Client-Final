import { useDispatch } from "react-redux";
import { loginWithGoogle, LoginWithGooglePayload, LoginWithGoogleReturn } from "../redux/slices/authSlices";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { RootState } from "../redux/store/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

interface MessageData {
    accessToken: string;
}

const GoogleLoginButton: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> & Dispatch<AnyAction> = useDispatch();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const authWindow = window.open("http://localhost:5121/api/auth/login", "_blank");

            if (authWindow) {
                const handleMessage = async (event: MessageEvent) => {
                    if (event.origin === "http://localhost:5121") {
                        authWindow?.close();
                        window.removeEventListener("message", handleMessage);

                        if (!event.data || typeof event.data.accessToken !== "string") {
                            console.error("Invalid access token received");
                            Modal.error({
                                title: "Login Error",
                                content: "Invalid access token received",
                            });
                            return;
                        }

                        const accessToken = (event.data as MessageData).accessToken;

                        try {
                            const response = await axios.get<{ accessToken: string, userEmail: string }>(
                                `http://localhost:5121/api/auth/google-login?accessToken=${accessToken}`
                            );
                            const userData = response.data;

                            dispatch(
                                loginWithGoogle({
                                    accessToken: userData.accessToken,
                                    userEmail: userData.userEmail,
                                })
                            )
                                .unwrap()
                                .then(() => {
                                    console.log("Login successful");
                                    navigate("/");
                                })
                                .catch((err: any) => {
                                    console.error("Login failed:", err);
                                    Modal.error({
                                        title: "Login Error",
                                        content: err.message || "Login failed.",
                                    });
                                });
                        } catch (apiError: any) {
                            console.error("API request failed:", apiError);
                            Modal.error({
                                title: "Login Error",
                                content: "API request failed.",
                            });
                        }
                    }
                };

                window.addEventListener("message", handleMessage, false);
            } else {
                console.error("Failed to open authentication window.");
                Modal.error({
                    title: "Login Error",
                    content: "Failed to open authentication window.",
                });
            }
        } catch (error: any) {
            console.error("Google login error:", error);
            Modal.error({
                title: "Login Error",
                content: "Google login error.",
            });
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