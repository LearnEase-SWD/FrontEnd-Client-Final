import React from "react";

// Lazy-loaded components

// export const InstructorCreateCourse = React.lazy(
//   () =>
//     import(
//       "../pages/InstructorDashboard/instructor-monitor/InstructorCreateCourse"
//     )
// );


// export const InstructorDiscount = React.lazy(
//   () =>
//     import(
//       "../pages/InstructorDashboard/instructor-management/InstructorDiscount"
//     )
// );



export const GeneralLayout = React.lazy(
  () => import("../defaultLayout/Layout")
);
export const HomePage = React.lazy(() => import("../pages/Homepage"));
export const Loginpage = React.lazy(
  () => import("../pages/AuthPage/LoginPage")
);
export const SignUppage = React.lazy(
  () => import("../pages/AuthPage/SignUpPage")
);

export const ContactPage = React.lazy(() => import("../pages/ContactPage"));
export const FAQsPage = React.lazy(() => import("../pages/FAQPage"));
export const ErrorPage = React.lazy(() => import("../pages/ErrorPage"));

export const InstructorLayout = React.lazy(
  () => import("../defaultLayout/InstructorLayout")
);

export const AdminLayout = React.lazy(
  () => import("../defaultLayout/AdminLayout")
);
export const ForgotPasswordPage = React.lazy(
  () => import("../pages/AuthPage/ForgotPasswordPage")
);
export const BlogDetailPage = React.lazy(
  () => import("../pages/BlogDetailPage")
);

export const LearnCourse = React.lazy(() => import("../pages/LearnCoursePage"));


