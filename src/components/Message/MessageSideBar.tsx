// import { List, Image } from "antd";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const menuItems = [
//   {
//     key: "1",
//     id: "6710e1eba31f13a6d0a5e76a",
//     avatar:
//       "https://th.bing.com/th/id/OIF.f92zJcHDPsX2GsYJcGMzbA?rs=1&pid=ImgDetMain",
//     name: "Elon Musk",
//     description: "I want to hire you for Space X internship",
//     time: "9:45 AM",
//   },
// ];



// const MessageSidebar = ({members} :  any) => {

 
//   const navigate = useNavigate();
//   // api get receiver_id

//   const handleNavigate = (id: string) => {
//     navigate(`/message/${id}`);
//   };

//   return (
//     <div>
//       <p className="font-bold text-4xl ml-3">Chats:</p>
//       <List
//         itemLayout="horizontal"
//         dataSource={members as []}
//         renderItem={(item) => (
//           <List.Item
//             // key={item.key}
//             // onClick={() => handleNavigate(item._id as string)}
//             style={{
//               cursor: "pointer",
//               padding: "8px 16px",
//               borderBottom: "1px solid #f0f0f0", // Dòng chia nhỏ giữa các mục
//               transition: "background-color 0.3s",
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
//             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
//           >
//             {/* Avatar và nội dung */}
//             <List.Item.Meta
//               avatar={
//                 <Image
//                   src={item.avatar}
//                   width={40}
//                   height={40}
//                   style={{
//                     borderRadius: "50%",
//                     border: "2px solid #f0f0f0",
//                     objectFit: "cover",
//                   }}
//                   preview={false}
//                 />
//               }
//               title={
//                 <p
//                   className="font-semibold text-base m-0"
//                   style={{
//                     margin: 0,
//                     overflow: "hidden",
//                     whiteSpace: "nowrap",
//                     textOverflow: "ellipsis", // Dấu ba chấm nếu tên quá dài
//                   }}
//                 >
//                   {item.name}
//                 </p>
//               }
//               description={
//                 <p
//                   className="text-gray-500 text-sm m-0"
//                   style={{
//                     overflow: "hidden",
//                     whiteSpace: "nowrap",
//                     textOverflow: "ellipsis", // Dấu ba chấm nếu mô tả quá dài
//                   }}
//                 >
//                   {item.description}
//                 </p>
//               }
//             />
//             {/* Thời gian tin nhắn */}
//             <span
//               className="text-gray-400 text-xs whitespace-nowrap"
//               style={{ marginLeft: "auto" }}
//             >
//               {item.time}
//             </span>
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// export default MessageSidebar;
