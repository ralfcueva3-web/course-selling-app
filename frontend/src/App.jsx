import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/signup";
import Login from "./pages/login";
import Courses from "./pages/courses";
import CoursePage from "./pages/coursePage";
import Dashboard from "./pages/dashboard";

import AdminLogin from "./pages/admin/adminLogin";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminCourses from "./pages/admin/adminCourses";

import AdminProtectedRoute from "./components/AdminProtectedRoute";
import StudentProtectedRoute from "./components/StudentProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* User Routes */}

        <Route
          path="/"
          element={<Courses />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/course/:courseId"
          element={<CoursePage />}
        />


        {/* Protected Student Routes */}

        <Route element={<StudentProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Route>


        {/* Admin Login */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* Protected Admin Routes */}

        <Route element={<AdminProtectedRoute />}>

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/courses"
            element={<AdminCourses />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;