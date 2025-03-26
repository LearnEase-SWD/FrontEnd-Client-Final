import { Button, Card, Input, Modal, Table, Select, Tag } from "antd";
import {
  SearchOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CreateBlog from "./blog/CreateBlog";
import DeleteBlog from "./blog/DeleteBlog";
import { Blog } from "../../models/Blog.model";
import { BlogSearchParams } from "../../models/SearchInfo.model";
import BlogService from "../../services/blog.service";
import EditBlog from "./blog/EditBlog";
import { ellipsisText } from "../../utils/ellipsisText";

const BlogManagement = () => {
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [editBlogData, setEditBlogData] = useState<Blog | null>(null);
  const [fetchedBlogs, setFetchedBlogs] = useState<Blog[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // const [loading, setLoading] = useState(false);

  // Fetch blogs initially
  const fetchBlogs = async () => {
    // setLoading(true);
    try {
      const searchParams: BlogSearchParams = {
        searchCondition: {
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 100,
        },
      };
      const res = await BlogService.getBlogs(searchParams);
      const pageData = res.data?.pageData ?? [];
      setFetchedBlogs(pageData);
      setBlogs(pageData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Open the Create Blog Modal
  const showModalCreate = () => setIsModalCreateVisible(true);

  const handleSearch = () => {
    // setLoading(true);
    const lowerCaseTags = selectedTags.map((tag) => tag.toLowerCase());

    setTimeout(() => {
      const filteredBlogs = fetchedBlogs.filter((blog) => {
        const blogTagsLowercase = blog.tags.map((tag) => tag.toLowerCase());
        const nameMatch = blog.name
          .toLowerCase()
          .includes(searchText.toLowerCase());

        const tagsMatch =
          lowerCaseTags.length === 0 ||
          lowerCaseTags.every((tag) => blogTagsLowercase.includes(tag));

        return nameMatch && tagsMatch;
      });

      setBlogs(filteredBlogs);
      // setLoading(false);
    }, 300);
  };

  // Open the Delete Blog Modal
  const showModalDelete = (id: string) => {
    setDeleteId(id);
    setIsModalDeleteVisible(true);
  };

  // Open the Edit Blog Modal
  const showModalEdit = (blogData: Blog) => {
    setEditBlogData(blogData);
    setIsModalEditVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tag",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => {
        return <div>{ellipsisText(description, 50)}</div>;
      },
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (imageUrl: string) => (
        <img
          src={imageUrl}
          alt="Blog"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (createdAt: Date) => dayjs(createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "Actions",
      key: "action",
      render: (record: Blog) => (
        <>
          <Button
            type="text"
            icon={<EditOutlined style={{ color: "blue" }} />}
            onClick={() => showModalEdit(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => showModalDelete(record._id)}
          />
        </>
      ),
    },
  ];

  return (
    <Card>
      <div className="flex">
        <h3 className="text-2xl my-5">Blog Management</h3>
      </div>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Input
            placeholder="Search By Blog Name"
            prefix={<SearchOutlined />}
            className="rounded w-full ml-0 md:w-1/3"
            style={{ minWidth: "350px" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            mode="tags"
            placeholder="Search by Tags"
            value={selectedTags}
            onChange={(value) => setSelectedTags(value)}
            className="w-full ml-0 md:w-1/4"
            style={{ minWidth: "300px" }}
          />
          <Button
            onClick={handleSearch}
            icon={<SearchOutlined />}
            shape="round"
            type="primary"
            className="w-full md:w-auto"
          >
            Search
          </Button>
        </div>

        <Button
          onClick={showModalCreate}
          icon={<PlusCircleOutlined />}
          shape="round"
          type="primary"
          className="w-full md:w-auto mt-2 md:mt-0"
        >
          Add New Blog
        </Button>
      </div>

      <Table
        dataSource={blogs}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
        bordered
        scroll={{ x: true }}
      />

      {isModalEditVisible && editBlogData && (
        <Modal
          title="Edit Blog"
          visible={isModalEditVisible}
          onCancel={() => setIsModalEditVisible(false)}
          width="80%"
          style={{ top: 20 }}
          bodyStyle={{ height: "68vh", padding: 0 }}
          footer={null}
        >
          <EditBlog
            initialValues={editBlogData}
            onSuccess={() => {
              setIsModalEditVisible(false);
              fetchBlogs();
            }}
          />
        </Modal>
      )}

      {isModalDeleteVisible && deleteId && (
        <DeleteBlog
          id={deleteId}
          onSuccess={fetchBlogs}
          onCancel={() => setIsModalDeleteVisible(false)}
        />
      )}

      <Modal
        title="Create Blog"
        open={isModalCreateVisible}
        onCancel={() => setIsModalCreateVisible(false)}
        width="80%"
        style={{ top: 20 }}
        bodyStyle={{ height: "68vh", padding: 0 }}
        footer={null}
      >
        <CreateBlog
          onSuccess={() => {
            setIsModalCreateVisible(false);
            fetchBlogs();
          }}
        />
      </Modal>
    </Card>
  );
};

export default BlogManagement;
