import { MdOutlineLocalPhone, MdOutlineEmail } from "react-icons/md";
import SessionResponsive from "./SessionResponsive";

type Course = {
  name: string;
  category_id: string;
  user_id: string;
  description: string;
  content: string;
  status: "new" | "ongoing" | "completed";
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  is_deleted: boolean;
  _id: string;
  created_at: string;
  updated_at: string;
  __v: number;
};
const sampleCourses: Course = {
  name: "Nodejs Beginner 2027",
  category_id: "667d6f9887d3be7cec496e7a",
  user_id: "667ed37ca20b693592628508",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  content: "",
  status: "new",
  video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
  image_url: "",
  price: 60000000,
  discount: 0,
  is_deleted: false,
  _id: "668213c669a3f12e2e95eb88",
  created_at: "2024-07-01T02:26:14.621Z",
  updated_at: "2024-07-01T02:26:14.621Z",
  __v: 0,
};
type Instructor = {
  email: string;
  name: string;
  google_id: string;
  role: string;
  status: boolean;
  description: string;
  phone_number: string;
  avatar_url: string;
  video_url: string;
  is_verified: boolean;
  token_version: number;
  balance: number;
  balance_total: number;
  bank_name: string;
  bank_account_no: string;
  bank_account_name: string;
  is_deleted: boolean;
  _id: string;
  dob: string;
  created_at: string;
  updated_at: string;
  __v: number;
};
const sampleInstructor: Instructor = {
  email: "tamoki1110@gmail.com",
  name: "instructor",
  google_id: "",
  role: "instructor",
  status: true,
  description:
    "LearnPress is a comprehensive WordPress LMS Plugin for WordPress. This is one of the best WordPress LMS Plugins which can be used to easily create & sell courses online.",
  phone_number: "0938947221",
  avatar_url: "https://picsum.photos/seed/picsum/200/300",
  video_url:
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  is_verified: false,
  token_version: 0,
  balance: 0,
  balance_total: 0,
  bank_name: "TPBank",
  bank_account_no: "10837054501",
  bank_account_name: "Tamoki Loi",
  is_deleted: false,
  _id: "66fe0cde171d976a891947e3",
  dob: "2024-10-03T03:17:50.593Z",
  created_at: "2024-10-03T03:17:50.593Z",
  updated_at: "2024-10-03T03:17:50.593Z",
  __v: 0,
};
type Session = {
  _id: string;
  name: string;
  user_id: string;
  course_id: string;
  description: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  __v: number;
  position_order: number;
};
const sampleSessions: Session[] = [
  {
    _id: "667f9376734773e8a46c8a13",
    name: "Ask Questions to Make Data-Driven Decisions",
    user_id: "667ed37ca20b693592628508",
    course_id: "667ecee48039581edcd01af5",
    description: "Introduction to the course",
    is_deleted: false,
    created_at: "2024-06-29T04:54:14.606Z",
    updated_at: "2024-06-29T05:53:31.805Z",
    __v: 0,
    position_order: 1,
  },
  {
    _id: "667f9376734773e8a46c8a14",
    name: "Prepare Data for Exploration",
    user_id: "667ed37ca20b693592628508",
    course_id: "667ecee48039581edcd01af5",
    description: "Setting up the environment",
    is_deleted: false,
    created_at: "2024-06-29T04:54:14.606Z",
    updated_at: "2024-06-29T05:53:31.805Z",
    __v: 0,
    position_order: 2,
  },
  {
    _id: "667f9376734773e8a46c8a15",
    name: "Process Data from Dirty to Clean",
    user_id: "667ed37ca20b693592628508",
    course_id: "667ecee48039581edcd01af5",
    description: "Basic concepts",
    is_deleted: false,
    created_at: "2024-06-29T04:54:14.606Z",
    updated_at: "2024-06-29T05:53:31.805Z",
    __v: 0,
    position_order: 3,
  },
  {
    _id: "667f9376734773e8a46c8a16",
    name: "Share Data Through the Art of Visualization",
    user_id: "667ed37ca20b693592628508",
    course_id: "667ecee48039581edcd01af5",
    description: "Advanced topics",
    is_deleted: false,
    created_at: "2024-06-29T04:54:14.606Z",
    updated_at: "2024-06-29T05:53:31.805Z",
    __v: 0,
    position_order: 4,
  },
];
type Lesson = {
  _id: string;
  name: string;
  course_id: string;
  session_id: string;
  user_id: string;
  lesson_type: "video" | "text" | "quiz";
  description: string;
  video_url: string;
  image_url: string;
  full_time: number;
  position_order: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  __v: number;
};
const sampleLessons: Lesson[] = [
  {
    _id: "667feb0f9d7b09b9a8302e2a",
    name: "Lesson 1",
    course_id: "667ecee48039581edcd01af5",
    session_id: "667f9376734773e8a46c8a13",
    user_id: "667ed37ca20b693592628508",
    lesson_type: "text",
    description:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 100,
    position_order: 1,
    is_deleted: false,
    created_at: "2024-06-29T11:07:59.998Z",
    updated_at: "2024-06-29T11:35:13.705Z",
    __v: 0,
  },
  {
    _id: "667feb0f9d7b09b9a8302e2b",
    name: "Lesson 2",
    course_id: "667ecee48039581edcd01af5",
    session_id: "667f9376734773e8a46c8a13",
    user_id: "667ed37ca20b693592628508",
    lesson_type: "video",
    description: "",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 100,
    position_order: 2,
    is_deleted: false,
    created_at: "2024-06-29T11:07:59.998Z",
    updated_at: "2024-06-29T11:35:13.705Z",
    __v: 0,
  },
  {
    _id: "667feb0f9d7b09b9a8302e2c",
    name: "Lesson 3",
    course_id: "667ecee48039581edcd01af5",
    session_id: "667f9376734773e8a46c8a13",
    user_id: "667ed37ca20b693592628508",
    lesson_type: "video",
    description: "",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 100,
    position_order: 3,
    is_deleted: false,
    created_at: "2024-06-29T11:07:59.998Z",
    updated_at: "2024-06-29T11:35:13.705Z",
    __v: 0,
  },
  {
    _id: "667feb0f9d7b09b9a8302e2d",
    name: "Lesson 4",
    course_id: "667ecee48039581edcd01af5",
    session_id: "667f9376734773e8a46c8a14",
    user_id: "667ed37ca20b693592628508",
    lesson_type: "video",
    description: "",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 100,
    position_order: 1,
    is_deleted: false,
    created_at: "2024-06-29T11:07:59.998Z",
    updated_at: "2024-06-29T11:35:13.705Z",
    __v: 0,
  },
  {
    _id: "667feb0f9d7b09b9a8302e2e",
    name: "Lesson 5",
    course_id: "667ecee48039581edcd01af5",
    session_id: "667f9376734773e8a46c8a14",
    user_id: "667ed37ca20b693592628508",
    lesson_type: "video",
    description: "",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 100,
    position_order: 2,
    is_deleted: false,
    created_at: "2024-06-29T11:07:59.998Z",
    updated_at: "2024-06-29T11:35:13.705Z",
    __v: 0,
  },
  {
    _id: "667feb0f9d7b09b9a8302e2f",
    name: "Lesson 6",
    course_id: "667ecee48039581edcd01af5",
    session_id: "667f9376734773e8a46c8a14",
    user_id: "667ed37ca20b693592628508",
    lesson_type: "video",
    description: "",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 100,
    position_order: 3,
    is_deleted: false,
    created_at: "2024-06-29T11:07:59.998Z",
    updated_at: "2024-06-29T11:35:13.705Z",
    __v: 0,
  },
  {
    _id: "667feb0f9d7b09b9a8302e30",
    name: "Lesson 7",
    course_id: "667ecee48039581edcd01af5",
    session_id: "667f9376734773e8a46c8a15",
    user_id: "667ed37ca20b693592628508",
    lesson_type: "video",
    description: "",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 100,
    position_order: 1,
    is_deleted: false,
    created_at: "2024-06-29T11:07:59.998Z",
    updated_at: "2024-06-29T11:35:13.705Z",
    __v: 0,
  },
  {
    _id: "667feb0f9d7b09b9a8302e31",
    name: "Lesson 8",
    course_id: "667ecee48039581edcd01af5",
    session_id: "667f9376734773e8a46c8a15",
    user_id: "667ed37ca20b693592628508",
    lesson_type: "video",
    description: "",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 100,
    position_order: 2,
    is_deleted: false,
    created_at: "2024-06-29T11:07:59.998Z",
    updated_at: "2024-06-29T11:35:13.705Z",
    __v: 0,
  },
  {
    _id: "667feb0f9d7b09b9a8302e32",
    name: "Lesson 9",
    course_id: "667ecee48039581edcd01af5",
    session_id: "667f9376734773e8a46c8a15",
    user_id: "667ed37ca20b693592628508",
    lesson_type: "video",
    description: "",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 100,
    position_order: 3,
    is_deleted: false,
    created_at: "2024-06-29T11:07:59.998Z",
    updated_at: "2024-06-29T11:35:13.705Z",
    __v: 0,
  },
  {
    _id: "667feb0f9d7b09b9a8302e33",
    name: "Lesson 10",
    course_id: "667ecee48039581edcd01af5",
    session_id: "667f9376734773e8a46c8a16",
    user_id: "667ed37ca20b693592628508",
    lesson_type: "video",
    description: "",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 100,
    position_order: 1,
    is_deleted: false,
    created_at: "2024-06-29T11:07:59.998Z",
    updated_at: "2024-06-29T11:35:13.705Z",
    __v: 0,
  },
  {
    _id: "667feb0f9d7b09b9a8302e34",
    name: "Lesson 11",
    course_id: "667ecee48039581edcd01af5",
    session_id: "667f9376734773e8a46c8a16",
    user_id: "667ed37ca20b693592628508",
    lesson_type: "video",
    description: "",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 100,
    position_order: 2,
    is_deleted: false,
    created_at: "2024-06-29T11:07:59.998Z",
    updated_at: "2024-06-29T11:35:13.705Z",
    __v: 0,
  },
  {
    _id: "667feb0f9d7b09b9a8302e35",
    name: "Lesson 12",
    course_id: "667ecee48039581edcd01af5",
    session_id: "667f9376734773e8a46c8a16",
    user_id: "667ed37ca20b693592628508",
    lesson_type: "video",
    description: "",
    video_url: "https://www.youtube.com/watch?v=JJ0pjRotdKI",
    image_url: "",
    full_time: 100,
    position_order: 3,
    is_deleted: false,
    created_at: "2024-06-29T11:07:59.998Z",
    updated_at: "2024-06-29T11:35:13.705Z",
    __v: 0,
  },
];
// type Review = {
//   _id: string;
//   user_id: string;
//   course_id: string;
//   comment: string;
//   rating: number;
//   is_deleted: boolean;
//   created_at: string;
//   updated_at: string;
//   __v: number;
// };
// const sampleReviews: Review[] = [
//   {
//     _id: "6680e264e19995122837e322",
//     user_id: "6680d54954c31267eb217f55",
//     course_id: "667ecee48039581edcd01af5",
//     comment: "Course is very good!",
//     rating: 3,
//     is_deleted: false,
//     created_at: "2024-06-30T04:43:16.652Z",
//     updated_at: "2024-06-30T05:05:21.619Z",
//     __v: 0,
//   },
//   {
//     _id: "6680e264e19995122837e323",
//     user_id: "6680d54954c31267eb217f56",
//     course_id: "667ecee48039581edcd01af6",
//     comment: "Excellent course!",
//     rating: 5,
//     is_deleted: false,
//     created_at: "2024-06-30T04:43:16.652Z",
//     updated_at: "2024-06-30T05:05:21.619Z",
//     __v: 0,
//   },
//   {
//     _id: "6680e264e19995122837e324",
//     user_id: "6680d54954c31267eb217f57",
//     course_id: "667ecee48039581edcd01af7",
//     comment: "Not bad, but could be better.",
//     rating: 2,
//     is_deleted: false,
//     created_at: "2024-06-30T04:43:16.652Z",
//     updated_at: "2024-06-30T05:05:21.619Z",
//     __v: 0,
//   },
//   {
//     _id: "6680e264e19995122837e323",
//     user_id: "6680d54954c31267eb217f57",
//     course_id: "667ecee48039581edcd01af7",
//     comment: "Not bad, but could be better.",
//     rating: 2,
//     is_deleted: false,
//     created_at: "2024-06-30T04:43:16.652Z",
//     updated_at: "2024-06-30T05:05:21.619Z",
//     __v: 0,
//   },
// ];
type Props = {
  a?: string;
};

