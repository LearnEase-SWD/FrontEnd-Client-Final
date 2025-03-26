import { PageInfo, SearchCondition } from "./SearchInfo.model";

export interface GetCourseClient {
    searchCondition: SearchCondition;
    pageInfo: PageInfo;
}

export interface GetCategoriesClient {
    searchCondition: SearchCondition;
    pageInfo: PageInfo;
}

export interface GetBlogsClient {
    searchCondition: SearchCondition;
    pageInfo: PageInfo;
}
  