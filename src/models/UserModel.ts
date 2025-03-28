export interface User {
  id?: string;
  userEmail: string;
  userName: string;
  google_id?: string;
  role: string;
  status: boolean;
  avatar_url?: string;
  is_verified: boolean;
  token_version: number;
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
