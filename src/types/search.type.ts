export interface SearchParamInterface {
  searchCondition: {
    keyword?: string;
    role?: string;
    status?: string | boolean;
    is_verified?:boolean | string,
    is_deleted?: boolean;
  };
  pageInfo: {
    pageNum: number;
    pageSize: number;
  };
}
