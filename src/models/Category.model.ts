import { PageInfo, SearchCondition } from "./SearchInfo.model";

export type Category = {
  topicID: string;
  name: string;
  description: string;
  parent_category_id: string;
};


export type CategoryRequest = {
  name: string;
  parent_category_id?: string;
};


export interface GetCategories {
  searchCondition: SearchCondition;
  pageInfo: PageInfo;
}