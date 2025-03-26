// import React, { useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Avatar, Input } from "antd";
// import dayjs from "dayjs";
// import { Message, MessageSearchParams } from "../../models/Message.model";
// import MESSAGE_SERVICE from "../../services/message.service";
// import { io } from "socket.io-client";

// const { TextArea } = Input;

// const users = [
//   {
//     id: "6710e1eba31f13a6d0a5e76a",
//     name: "Elon Musk",
//     avatar:
//       "https://th.bing.com/th/id/OIF.f92zJcHDPsX2GsYJcGMzbA?rs=1&pid=ImgDetMain",
//   },
// ];


// const MessageDetailPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   // const id = "6712949129117a114223f294"
//   // const  [messageSearchParams]  =
//   //   useState<MessageSearchParams>({
//   //     receiver_id: "6710e1eba31f13a6d0a5e76a",
//   //     content: "",
//   // });

//   // const [message, setMessage] = useState<Message>({} as Message);




//   // const [messages, setMessages] = useState<Message[]>([]);
//   // const messages = [
//   //   ...listMessage
//   //   // {
//   //   //   id: 1,
//   //   //   sender: "1",
//   //   //   content: "Hello! How are you?",
//   //   //   sentByMe: false,
//   //   //   timestamp: dayjs("2024-11-18T09:30:00"),
//   //   // },
  
//   // ];
//   // console.log("list message", listMessage)

//   // Tìm thông tin người dùng dựa trên id
//   const user = users.find((user) => user.id === id);

//   // Nếu không tìm thấy user, trả về sớm

//   // const userMessages = useMemo(() => {
//   //   return messages.filter(
//   //     (message) => message.sender_id === id || message.sender_id
//   //   );
//   // }, [id]);

//   // Kết nối đến server khi component mount
//   useEffect(() => {
//     const newSocket = io("https://edumaster-api-dev.vercel.app"); // Kết nối với server

//     // Lắng nghe sự kiện từ server
//     newSocket.on("connection", (data) => {
//       console.log("Received from server:", data);
//     });

//     return () => {
//       newSocket.disconnect(); // Ngắt kết nối khi component unmount
//     };
//   }, []);
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const res = await MESSAGE_SERVICE.getMessages();
//   //     setMessages(res.data?.listMessage || [])
//   //   };
//   //   fetchData();
//   // }, [messageSearchParams]);
//   if (!user) {
//     return <div>User not found</div>;
//   }
//   const formatDate = (date :Date) => {
//     return dayjs(date).format("DD/MM/YYYY HH:mm");
//   };

//   return (
//     <div
//       className="flex flex-col h-full"
//       style={{
//         height: "calc(100vh - 80px)", // Trừ chiều cao navbar
//         padding: "16px",
//         backgroundColor: "#f5f5f5",
//       }}
//     >
//       {/* Header: Thông tin người dùng */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           paddingBottom: "16px",
//           borderBottom: "1px solid #ddd",
//           marginBottom: "16px",
//         }}
//       >
//         <Avatar src={user.avatar} size="large" />
//         <h2 style={{ marginLeft: "12px", fontWeight: "bold" }}>{user.name}</h2>
//       </div>

//       {/* Message Container */}
//       <div
//         className="flex-1 overflow-y-auto"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "12px",
//           padding: "16px",
//           backgroundColor: "#fff",
//           borderRadius: "10px",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         {messages?.map((message) => (
//           <div
//             key={message._id}
//             className={`flex ${
//               message.sender_id ? "justify-end" : "justify-start"
//             }`}
//             style={{
//               gap: "8px",
//               alignItems: "flex-start",
//               position: "relative",
//             }}
//           >
//             {/* Avatar và tên người gửi */}
//             {!message.sender_id && (
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <Avatar src={user.avatar} size="large" />
//               </div>
//             )}
//             {/* Bong bóng tin nhắn */}
//             <div
//               style={{
//                 maxWidth: "70%",
//                 padding: "10px 14px",
//                 borderRadius: "10px",
//                 backgroundColor: message.sender_id ? "#d9f7be" : "#f0f0f0",
//                 wordWrap: "break-word",
//                 textAlign: message.sender_id ? "right" : "left",
//                 boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               {message.content}
//             </div>
//             {/* Hiển thị thời gian ngay bên dưới tin nhắn */}
//             <div
//               style={{
//                 fontSize: "10px",
//                 color: "#888",
//                 marginTop: "4px",
//                 position: "absolute",
//                 bottom: "-14px",
//                 left: message.sender_id ? "auto" : "0",
//                 right: message.sender_id ? "0" : "auto",
//               }}
//             >
//               {formatDate(message.timestamp)}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input để gửi tin nhắn */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           padding: "12px",
//           backgroundColor: "#fff",
//           borderTop: "1px solid #ddd",
//           marginTop: "16px",
//         }}
//       >
//         <TextArea
//           placeholder="Type your message here..."
//           autoSize={{ minRows: 1, maxRows: 4 }}
//           style={{
//             flex: 1,
//             marginRight: "8px",
//             borderRadius: "8px",
//             resize: "none",
//           }}
//         />
//         <button
//           style={{
//             padding: "8px 16px",
//             backgroundColor: "#1890ff",
//             color: "#fff",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MessageDetailPage;
