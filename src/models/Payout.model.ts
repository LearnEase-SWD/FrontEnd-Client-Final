export interface Payout {
  _id: string;
  payout_no: string;
  status: PayoutStatusEnum;
  transactions: Transaction[];
  instructor_id: string;
  balance_origin: number;
  balance_instructor_paid: number;
  balance_instructor_received: number;
  is_deleted: boolean;
  created_at: Date; // ISO date string
  updated_at: Date; // ISO date string
  instructor_name: string;
  instructor_email: string;
}

export interface Transaction {
  price: number;
  discount: number;
  price_paid: number;
  purchase_id: string;
  _id: string;
  created_at: string; // ISO date string format
}

export enum PayoutStatusEnum {
  NEW = "new",
  REQUEST_PAYOUT = "request_payout",
  COMPLETED = "completed",
  REJECTED = "rejected",
}

export interface CreatePayout {
  instructor_id: string;
  transactions: {purchase_id:string}[]
}



export interface GetPayoutRequest {
  searchCondition: {
    payout_no?: string;
    instructor_id?: string;
    status?: PayoutStatusEnum;
    is_instructor:boolean;
    is_delete: boolean;
  };
  pageInfo: {
    pageNum: number;
    pageSize: number;
  };
}

export interface UpdateStatusPayoutRequest {
  status: PayoutStatusEnum;
  comment: string;
}
