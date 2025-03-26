import { Lesson } from "./Lesson.model";
import { PageInfo, SessionSearchCondition } from "./SearchInfo.model";

export type Session = {
    _id: string;
    course_id: string;
    name: string;
    description: string;
    tag: string[];
    position_order: number;
    lesson_list: Lesson[];
    full_time: number;
    created_at: string;
    updated_at: string;
    user_name: string;
    course_name: string;
};


export interface SessionRequest {
    name: string;
    course_id: string;
    description: string;
    position_order: number;
}

export interface GetSessions {
    pageInfo: PageInfo;
    searchCondition: SessionSearchCondition;
}