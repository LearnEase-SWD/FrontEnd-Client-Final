import { Message } from "./Message.model";
import { PageInfo } from "./SearchInfo.model";

export interface APIResponseData<T = unknown> {
    pageData?: T[];
    pageInfo?: PageInfo;
}

export interface ApiResponse<> {
    success: boolean;
    data?: [];
    message?: string;
    errors?: ApiError[];
  }

export interface ApiError {
    message: string; 
    field?: string; 
}

export interface ApiResponseMessage{
    listMessage:Message[]
}

export interface ApiResponseData<T = unknown> {
    success: boolean;
    data?:  T;
    message?: string;
    errors?: ApiError[];
  }