export const DetailResponsive = ({ a }: Props) => {
  return (
    <div className="font-exo ">
      {a}
      <div className="flex items-center mt-4">
        <div className="font-bold text-xl">Overview</div>
        <div className="flex-grow border-t border-orange-300 ml-2"></div>
      </div>
      <div className="mt-2">{sampleCourses.description}</div>
      <div className="flex items-center mt-4">
        <div className="font-bold text-xl">Instructor</div>
        <div className="flex-grow border-t border-orange-300 ml-2"></div>
      </div>
      <div className="flex mt-2 gap-4">
        <img
          src={sampleInstructor.avatar_url}
          alt="avatar"
          className="w-1/4 aspect-square object-cover rounded-lg"
        />
        <div className="w-3/4">
          <div className="font-bold">{sampleInstructor.name}</div>
          <div>{sampleInstructor.description}</div>
          <div className="flex gap-2 items-center mt-2">
            <MdOutlineLocalPhone className="text-orange-500" />
            Phone: {sampleInstructor.phone_number}
          </div>
          <div className="flex gap-2 items-center">
            <MdOutlineEmail className="text-orange-500" />
            Email: {sampleInstructor.email}
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <div className="font-bold text-xl">Curriculum</div>
        <div className="flex-grow border-t border-orange-300 ml-2"></div>
      </div>
      <SessionResponsive sessions={sampleSessions} lessons={sampleLessons} />
      <div className="flex items-center mt-4">
        <div className="font-bold text-xl">Comment</div>
        <div className="flex-grow border-t border-orange-300 ml-2"></div>
      </div>
    </div>
  );
};
