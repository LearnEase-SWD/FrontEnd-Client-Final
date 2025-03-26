export interface User {
  _id: string;
  email: string;
  name: string;
  google_id?: string;
  role: string;
  status: boolean;
  description?: string;
  phone_number?: string;
  avatar_url?: string;
  video_url?: string;
  is_verified: boolean;
  token_version: number;
  balance: number;
  balance_total: number;
  bank_name?: string;
  bank_account_no?: string;
  bank_account_name?: string;
  is_deleted: boolean;
  dob?: string;
  created_at: string;
  updated_at: string;
  coverPhoto?: string;
  highResAvatar?: string;
}

export enum UserStatusEnum {
  ADMIN = "admin",
  INSTRUCTOR = "instructor",
  STUDENT = "student",
}

export interface ChangeUserRoleParams {
  user_id: string;
  role: string;
}

export interface ChangeUserStatusParams {
  user_id: string;
  status: boolean;
}
