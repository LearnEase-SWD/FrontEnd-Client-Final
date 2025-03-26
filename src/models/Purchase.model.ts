import { PageInfo, PurchaseSearchCondition } from "./SearchInfo.model";

export interface Purchase {
  _id: string;
  purchase_no: string;
  status: PurchaseStatusEnum;
  price_paid: number;
  price: number;
  discount: number;
  cart_id: string;
  course_id: string;
  student_id: string;
  instructor_id: string;
  created_at: string;
  is_deleted: boolean;
  cart_no: string;
  course_name: string;
  student_name: string;
  instructor_name: string;
}

export enum PurchaseStatusEnum {
  NEW = "new",
  REQUEST_PAID = "request_paid",
  COMPLETED = "completed",
}

export interface GetPurchases {
  searchCondition: PurchaseSearchCondition;
  pageInfo: PageInfo;
}
