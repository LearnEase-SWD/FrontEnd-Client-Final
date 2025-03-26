import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoadingWrapper from "./components/Loading/LoadingWrapper";
import { Suspense, useEffect } from "react";
import CoursesPage from "./pages/CoursePage";
import BlogPage from "./pages/BlogPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import GeneralLayout from "./defaultLayout/Layout";
import HomePage from "./pages/Homepage";
import AdminLayout from "./defaultLayout/AdminLayout";
import AdminContent from "./pages/AdminDashboard/AdminContent";
import UserManagement from "./pages/AdminDashboard/userManagement";
import RequestUser from "./pages/AdminDashboard/RequestUser";
import CategoryManagement from "./pages/AdminDashboard/categoryManagement";
import AllCourse from "./pages/AdminDashboard/monitors/course/AllCourse";
import SessionList from "./pages/AdminDashboard/monitors/course/SessionList";
import LessonList from "./pages/AdminDashboard/monitors/course/LessonList";
import PendingCourseList from "./pages/AdminDashboard/monitors/pending_course/PendingCourseList";

import BlogManagement from "./pages/AdminDashboard/BlogManagement";
import PurchaseLog from "./pages/AdminDashboard/PurchaseLog";
import AdminPayout from "./pages/AdminDashboard/payout/AdminPayout";
import InstructorLayout from "./defaultLayout/InstructorLayout";
import InstructorContent from "./pages/InstructorDashboard/InstructorContent";
import InstructorPayout from "./pages/InstructorDashboard/instructor-management/payout/InstructorPayout";
import InstructorCourses from "./pages/InstructorDashboard/instructor-monitor/InstructorCourses";
import InstructorCourseList from "./pages/InstructorDashboard/instructor-monitor/InstructorCourseList";
import IntructorSessionList from "./pages/InstructorDashboard/instructor-monitor/InstructorSessionList";
import InstructorLessonList from "./pages/InstructorDashboard/instructor-monitor/InstructorLessonList";
import InstructorCourseLog from "./pages/InstructorDashboard/instructor-report/InstructorCourseLog";
import InstructorPurchaseLog from "./pages/InstructorDashboard/instructor-report/InstructorPurchaseLog";
import InstructorReview from "./pages/InstructorDashboard/InstructorReview";
import InstructorSetting from "./pages/InstructorDashboard/instructor-setting/InstructorSetting";
import ForgotPasswordPage from "./pages/AuthPage/ForgotPasswordPage";
import PayoutManagement from "./pages/AdminDashboard/payoutManagement";
import RequestPayout from "./pages/InstructorDashboard/instructor-management/payout/RequestPayout";
import CompletedPayout from "./pages/InstructorDashboard/instructor-management/payout/CompletedPayout";
import RejectedPayout from "./pages/InstructorDashboard/instructor-management/payout/RejectedPayout";
import DashboardLayout from "./defaultLayout/DashboardLayout";
import StudentProfile from "./pages/StudentDashboard/studentProfile";
import StudentCourses from "./pages/StudentDashboard/StudentCourses";
import Loginpage from "./pages/AuthPage/LoginPage";
import SignUppage from "./pages/AuthPage/SignUpPage";
import FAQsPage from "./pages/FAQPage";
import ErrorPage from "./pages/ErrorPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/cart/CartPage";
import Firebase from "./pages/Firebase";
import BlogDetailPage from "./pages/BlogDetailPage";
import StudentContent from "./pages/StudentDashboard/StudentContent";
import CourseLists from "./pages/AdminDashboard/monitors/course/CourseLists";
import StudentSubscription from "./pages/StudentDashboard/StudentSubscriptions";
import StudentChangePassword from "./pages/StudentDashboard/StudentChangePassword";
import StudentSetting from "./pages/StudentDashboard/StudentSetting";
import InstructorChangePassword from "./pages/InstructorDashboard/instructor-setting/InstructorChangePassword";
import InstructorProfile from "./pages/InstructorDashboard/instructor-setting/InstructorProfile";
import AdminChangePassword from "./pages/AdminDashboard/setting/AdminChangePassword";
import AdminSetting from "./pages/AdminDashboard/setting/AdminSetting";
import AdminProfile from "./pages/AdminDashboard/setting/AdminProfile";
import InstructorSalesHistory from "./pages/InstructorDashboard/instructor-management/InstructorOrdersHistory";
import LearnCoursePage from "./pages/LearnCoursePage";
// import TopUpPage from "./pages/topup/TopupPage";
import AdminRequestPayout from "./pages/AdminDashboard/payout/RequestPayout";
import AdminCompletedPayout from "./pages/AdminDashboard/payout/CompletedPayout";
import AdminRejectedPayout from "./pages/AdminDashboard/payout/RejectedPayout";
import ProfilePage from "./pages/profile/ProfilePage";
import StudentSubscriptions from "./pages/StudentDashboard/StudentSubscriptions";
import StudentOrderHistory from "./pages/StudentDashboard/StudentOrderHistory";
import VerifySuccessToken from "./pages/AuthPage/VerifyToken";
import { gapi } from "gapi-script";
import AwaitingPayout from "./pages/InstructorDashboard/instructor-management/payout/AwaitingPayout";
// import MessageLayout from "./components/Message/MessageLayout";
// import MessageDetailPage from "./components/Message/MessageDetailPage";
// import MessageContent from "./components/Message/MessageContent";
import ReviewManagement from "./pages/AdminDashboard/ReviewManagement";

