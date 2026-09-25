import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import API from "../api/axios";

function StudentProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const checkStudent = async () => {
      try {
        await API.get("/user/me");

        setIsStudent(true);
      } catch (err) {
        setIsStudent(false);
      } finally {
        setLoading(false);
      }
    };

    checkStudent();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!isStudent) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default StudentProtectedRoute;