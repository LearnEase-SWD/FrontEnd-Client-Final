import { Row, Col, Button } from "antd";
// import { LiaCalendarDaySolid } from "react-icons/lia";
import { useCustomNavigate } from "../../hooks/customNavigate";
import { BiSolidArrowFromLeft } from "react-icons/bi";
import { Blog } from "../../models/Blog.model";
// import dayjs from "dayjs";
import BlogCard from "../BlogCard";



// const ArticleCard: React.FC<{ article: Blog }> = ({ article }) => (
//   <Card
//     hoverable
//     cover={
//       <img
//         alt={article.name}
//         src={article.image_url}
//         className="h-48 object-cover"
//       />
//     }
//     className="h-full flex flex-col rounded-3xl overflow-hidden group"
//   >
//     <h2 className="text-lg font-semibold mb-2 group-hover:text-[#FFAB2D] transition">
//       {article.name}
//     </h2>
//     <div className="flex items-center text-gray-500 text-sm mb-2">
//       <LiaCalendarDaySolid className="w-4 h-4 mr-2" />
//       {dayjs(article.created_at).format("DD/MM/YYYY")}
//     </div>
//     <p className="text-gray-600 mb-4 flex-grow">{article.description}</p>
//   </Card>
// );



const LatestArticles = ({ blogs }: { blogs: Blog[]}) => {
  const navigate = useCustomNavigate();
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex sm:flex-row flex-col justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl lg:text-4xl font-bold mb-2">Latest Articles</h2>
            <p   onClick={() => navigate("/blog")} className="text-orange-600 cursor-pointer underline sm:no-underline sm:text-gray-600">Explore our Free Articles </p>
          </div>
          <Button
                  onClick={() => navigate("/blog")}
                  type="default"
                  className="group hidden  sm:flex  hover:bg-orange-500 hover:text-white text-base transition-colors py-6 px-6 rounded-3xl font-jost"
                  style={{
                    backgroundColor: "#0f0f0f",
                    color: "white",
                  }}
                >
                  All Blogs{" "}
                  <BiSolidArrowFromLeft className="group-hover:scale-150 transition " />
                </Button>
        </div>
        <Row gutter={[16, 16]}>
          {blogs.map((blog) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              key={blog._id}
            >
              <BlogCard blog={blog} viewMode="grid" />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default LatestArticles
