// import React, { useEffect } from "react";
// import { Layout } from "antd";
// import MessageSidebar from "./MessageSideBar";
// import MessageNavbar from "./MessageNavbar";
// import { Outlet } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../redux/store/store";
// import { getConversationList } from "../../redux/slices/conversationSlice";
// import { User } from "../../models/UserModel";

// const { Content, Sider } = Layout;

// const MessageLayout: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const {members} = useSelector((state:RootState) => state.conversation)

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user") || "{}") as User;
//     dispatch(getConversationList(user._id))
//   },[])
//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* Navbar */}
//       <MessageNavbar />
//       <Layout style={{ marginTop: "80px" }}>
//         {/* Sidebar */}
//         <Sider
//           width={300}
//           style={{
//             backgroundColor: "#fff",
//             boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
//             borderRight: "1px solid #f0f0f0",
//             padding: "16px 0",
//           }}
//         >
//           <MessageSidebar members = {members} />
//         </Sider>
//         {/* Main Content */}
//         <Content
//           style={{
//             padding: "24px",
//             backgroundColor: "#fff",
//             borderRadius: "15px",
//             marginLeft: "16px",
//           }}
//         >
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default MessageLayout;
