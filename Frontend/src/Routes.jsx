import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CourseManagement from './pages/course-management';
import VideoPlayerPage from './pages/video-player';
import StudentDashboard from './pages/student-dashboard';
import CourseCatalog from './pages/course-catalog';
import Login from './pages/login/login';
import Register from "pages/register/Register";
import Home from './pages/landing-page/Home';
import AboutUs from "pages/about-us/AboutUs";
import CourseDetails from "pages/course-details";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>

        <Route path="/" element={<CourseCatalog />} />
        <Route path="/course-management" element={<CourseManagement />} />
        <Route path="/video-player" element={<VideoPlayerPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/course-catalog" element={<CourseCatalog />} />
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing-page" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
