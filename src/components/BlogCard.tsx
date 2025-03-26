import { Button, Card, Tag } from "antd";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { Blog } from "../models/Blog.model";
import dayjs from "dayjs";
import { useCustomNavigate } from "../hooks/customNavigate";

interface BlogCardProps {
  blog: Blog;
  viewMode: "grid" | "list";
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, viewMode }) => {
  const navigate = useCustomNavigate();
  return (
    <a
      href={`/blog/${blog._id}`}
      onClick={(event) => {
        event.preventDefault();
        // Open the detail page of the blog
        navigate(`/blog/${blog._id}`);
      }}
    >
      <Card
        hoverable
        styles={{
          body: {
            height: "100%",
            width: "100%",
          },
        }}
        cover={
          <div className="relative">
            <img
              alt={blog.name}
              src={blog.image_url}
              className={`${
                viewMode === "list"
                  ? "min-w-[200px]  w-[200px] md:min-w-[250px] md:w-[250px]"
                  : "w-full"
              } h-40 sm:h-56 object-cover`}
            />
            <Tag className="absolute top-2 left-2 bg-black text-white">
              {blog.category_name}
            </Tag>
          </div>
        }
        className={`h-full rounded-3xl overflow-hidden group font-jost hover:-translate-y-2 transition-all duration-500 ${
          viewMode === "list" ? "flex" : ""
        }`}
      >
        <div className="flex-grow">
          <p className="text-gray-500 text-sm mb-2">by {blog.user_name}</p>
          <h2 className="text-base font-semibold mb-4 overflow-ellipsis overflow-hidden whitespace-nowrap transition group-hover:text-[#FFAB2D]">
            {blog.name}
          </h2>
        </div>
        <div>
          <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-between text-sm text-gray-500 mb-4">
            <span className="flex items-center">
              <AiOutlineCalendar className="mr-1 text-orange-500" size={18} />
              {dayjs(blog.created_at).format("DD/MM/YYYY")}
            </span>
            {/* <span className="flex items-center justify-end">
              <TiUserOutline className="mr-1 text-orange-500" size={20} />
              {blog.user_name}
            </span> */}
            <span
              className="flex items-center"
            >
              <BiCategory className="mr-1 text-orange-500 flex-shrink-0" size={18} />
              <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">   
                {blog.description}
              </span>
            </span>
          </div>

          <div className="flex justify-between items-center">
            <Button type="link" className="text-blue-600 hover:text-blue-800">
              Read More
            </Button>
          </div>
        </div>
      </Card>
    </a>
  );
};

export default BlogCard;
