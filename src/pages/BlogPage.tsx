'use client'

import { Layout } from "antd"
import { useEffect, useState } from "react"
import { SearchFilter } from "../components/Blogs/SearchFilter"
import { SearchResults } from "../components/Blogs/SearchResults"
import DynamicBreadcrumb from "../components/Breadcrumb/Breadcrumb"
import { useSearchParams } from "react-router-dom"
import { Blog } from "../models/Blog.model"
import ClientService from "../services/client.service"
import { GetBlogsClient } from "../models/Client.model"



interface FilterOption {
  value: string | number
  label: string
  count?: number
}

interface Filters {
  category: string[]
}

interface FilterSection {
  title: string
  type: keyof Filters
  options: FilterOption[]
}


const filterSections: FilterSection[] = [
  {
    title: "Blog Category",
    type: "category",
    options: [
      { value: "technology", label: "Technology", count: 15 },
      { value: "health", label: "Health", count: 10 },
      { value: "finance", label: "Finance", count: 8 },
      { value: "travel", label: "Travel", count: 12 },
      { value: "education", label: "Education", count: 9 },
      { value: "lifestyle", label: "Lifestyle", count: 11 },
      { value: "food", label: "Food", count: 7 },
      { value: "science", label: "Science", count: 6 },
    ],
  },
]

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [noResult, setNoResult] = useState(false)

  const [filters, setFilters] = useState<Filters>({
    category: [],
  })

  const [blogsParams, setBlogsParams] = useState<GetBlogsClient>({
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
    searchCondition: {
      keyword: "",
      is_deleted: false,
      category_id: "",
    },
  })

  const handleSearch = (searchText: string) => {
    // setNoResult(false)
    const updatedSearchParams = new URLSearchParams(searchParams)
    if (searchText) {
      updatedSearchParams.set("search", searchText)
    } else {
      updatedSearchParams.delete("search")
    }
    setSearchParams(updatedSearchParams)
    setBlogs([])
    setBlogsParams((prevParams) => ({
      ...prevParams,
      searchCondition: {
        ...prevParams.searchCondition,
        keyword: searchText,
      },
      pageInfo: {
        ...prevParams.pageInfo,
        pageNum: 1,
      },
    }))
  }

  const handleFilterChange = (filterType: keyof Filters, value: string | number) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters }
      const index = updatedFilters[filterType].indexOf(value.toString())
      if (index > -1) {
        updatedFilters[filterType].splice(index, 1)
      } else {
        updatedFilters[filterType].push(value.toString())
      }
      return updatedFilters
    })
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      setNoResult(false)
      try {
        // Replace this with your actual blog service call
        const response = await ClientService.getBlogs(blogsParams)
        if (response.data?.pageInfo?.totalItems === 0) setNoResult(true)
        setBlogs(response?.data?.pageData ?? [])
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setNoResult(true)
      }
    }

    fetchBlogs()
  }, [blogsParams])

  useEffect(() => {
    const applyFilters = () => {
      let result = blogs

      // Apply category filter
      if (filters.category.length > 0) {
        result = result.filter((blog) => filters.category.includes(blog.category_name))
      }

      setBlogs(result)
    }

    applyFilters()
  }, [blogs, filters])

  return (
    <main className="mt-2 min-h-screen relative">
      <div className="p-4 pb-0">
        <DynamicBreadcrumb />
      </div>
      <Layout className="relative">
        <SearchResults
          noResult={noResult}
          blogs={blogs}
          onSearch={handleSearch}
          searchQuery={blogsParams.searchCondition.keyword}
        />
        <SearchFilter
          onFilterChange={handleFilterChange}
          filters={filterSections}
          selectedFilters={filters}
        />
      </Layout>
    </main>
  )
}