function App() {
  useEffect(() => {
    const init = () => {
      gapi.client.init({
        clientId:
          "12105794051-m9vscderip9vtvhqh04t75ic5efpej4e.apps.googleusercontent.com",
        scope: "",
      });
    };
    gapi.load("client:auth2", init);
  }, []);
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingWrapper />}>
        <LoadingWrapper>
          <Routes>
            {/* General Layout */}
            <Route path="/" element={<GeneralLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/login"
                element={
                  <ProtectedRoute>
                    <Loginpage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <ProtectedRoute>
                    <SignUppage />
                  </ProtectedRoute>
                }
              />

              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="/verify-email/:verification_id"
                element={<VerifySuccessToken />}
              />
              <Route path="/course" element={<CoursesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faqs" element={<FAQsPage />} />
              <Route path="/*" element={<ErrorPage errorMsg="The page you requested doesn't exit yet" statusCode={404} />} />
              <Route path="cart/:status" element={<CartPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />

              <Route path="/course/:id" element={<CourseDetailPage />} />
              <Route path="/firebase" element={<Firebase />} />

              <Route path="/learn/:id" element={<LearnCoursePage />} />
            </Route>

            {/* Admin Layout */}
            <Route
              path="dashboard/admin"
              // element={<ProtectedRoute allowedRoles={["admin"]} />}
            >
              <Route element={<AdminLayout />}>
                <Route index element={<AdminContent />} />
                <Route path="dashboard" element={<AdminContent />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="request-management" element={<RequestUser />} />
                <Route path="categories" element={<CategoryManagement />} />
                {/* <Route path="top-up" element={<TopUpPage />} /> */}
                <Route path="payout" element={<PayoutManagement />} />
                <Route path="payout" element={<AdminPayout />}>
                  <Route index element={<AdminRequestPayout />} />
                  <Route
                    path="completed-payout"
                    element={<AdminCompletedPayout />}
                  />
                  <Route
                    path="rejected-payout"
                    element={<AdminRejectedPayout />}
                  />
                </Route>
                <Route path="all-courses" element={<AllCourse />}>
                  <Route index element={<CourseLists />} />
                  <Route path="session" element={<SessionList />} />
                  <Route path="lesson" element={<LessonList />} />
                </Route>
                <Route path="review" element={<ReviewManagement />} />
                <Route path="pending-courses" element={<PendingCourseList />} />
                {/* <Route path="session" element={<PendingSessionList />} />
                  <Route path="lesson" element={<PendingLessonList />} /> */}

                <Route path="blog" element={<BlogManagement />} />
                <Route path="purchase-log" element={<PurchaseLog />} />
                <Route path="settings" element={<AdminSetting />}>
                  <Route index element={<AdminProfile />} />
                  <Route
                    path="change-password"
                    element={<AdminChangePassword />}
                  />
                </Route>
              </Route>
            </Route>
{/* 
            <Route
              path="message"
              element={
                <ProtectedRoute
                  allowedRoles={["instructor", "student"]}
                ></ProtectedRoute>
              }
            >
              <Route element={<MessageLayout />}>
              <Route index element={<MessageContent />}/>
                {/* <Route element={<MessageDetailPage />} path="/message/:id"/> */}
              {/* </Route>
            </Route> */} */
            {/* Instructor Layout */}
            <Route
              path="dashboard/instructor"
              element={
                <ProtectedRoute allowedRoles={["instructor"]}></ProtectedRoute>
              }
            >
              <Route element={<InstructorLayout />}>
                <Route index element={<InstructorContent />} />
                <Route path="dashboard" element={<InstructorContent />} />
                <Route path="my-learning" element={<StudentCourses />} />
                {/* <Route path="top-up" element={<TopUpPage />} /> */}
                <Route path="orders-history" element={<StudentOrderHistory />} />

                <Route path="payout" element={<InstructorPayout />}>
                  <Route index element={<RequestPayout />} />
                  <Route
                    path="completed-payout"
                    element={<CompletedPayout />}
                  />
                  <Route path="rejected-payout" element={<RejectedPayout />} />
                  <Route path="awaiting-payout" element={<AwaitingPayout />} />
                </Route>
                <Route
                  path="orders"
                  element={<InstructorSalesHistory />}
                />
                <Route path="my-courses" element={<InstructorCourses />}>
                  <Route index element={<InstructorCourseList />} />
                  <Route path="session" element={<IntructorSessionList />} />
                  <Route path="lesson" element={<InstructorLessonList />} />
                </Route>

                <Route path="course-log" element={<InstructorCourseLog />} />
                <Route
                  path="purchase-log"
                  element={<InstructorPurchaseLog />}
                />
                <Route
                  path="subscription"
                  element={<StudentSubscriptions />}
                ></Route>
                <Route path="review" element={<InstructorReview />} />
                <Route path="settings" element={<InstructorSetting />}>
                  <Route index element={<InstructorProfile />} />
                  <Route
                    path="change-password"
                    element={<InstructorChangePassword />}
                  />
                </Route>
              </Route>
            </Route>

            {/* Student Layout */}

            <Route
              path="dashboard/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}></ProtectedRoute>
              }
            >
              <Route element={<DashboardLayout role="student" />}>
                <Route index element={<StudentContent />} />
                <Route path="settings" element={<StudentSetting />}>
                  <Route index element={<StudentProfile />} />
                  <Route
                    path="change-password"
                    element={<StudentChangePassword />}
                  />
                </Route>
                <Route path="my-courses" element={<StudentCourses />} />
                {/* <Route path="top-up" element={<TopUpPage />} /> */}
                <Route path="orders-history" element={<StudentOrderHistory />} />
                <Route path="subscriptions" element={<StudentSubscription />} />
              </Route>
            </Route>
          </Routes>
        </LoadingWrapper>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
