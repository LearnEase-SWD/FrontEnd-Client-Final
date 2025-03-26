import { List, Card, Avatar, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const data = [
  {
    fullname: "Maria Lee",
    avatar: "https://picsum.photos/id/237/200/300",
  },
  {
    fullname: "Samuel Kim",
    avatar: "https://picsum.photos/id/237/200/300",
  },
];

const InstructorSubscribed = () => {
  return (
    <div className="pt-5">
      <Input
        placeholder="Search By Subscribed Name"
        prefix={<SearchOutlined />}
        style={{ width: "45%", marginBottom: "20px", borderRadius: "4px" }}
      />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card hoverable>
              <Card.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.fullname}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default InstructorSubscribed;
