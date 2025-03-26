export interface DataInterface <T> {
    pageData: T[],
    pageInfo :{
        pageNum: number,
        pageSize: number,
        totalItems: number,
        totalPages: number
      }
}