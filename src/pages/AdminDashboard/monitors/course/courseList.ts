export enum CourseStatusEnum {
  NEW = "new",
  WAITING_APPROVE = "waiting_approve",
  APPROVED = "approve",
  REJECTED = "reject",
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum CoursePriceType {
  FREE = "Free",
  PAID = "Paid",
}

export enum LessonTypeEnum {
  video = "video",
  image = "image",
  text = "text",
}

export enum PayoutStatusEnum {
  new = "New",
  request_payout = "Request Payout",
  completed = "Completed",
  rejected = "Rejected",
}
export interface Blog {
  id: string;
  title: string;
  title_image: string;
  type: string;
  publishedDate: Date;
  content: string;
}
export interface Course {
  id: number;
  name: string;
  category_id: string;
  description: string;
  content: string;
  video_url: string;
  image_url: string;
  status: CourseStatusEnum;
  price: number;
  discount: number;
}
export interface Session {
  id: string;
  name: string;
  course_id: string;
  user_id: string;
  description: string;
  position_order: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

export interface Lesson {
  id: string;
  name: string;
  course_id: string;
  session_id: string;
  user_id: string;
  lesson_type: LessonTypeEnum;
  description: string;
  video_url: string;
  image_url: string;
  full_time: number;
  position_order: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

export interface Payout {
  id: string;
  payout_no: string;
  status: PayoutStatusEnum;
  instructor_id: string;
  instructor_ratio: number;
  balance_origin: number;
  balance_instructor_paid: number;
  balance_instructor_received: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  number: number;
  timestamp: Date;
}
interface AdminTransaction {
  id: string;
  payout_id: string;
  payout_amount: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  number: number;
  timestamp: Date;
}

interface PurchaseLog {
  courseName: string;
  purchaseNumber: string;
  status: "Completed" | "Pending" | "Refunded";
  pricePaid: number;
  discount: number;
  studentName: string;
  instructorName: string;
  createdAt: string; // ISO date string (e.g., "2024-10-01")
}
interface SalesHistory {
  courseName: string;
  purchaseNumber: string;
  status: "Completed" | "Pending" | "Refunded";
  pricePaid: number;
  discount: number;
  studentName: string;
  CartNo: string;
  createdAt: string; // ISO date string (e.g., "2024-10-01")
}

interface User {
  key: string; // Khóa định danh
  name: string; // Tên người dùng
  email: string; // Địa chỉ email
  phone: string; // Số điện thoại
  username: string; // Tên đăng nhập
  status: boolean; // Trạng thái tài khoản (kích hoạt hay không)
  role: string; // Vai trò người dùng (Admin, User, v.v.)
  verified: boolean; // Trạng thái đã xác minh hay chưa
  blocked: boolean; // Trạng thái bị khóa hay không
  createdAt: string; // Ngày tạo tài khoản (có thể sử dụng Date nếu cần)
}

interface Category {
  key: string; // Khóa định danh cho category
  name: string; // Tên category
  parentCat: string; // Danh mục cha (nếu có)
}

const randomString = () => Math.random().toString(36).substring(2, 10);
const randomNumber = () => Math.floor(Math.random() * 10000) / 100;
const randomBoolean = () => Math.random() < 0.5;

const randomString1 = (length: number) =>
  Math.random()
    .toString(36)
    .substring(2, length + 2);
const randomDate = () =>
  new Date(Date.now() - Math.floor(Math.random() * 10000000000));
const randomTypes = [
  "Technology",
  "Health",
  "Education",
  "Lifestyle",
  "Business",
];

export const listBlogs: Blog[] = Array.from({ length: 10 }, () => ({
  id: randomString(),
  title: `Blog ${randomString1(10)}`,
  title_image: `https://placehold.jp/150x150.png`,
  type: randomTypes[Math.floor(Math.random() * randomTypes.length)],
  publishedDate: randomDate(),
  content: `Content for ${randomString1(20)}...`,
}));

export const payouts: Payout[] = Array.from({ length: 10 }, () => ({
  id: randomString(),
  payout_no: `P-${randomString()}`,
  status: Object.values(PayoutStatusEnum)[
    Math.floor(Math.random() * 4)
  ] as PayoutStatusEnum,
  instructor_id: randomString(),
  instructor_ratio: randomNumber(),
  balance_origin: randomNumber(),
  balance_instructor_paid: randomNumber(),
  balance_instructor_received: randomNumber(),
  created_at: new Date(),
  updated_at: new Date(),
  is_deleted: randomBoolean(),
  number: Math.floor(Math.random() * 1000),
  timestamp: new Date(),
}));

export const adminTransactions: AdminTransaction[] = Array.from(
  { length: 10 },
  () => ({
    id: randomString(),
    payout_id: payouts[Math.floor(Math.random() * payouts.length)].id,
    payout_amount: randomNumber(),
    created_at: new Date(),
    updated_at: new Date(),
    is_deleted: randomBoolean(),
    number: Math.floor(Math.random() * 100),
    timestamp: new Date(),
  })
);

export const listLessons: Lesson[] = [
  {
    id: "lesson01",
    name: "HTML Basics",
    course_id: "course01",
    session_id: "session01",
    user_id: "user01",
    lesson_type: LessonTypeEnum.image,
    description: "Learn the fundamentals of HTML.",
    video_url:
      "https://res.cloudinary.com/dz2dv8lk4/video/upload/v1729096335/mgqdadsklpktnmur9nnl.mp4",
    image_url: "https://placehold.co/200x150",
    full_time: 30,
    position_order: 1,
    created_at: new Date("2024-01-01T09:00:00Z"),
    updated_at: new Date("2024-01-01T10:00:00Z"),
    is_deleted: false,
  },
  {
    id: "lesson02",
    name: "CSS Fundamentals",
    course_id: "course01",
    session_id: "session02",
    user_id: "user01",
    lesson_type: LessonTypeEnum.image,
    description: "Introduction to CSS styling.",
    video_url: "https://example.com/css-fundamentals",
    image_url: "https://example.com/images/css-fundamentals.jpg",
    full_time: 40,
    position_order: 2,
    created_at: new Date("2024-01-02T09:00:00Z"),
    updated_at: new Date("2024-01-02T10:00:00Z"),
    is_deleted: false,
  },
  {
    id: "lesson03",
    name: "JavaScript Basics",
    course_id: "course02",
    session_id: "session03",
    user_id: "user02",
    lesson_type: LessonTypeEnum.image,
    description: "Introduction to JavaScript programming.",
    video_url: "https://example.com/js-basics",
    image_url: "https://example.com/images/js-basics.jpg",
    full_time: 50,
    position_order: 1,
    created_at: new Date("2024-02-01T09:00:00Z"),
    updated_at: new Date("2024-02-01T10:00:00Z"),
    is_deleted: false,
  },
  {
    id: "lesson04",
    name: "React Components",
    course_id: "course03",
    session_id: "session04",
    user_id: "user03",
    lesson_type: LessonTypeEnum.image,
    description: "Learn about creating components in React.",
    video_url: "https://example.com/react-components",
    image_url: "https://example.com/images/react-components.jpg",
    full_time: 45,
    position_order: 1,
    created_at: new Date("2024-03-01T09:00:00Z"),
    updated_at: new Date("2024-03-01T10:00:00Z"),
    is_deleted: false,
  },
  {
    id: "lesson05",
    name: "Building APIs with Node.js",
    course_id: "course04",
    session_id: "session05",
    user_id: "user04",
    lesson_type: LessonTypeEnum.video,
    description: "Learn how to build RESTful APIs using Node.js.",
    video_url: "https://example.com/node-apis",
    image_url: "https://example.com/images/node-apis.jpg",
    full_time: 60,
    position_order: 1,
    created_at: new Date("2024-04-01T09:00:00Z"),
    updated_at: new Date("2024-04-01T10:00:00Z"),
    is_deleted: false,
  },
  {
    id: "lesson06",
    name: "MongoDB Basics",
    course_id: "course05",
    session_id: "session06",
    user_id: "user05",
    lesson_type: LessonTypeEnum.video,
    description: "Introduction to MongoDB and NoSQL databases.",
    video_url: "https://example.com/mongodb-basics",
    image_url: "https://example.com/images/mongodb-basics.jpg",
    full_time: 35,
    position_order: 1,
    created_at: new Date("2024-05-01T09:00:00Z"),
    updated_at: new Date("2024-05-01T10:00:00Z"),
    is_deleted: false,
  },
  {
    id: "lesson07",
    name: "Python for Data Science",
    course_id: "course06",
    session_id: "session07",
    user_id: "user06",
    lesson_type: LessonTypeEnum.video,
    description:
      "Learn how to use Python for data science and machine learning.",
    video_url: "https://example.com/python-ds",
    image_url: "https://example.com/images/python-ds.jpg",
    full_time: 55,
    position_order: 1,
    created_at: new Date("2024-06-01T09:00:00Z"),
    updated_at: new Date("2024-06-01T10:00:00Z"),
    is_deleted: false,
  },
  {
    id: "lesson08",
    name: "Introduction to Docker",
    course_id: "course07",
    session_id: "session08",
    user_id: "user07",
    lesson_type: LessonTypeEnum.video,
    description: "Learn the fundamentals of Docker and containerization.",
    video_url: "https://example.com/docker-intro",
    image_url: "https://example.com/images/docker-intro.jpg",
    full_time: 40,
    position_order: 1,
    created_at: new Date("2024-07-01T09:00:00Z"),
    updated_at: new Date("2024-07-01T10:00:00Z"),
    is_deleted: false,
  },
  {
    id: "lesson09",
    name: "Cloud Computing with AWS",
    course_id: "course08",
    session_id: "session09",
    user_id: "user08",
    lesson_type: LessonTypeEnum.video,
    description: "Learn about cloud computing and AWS services.",
    video_url: "https://example.com/aws-cloud",
    image_url: "https://example.com/images/aws-cloud.jpg",
    full_time: 50,
    position_order: 1,
    created_at: new Date("2024-08-01T09:00:00Z"),
    updated_at: new Date("2024-08-01T10:00:00Z"),
    is_deleted: false,
  },
  {
    id: "lesson10",
    name: "Cybersecurity Basics",
    course_id: "course09",
    session_id: "session10",
    user_id: "user09",
    lesson_type: LessonTypeEnum.video,
    description: "Introduction to the principles of cybersecurity.",
    video_url: "https://example.com/cybersecurity-basics",
    image_url: "https://example.com/images/cybersecurity-basics.jpg",
    full_time: 40,
    position_order: 1,
    created_at: new Date("2024-09-01T09:00:00Z"),
    updated_at: new Date("2024-09-01T10:00:00Z"),
    is_deleted: false,
  },
];

export const listSessions: Session[] = [
  {
    id: "session01",
    name: "Introduction to HTML",
    course_id: "course01", // liên kết đến khóa học "Introduction to Web Development"
    user_id: "user01",
    description: "Learn the basics of HTML and structure a simple webpage.",
    position_order: 1,
    created_at: new Date("2024-01-01T09:00:00Z"),
    updated_at: new Date("2024-01-01T10:00:00Z"),
    is_deleted: false,
  },
  {
    id: "session02",
    name: "Introduction to CSS",
    course_id: "course01",
    user_id: "user01",
    description: "Learn how to style webpages with CSS.",
    position_order: 2,
    created_at: new Date("2024-01-02T09:00:00Z"),
    updated_at: new Date("2024-01-02T10:00:00Z"),
    is_deleted: false,
  },
  {
    id: "session03",
    name: "JavaScript Basics",
    course_id: "course02", // liên kết đến khóa học "JavaScript Advanced Techniques"
    user_id: "user02",
    description: "Introduction to JavaScript programming.",
    position_order: 1,
    created_at: new Date("2024-02-01T09:00:00Z"),
    updated_at: new Date("2024-02-01T10:00:00Z"),
    is_deleted: false,
  },
  {
    id: "session04",
    name: "React Components",
    course_id: "course03", // liên kết đến khóa học "React for Beginners"
    user_id: "user03",
    description: "Learn about React components and JSX.",
    position_order: 1,
    created_at: new Date("2024-03-01T09:00:00Z"),
    updated_at: new Date("2024-03-01T10:00:00Z"),
    is_deleted: false,
  },
  {
    id: "session05",
    name: "Building REST APIs with Node.js",
    course_id: "course04", // liên kết đến khóa học "Node.js and Express"
    user_id: "user04",
    description: "Learn how to build RESTful APIs using Node.js and Express.",
    position_order: 1,
    created_at: new Date("2024-04-01T09:00:00Z"),
    updated_at: new Date("2024-04-01T10:00:00Z"),
    is_deleted: false,
  },
];

export const listCourses: Course[] = [
  {
    id: 1,
    name: "Introduction to Web Development",
    category_id: "cat01",
    description:
      "Learn the basics of web development with HTML, CSS, and JavaScript.",
    content: "HTML, CSS, JavaScript basics",
    video_url: "https://example.com/intro-web-dev",
    image_url: "https://example.com/images/web-dev.jpg",
    status: CourseStatusEnum.ACTIVE,
    price: 100,
    discount: 10,
  },
  {
    id: 2,
    name: "JavaScript Advanced Techniques",
    category_id: "cat02",
    description: "Master advanced JavaScript concepts and design patterns.",
    content: "Closures, Async Programming, Promises, Design Patterns",
    video_url: "https://example.com/js-advanced",
    image_url: "https://example.com/images/js-advanced.jpg",
    status: CourseStatusEnum.ACTIVE,
    price: 150,
    discount: 20,
  },
  {
    id: 3,
    name: "React for Beginners",
    category_id: "cat03",
    description: "Get started with React.js and build dynamic user interfaces.",
    content: "JSX, Components, Props, State",
    video_url: "https://example.com/react-beginners",
    image_url: "https://example.com/images/react-beginners.jpg",
    status: CourseStatusEnum.REJECTED,
    price: 120,
    discount: 15,
  },
  {
    id: 4,
    name: "Node.js and Express",
    category_id: "cat04",
    description:
      "Learn how to build backend applications using Node.js and Express.",
    content: "Node.js basics, Express.js, Middleware, REST APIs",
    video_url: "https://example.com/node-express",
    image_url: "https://example.com/images/node-express.jpg",
    status: CourseStatusEnum.WAITING_APPROVE,
    price: 130,
    discount: 10,
  },
  {
    id: 4,
    name: "Fullstack Development with MERN",
    category_id: "cat05",
    description:
      "Become a fullstack developer using MongoDB, Express, React, and Node.js.",
    content: "MERN stack, MongoDB, React, Express, Node.js",
    video_url: "https://example.com/mern-fullstack",
    image_url: "https://example.com/images/mern-fullstack.jpg",
    status: CourseStatusEnum.ACTIVE,
    price: 200,
    discount: 25,
  },
  {
    id: 5,
    name: "Introduction to Data Science",
    category_id: "cat06",
    description: "Explore the world of data science and machine learning.",
    content: "Data Analysis, Python, Pandas, Machine Learning",
    video_url: "https://example.com/data-science",
    image_url: "https://example.com/images/data-science.jpg",
    status: CourseStatusEnum.APPROVED,
    price: 180,
    discount: 15,
  },
  {
    id: 6,
    name: "Python for Beginners",
    category_id: "cat07",
    description: "Learn Python programming from scratch.",
    content: "Python basics, Functions, Data Structures, OOP",
    video_url: "https://example.com/python-beginners",
    image_url: "https://example.com/images/python-beginners.jpg",
    price: 90,
    status: CourseStatusEnum.ACTIVE,
    discount: 5,
  },
  {
    id: 7,
    name: "Cloud Computing with AWS",
    category_id: "cat08",
    description:
      "Understand cloud computing and AWS services for deploying scalable applications.",
    content: "AWS basics, EC2, S3, Lambda, Serverless",
    video_url: "https://example.com/cloud-aws",
    image_url: "https://example.com/images/cloud-aws.jpg",
    price: 210,
    status: CourseStatusEnum.INACTIVE,
    discount: 20,
  },
  {
    id: 8,
    name: "DevOps Fundamentals",
    category_id: "cat09",
    description: "Learn the fundamental practices and tools in DevOps.",
    content: "CI/CD, Docker, Kubernetes, Jenkins",
    video_url: "https://example.com/devops-fundamentals",
    image_url: "https://example.com/images/devops.jpg",
    status: CourseStatusEnum.INACTIVE,
    price: 160,
    discount: 10,
  },
  {
    id: 9,
    name: "Cybersecurity Basics",
    category_id: "cat10",
    description:
      "Introduction to the world of cybersecurity and network security.",
    content:
      "Cybersecurity principles, Firewalls, Encryption, Threat Detection",
    video_url: "https://example.com/cybersecurity-basics",
    image_url: "https://example.com/images/cybersecurity.jpg",
    status: CourseStatusEnum.INACTIVE,
    price: 140,
    discount: 10,
  },
];

export const purchaseLog: PurchaseLog[] = [
  {
    courseName: "Introduction to Web Development",
    purchaseNumber: "PUR001",
    status: "Completed",
    pricePaid: 90,
    discount: 10,
    studentName: "John Doe",
    instructorName: "Jane Smith",
    createdAt: "2024-10-01",
  },
  {
    courseName: "JavaScript Advanced Techniques",
    purchaseNumber: "PUR002",
    status: "Pending",
    pricePaid: 120,
    discount: 30,
    studentName: "Alice Johnson",
    instructorName: "Tom Brown",
    createdAt: "2024-10-03",
  },
  {
    courseName: "Introduction to Web Development",
    purchaseNumber: "PUR003",
    status: "Completed",
    pricePaid: 90,
    discount: 10,
    studentName: "Michael Green",
    instructorName: "Jane Smith",
    createdAt: "2024-10-05",
  },
  {
    courseName: "JavaScript Advanced Techniques",
    purchaseNumber: "PUR004",
    status: "Refunded",
    pricePaid: 120,
    discount: 30,
    studentName: "Sarah White",
    instructorName: "Tom Brown",
    createdAt: "2024-10-07",
  },
];

export const salesHistory: SalesHistory[] = [
  {
    courseName: "Introduction to Web Development",
    purchaseNumber: "PUR001",
    status: "Completed",
    pricePaid: 90,
    discount: 10,
    studentName: "John Doe",
    CartNo: "CART_JB97IV20241016",
    createdAt: "2024-10-01",
  },
  {
    courseName: "JavaScript Advanced Techniques",
    purchaseNumber: "PUR002",
    status: "Pending",
    pricePaid: 120,
    discount: 30,
    studentName: "Alice Johnson",
    CartNo: "CART_JB97IV20241016",
    createdAt: "2024-10-03",
  },
  {
    courseName: "Introduction to Web Development",
    purchaseNumber: "PUR003",
    status: "Completed",
    pricePaid: 90,
    discount: 10,
    studentName: "Michael Green",
    CartNo: "CART_JB97IV20241016",
    createdAt: "2024-10-05",
  },
];

export const users: User[] = [
  {
    key: "1",
    name: "Nguyễn Văn A",
    email: "a@example.com",
    phone: "0123456789",
    username: "nguyenvana",
    status: true, // Tài khoản được kích hoạt
    role: "Admin",
    verified: true, // Đã xác minh
    blocked: false, // Không bị khóa
    createdAt: "2023-01-15",
  },
  {
    key: "2",
    name: "Trần Thị B",
    email: "b@example.com",
    phone: "0987654321",
    username: "tranthib",
    status: false, // Tài khoản không kích hoạt
    role: "Instructor",
    verified: false, // Chưa xác minh
    blocked: false, // Không bị khóa
    createdAt: "2023-02-20",
  },
  {
    key: "3",
    name: "Lê Văn C",
    email: "c@example.com",
    phone: "0912345678",
    username: "levanc",
    status: true, // Tài khoản kích hoạt
    role: "Student",
    verified: true, // Đã xác minh
    blocked: true, // Tài khoản bị khóa
    createdAt: "2023-03-05",
  },
];

export const category: Category[] = [
  {
    key: "1",
    name: "Photography & Video",
    parentCat: "	N/A",
  },
  {
    key: "2",
    name: "Education",
    parentCat: "N/A",
  },
  {
    key: "3",
    name: "Music Production",
    parentCat: "Music",
  },
];
