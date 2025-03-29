import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import LoadingWrapper from "./components/Loading/LoadingWrapper";
import { Suspense, useEffect } from "react";
import CoursesPage from "./pages/CoursePage";

import CourseDetailPage from "./pages/CourseDetailPage";
import GeneralLayout from "./defaultLayout/Layout";
import HomePage from "./pages/Homepage";


import ForgotPasswordPage from "./pages/AuthPage/ForgotPasswordPage";

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

import StudentContent from "./pages/StudentDashboard/StudentContent";

import StudentSubscription from "./pages/StudentDashboard/StudentSubscriptions";
import StudentChangePassword from "./pages/StudentDashboard/StudentChangePassword";
import StudentSetting from "./pages/StudentDashboard/StudentSetting";

import LearnCoursePage from "./pages/LearnCoursePage";
// import TopUpPage from "./pages/topup/TopupPage";

import ProfilePage from "./pages/profile/ProfilePage";
import StudentOrderHistory from "./pages/StudentDashboard/StudentOrderHistory";
import VerifySuccessToken from "./pages/AuthPage/VerifyToken";
import { gapi } from "gapi-script";
import MessagePage from "./pages/Message";
import CallbackPage from "./pages/CallbackPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";

// import MessageLayout from "./components/Message/MessageLayout";
// import MessageDetailPage from "./components/Message/MessageDetailPage";
// import MessageContent from "./components/Message/MessageContent";


function App() {
  useEffect(() => {
    const init = () => {
      gapi.client.init({
        clientId:
          // "12105794051-m9vscderip9vtvhqh04t75ic5efpej4e.apps.googleusercontent.com",
          "600509284504-p168tctt0mfp7ouedr5fpu5g7en4ehge.apps.googleusercontent.com",
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
            <Route path="/callback" element={<CallbackPage/>} />
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
              <Route path="/message" element={<MessagePage />} />
              <Route path="/course" element={<CoursesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faqs" element={<FAQsPage />} />
              <Route path="/*" element={<ErrorPage errorMsg="The page you requested doesn't exit yet" statusCode={404} />} />
              <Route path="cart/:status" element={<CartPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />

              <Route path="/course/:id" element={<CourseDetailPage />} />
              <Route path="/firebase" element={<Firebase />} />

              <Route path="/learn/:id" element={<LearnCoursePage />} />
            </Route>


                <Route
                  path="/checkout"
                  element={
                    <CheckoutPage
                      carts={[]}
                      cancelCart={() => {}}
                      checkout={() => {}}
                    />
                  }
                />


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
