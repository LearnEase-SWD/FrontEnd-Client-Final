import { PageInfo, ReviewSearchCondition } from "./SearchInfo.model";

export interface Review {
    _id: string;
    reviewer_id: string;
    reviewer_name: string;
    course_id: string;
    course_name: string;
    comment: string;
    rating: number;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    __v: number;
}
export interface ReviewRequest {
    course_id: string;
    comment: string;
    rating: number
}

export interface GetReviews {
    searchCondition: ReviewSearchCondition;
    pageInfo: PageInfo;
}
