import { Layout } from "antd";
import { useEffect, useState } from "react";
import { SearchFilter } from "../components/courses/SearchFilter";
import { SearchResults } from "../components/courses/SearchResult";
import DynamicBreadcrumb from "../components/Breadcrumb/Breadcrumb";
import { Course } from "../models/Course.model";
import { GetCategoriesClient, GetCourseClient } from "../models/Client.model";
import ClientService from "../services/client.service";
import { useSearchParams } from "react-router-dom"; // For handling query params
import { Category } from "../models/Category.model";

const initialCoursesParams: GetCourseClient = {
  pageInfo: {
    pageNum: 1,
    pageSize: 9,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
    category_id: "",
  },
};

const initialCategoriesParams: GetCategoriesClient = {
  pageInfo: {
    pageNum: 1,
    pageSize: 100,
  },
  searchCondition: {
    keyword: "",
    is_deleted: false,
  },
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [noResult, setNoResult] = useState(false);
  const [totalItems, setTotalItems] = useState<number>();


  const initialKeyword = searchParams.get("search") || "";
  const initialCategoryId = searchParams.get("category") || "";
  const initialPageNo = Number(searchParams.get("page") || 1);

  const [coursesParams, setCoursesParams] = useState<GetCourseClient>({
    pageInfo: {
      pageNum: initialPageNo,
      pageSize: initialCoursesParams.pageInfo.pageSize
    },
    searchCondition: {
      ...initialCoursesParams.searchCondition,
      keyword: initialKeyword,
      category_id: initialCategoryId,
    },
  });

  const handleSearch = (searchText: string) => {
    setNoResult(false);
    setCourses([])
    setSearchParams((prevParams) => {
      prevParams.set("search", searchText);
      return prevParams;
    });
    setCoursesParams((prevParams) => ({
      ...prevParams,
      searchCondition: {
        ...prevParams.searchCondition,
        keyword: searchText,
      },
      pageInfo: {
        ...prevParams.pageInfo, 
        pageNum: 1,
      },
    }));
  };
  const handlePagination = (page: number) => {
    window.scrollTo(0,0)
    setNoResult(false);
    setCourses([])
    setSearchParams((prevParams) => {
      prevParams.set("page", String(page));
      return prevParams;
    });

    setCoursesParams((prevParams) => ({
      ...prevParams,
      searchCondition: {
        ...prevParams.searchCondition,
      },
      pageInfo: {
        ...prevParams.pageInfo,
        pageNum: page
      },
    }));
  }

  const handleFilterChange = (value: string) => {
    setNoResult(false);
    setCourses([])
    setSearchParams((prevParams) => {   
      prevParams.set("category", value);     
      return prevParams;
    });
    setCoursesParams((prevParams) => ({
      ...prevParams,
      searchCondition: {
        ...prevParams.searchCondition,
        category_id: value,
      },
      pageInfo: {
        ...prevParams.pageInfo,
        pageNum: 1,
      },
    }));
  };

  const fetchCategories = async () => {
    const response = await ClientService.getCategories();
    setCategories(response?.data ?? []);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await ClientService.getCourses();
      if (response.data === null) setNoResult(true);
      setCourses(response?.data ?? []);
      setTotalItems(response?.data?.pageInfo?.totalItems);
    };

    fetchCourses();
  }, [coursesParams]);

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
          courses={courses}
          onSearch={handleSearch}
          searchQuery={coursesParams.searchCondition.keyword}
          onPaginate={handlePagination}
          totalItems={totalItems}
        />
        <SearchFilter
          onChange={handleFilterChange}
          filters={[
            {
              title: "Search Categories",
              options: categories.map((cat) => ({
                value: cat._id,
                label: cat.name,
              })),
            },
          ]}
          selectedFilter={coursesParams.searchCondition.category_id}
        />
      </Layout>
    </main>
  );
}
