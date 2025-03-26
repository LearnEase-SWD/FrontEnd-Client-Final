import React, { useState, useEffect } from "react";

const MessageContent: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true); // Trạng thái hiển thị intro
  const [showDescription, setShowDescription] = useState(false); // Trạng thái hiển thị description

  useEffect(() => {
    // Tắt intro sau 3 giây và hiển thị description
    const introTimeout = setTimeout(() => {
      setShowIntro(false);
      setShowDescription(true);
    }, 3000);

    return () => clearTimeout(introTimeout); // Dọn dẹp timeout
  }, []);

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: showIntro ? "#000" : "#f5f5f5", // Đổi nền
        color: "#fff",
        transition: "background-color 1s ease", // Hiệu ứng nền mượt mà
        height: "calc(100vh - 80px)", // Trừ chiều cao navbar nếu có
        overflow: "hidden",
      }}
    >
      {/* Intro Text */}
      {showIntro && (
        <div
          className="relative"
          style={{
            display: "inline-block",
            overflow: "hidden", // Giới hạn nội dung chữ
          }}
        >
          <h1
            className="text-4xl font-bold text-center"
            style={{
              position: "relative",
              animation: "slideIn 1s ease forwards", // Trượt chữ từ trái sang phải
            }}
          >
            Welcome To Our Chat System
          </h1>
          <div
            className="mx-auto mt-2"
            style={{
              height: "4px",
              backgroundColor: "#fff",
              borderRadius: "50%",
              animation: "curveExpand 1s ease forwards", // Đường cong mở rộng
              animationDelay: "0.5s", // Delay một chút cho khớp chữ
            }}
          ></div>
        </div>
      )}

      {/* Description Text */}
      {showDescription && (
        <div
          className="relative mt-8"
          style={{
            display: "inline-block",
            overflow: "hidden",
          }}
        >
          <h2
            className="text-lg font-medium text-gray-700"
            style={{
              color: "#333",
            }}
          >
            Choose a conversation to start messaging
          </h2>
          <div
            className="mx-auto mt-2"
            style={{
              height: "4px",
              backgroundColor: "#333",
              borderRadius: "50%",
            }}
          ></div>
        </div>
      )}

      {/* Animation Keyframes */}
      <style>
        {`
          /* Hiệu ứng chữ trượt từ trái sang phải */
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          /* Hiệu ứng đường cong mở rộng */
          @keyframes curveExpand {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MessageContent;
