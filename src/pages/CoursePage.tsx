import { Layout } from "antd";
import { useEffect, useState } from "react";
import { SearchFilter } from "../components/courses/SearchFilter";
import { SearchResults } from "../components/courses/SearchResult";
import DynamicBreadcrumb from "../components/Breadcrumb/Breadcrumb";
import { Course } from "../models/Course.model";
import ClientService from "../services/client.service";
import { useSearchParams } from "react-router-dom"; // For handling query params
import { Category } from "../models/Category.model";

const pageSize = 9;

export default function CoursesPage() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [noResult, setNoResult] = useState(false);
  const [totalItems, setTotalItems] = useState<number>();
  const initialPageNo = Number(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(initialPageNo);
  const categoryParam = searchParams.get("category");

  const handleSearch = (searchText: string) => {
    setNoResult(false);
    setSearchParams((prevParams) => {
      prevParams.set("search", searchText);
      return prevParams;
    });


    const filteredCourses = searchText
      ? allCourses.filter(course =>
        course.title.toLowerCase().includes(searchText.toLowerCase())
      )
      : allCourses;

    setCourses(filteredCourses);
    setTotalItems(filteredCourses.length);
    setCurrentPage(1);
    setNoResult(filteredCourses.length === 0);
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
    setSearchParams((prevParams) => {
      prevParams.set("page", String(page));
      return prevParams;
    });
  };



  const handleFilterChange = (topicID: string) => {
    setSearchParams((prevParams) => {
      prevParams.set("category", topicID);
      return prevParams;
    });

    // Lọc khóa học theo category_id
    const filteredCourses = topicID
      ? allCourses.filter(course => course.topicID === topicID)
      : allCourses; // Nếu bỏ lọc, hiển thị tất cả

    setCourses(filteredCourses);
    setTotalItems(filteredCourses.length);
    setCurrentPage(1);
    setNoResult(filteredCourses.length === 0);
  };


  const fetchCategories = async () => {
    const response = await ClientService.getCategories();
    setCategories(response?.data ?? []);
  };
  useEffect(() => {
    if (categoryParam) {
      const filteredCourses = allCourses.filter(course => course.topicID === categoryParam);
      setCourses(filteredCourses);
      setTotalItems(filteredCourses.length);
      setCurrentPage(1);
      setNoResult(filteredCourses.length === 0);
    }
  }, [searchParams.get("category"), allCourses]); 

  const paginatedCourses = courses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await ClientService.getCourses();
      const fetchedCourses = response?.data ?? [];

      setAllCourses(fetchedCourses);
      setCourses(fetchedCourses); // Ban đầu hiển thị tất cả khóa học
      setTotalItems(fetchedCourses.length); // Cập nhật tổng số lượng
    };

    fetchCourses();
  }, []);


  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main className="mt-2 min-h-screen mb-40 relative">
      <div className="p-4 pb-0">
        <DynamicBreadcrumb />
      </div>
      <Layout className="relative">
        <SearchResults
          noResult={noResult}
          courses={paginatedCourses}
          onSearch={handleSearch}
          searchQuery={searchParams.get("search") || ""}
          onPaginate={handlePagination}
          totalItems={totalItems}
          pageSize={pageSize}
        />
        <SearchFilter
          onChange={handleFilterChange}
          filters={[
            {
              title: "Search Categories",
              options: categories.map((cat) => ({
                value: cat.topicID,
                label: cat.name,
              })),
            },
          ]}
          selectedFilter={searchParams.get("category") || ""}
        />
      </Layout>
    </main>
  );
}
