import { Row, Col, Card, Skeleton } from 'antd';
import BlogCard from '../BlogCard';
import { Blog } from '../../models/Blog.model';


interface BlogsGridProps {
  viewMode: "grid" | "list";
  blogs: Blog[];
}


const BlogCardSkeleton = ({ viewMode }: { viewMode: "grid" | "list" }) => {
  const isListMode = viewMode === "list";
  
  return (
    <div className="group relative">
      <Card
        
        styles={{
          body: {
            height: "100%",
            width: "100%",
          },
        }}
        cover={
          <div className="relative">
            <Skeleton.Image 
              active
              style={{ 
                width: '100%',
                height: '100%',
              }}
              className={`${
                isListMode ? "min-w-[200px] w-[200px] md:min-w-[250px] md:w-[250px]" : "w-full min-w-full"
              } h-56 `}
            />
            
          </div>
        }
        className={`${isListMode && "h-[200px] md:"}h-full rounded-3xl overflow-hidden group font-jost ${
          isListMode ? "flex" : ""
        }`}
      >
        <div className="flex-grow">
          {/* Instructor name */}
          <Skeleton.Button 
            active 
            size="small" 
            style={{ width: 100, height: 16, marginBottom: 8 }} 
            className="text-gray-500 text-sm"
          />
          
          {/* Course title */}
          <Skeleton 
            active 
            paragraph={{ rows: 1, width: ['90%'] }}
            title={false}
            className="mb-4"
          />

          {/* Stats grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-2 justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Skeleton.Button active size="small" style={{ width: 60, height: 16 }} />
            </div>
            <div className="flex items-center justify-end">
              <Skeleton.Button active size="small" style={{ width: 60, height: 16 }} />
            </div>
            <div className="flex items-center">
              <Skeleton.Button active size="small" style={{ width: 80, height: 16 }} />
            </div>
          </div>

          {/* Price and View More */}
          <div className="flex justify-between items-center">
            <Skeleton.Button 
              active 
              size="small" 
              style={{ width: 60, height: 24 }}
              className="text-lg font-bold text-orange-500"
            />
            
          </div>
        </div>
      </Card>
    </div>
  );
};



export default function BlogsGrid({ viewMode, blogs }: BlogsGridProps) {
  const skeletonArray = Array(6).fill(null);

  return (
    <Row gutter={[20, 20]} className="mt-8">
      {blogs.length<1 ? (
        // Render skeletons while loading
        skeletonArray.map((_, index) => (
          <Col
            key={index}
            xs={24}
            sm={viewMode === "list" ? 24 : 12}
            md={viewMode === "list" ? 24 : 12}
            lg={viewMode === "list" ? 24 : 12}
            xl={viewMode === "list" ? 24 : 8}
          >
            <BlogCardSkeleton viewMode={viewMode} />
          </Col>
        ))
      )
      : (blogs.map((blog) => (
        <Col
          xs={24}
          sm={viewMode === "list" ? 24 : 12}
          md={viewMode === "list" ? 24 : 12}
          lg={viewMode === "list" ? 24 : 12}
          xl={viewMode === "list" ? 24 : 8}
          key={blog._id}
        >
          <BlogCard blog={blog} viewMode={viewMode} />
        </Col>
      )))}
    </Row>
  );
}