import { useParams } from "react-router-dom";
import { BlogHeader } from "../components/BlogDetailPage/Header";
import { TagList } from "../components/BlogDetailPage/TagList";
import { RecentBlog } from "../components/BlogDetailPage/RecentBlog";
// import { Comment } from "../components/BlogDetailPage/Comment";
// import { LeaveAComment } from "../components/LeaveAComment";
import { Blog } from "../models/Blog.model";
import { useEffect, useState } from "react";
import BlogDetailSkeleton from "../components/Blogs/BlogDetailSkeleton";
import ClientService from "../services/client.service";
import parse from "html-react-parser";
import dayjs from "dayjs";
import { GetBlogsClient } from "../models/Client.model";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog>();
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const response = await ClientService.getBlogDetail(id);
          if (response.data) {
            setBlog(response.data);
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    window.scrollTo(0, 0);
    fetchBlogs();
  }, [id]);

  const blogsParams: GetBlogsClient = {
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
    searchCondition: {
      keyword: "",
      is_deleted: false,
      category_id: "",
    },
  };

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await ClientService.getBlogs(blogsParams);
        setAllBlogs(response?.data?.pageData ?? []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchAllBlogs();
  }, []);

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const renderContent = (content: string) => {
    return parse(content, {
      replace: (domNode: any) => {
        if (domNode.name === "oembed" && domNode.attribs?.url) {
          const url = domNode.attribs.url;
          return (
            <iframe
              width="100%"
              height="400"
              src={url.replace("youtu.be", "youtube.com/embed")}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          );
        }
      },
    });
  };

  // Sort blogs by created_at in descending order and get the top 2
  const recentBlogs = allBlogs
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 2);

  return (
    <div className="font-exo flex mt-6">
      <div className="lg:w-3/4 w-full">
        <BlogHeader
          title={blog.name}
          date={dayjs(blog.created_at).format("DD/MM/YYYY")}
          creator={blog.user_name}
        />
        <div className="w-full">
          {blog.image_url && (
            <img
              src={blog.image_url}
              alt={blog.name}
              className="w-96 h-96 mb-4"
            />
          )}
          {renderContent(blog.content)}
        </div>
        <TagList tags={blog.tags || []} />
        <div className="mb-20">
          <h2 className="text-lg font-semibold mt-8">Recent Blogs</h2>
          <div className="flex-wrap gap-4 sm:flex">
            {recentBlogs.map((recentBlog) => (
              <RecentBlog
                key={recentBlog._id}
                blog_id={recentBlog._id}
                name={recentBlog.name}
                created_at={recentBlog.created_at}
                user_name={recentBlog.user_name}
                description={recentBlog.description}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="lg:w-1/4 hidden"></div>
    </div>
  );
};

export default BlogDetailPage;
