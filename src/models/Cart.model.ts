import {
  PageInfo,
  PurchaseSearchCondition,
  SearchCondition,
} from "./SearchInfo.model";

// Define an enum for CartStatus
export enum CartStatusEnum {
  NEW = "new",
  WAITING_PAID = "waiting_paid",
  CANCEL = "cancel",
  COMPLETED = "completed",
}

export type Cart = {
  _id: string;
  cart_no: string;
  purchase_no: string;
  status: CartStatusEnum;
  course_id: string;
  student_id: string;
  instructor_id: string;
  is_deleted: boolean;
  created_at: string;
  price: number;
  discount: number;
  course_name: string;
  course_video: string;
  course_image: string;
  student_name: string;
  instructor_name: string;
  price_paid: number;
};

export interface SearchCartByStatus {
  searchCondition: SearchCondition<CartStatusEnum>;
  pageInfo: PageInfo;
}
export interface SearchCartByPurchased {
  searchCondition: PurchaseSearchCondition;
  pageInfo: PageInfo;
}
export interface CartItem {
  _id: string;
  cart_no: string;
}

export interface CartStatusUpdate {
  status: CartStatusEnum;
  items: CartItem[];
}
