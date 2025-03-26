import { Question } from "./Question.model";

export interface Assignment {
  _id: string;
  name: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  question_list: Question[];
}
