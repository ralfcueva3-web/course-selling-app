import { useEffect, useState } from "react";

import API from "../api/axios";
import Navbar from "../components/navbar";
import CourseCard from "../components/courseCard";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/user/courses");
        setCourses(res.data.courses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="px-6 pb-12 pt-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Learn from the best.
            <br />
            Build what matters.
          </h1>

          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Expert-led courses on web dev, AI, finance and more.
          </p>
        </div>
      </section>

      {/* Courses */}
      <main className="mx-auto max-w-6xl px-6 pb-10">
        {loading ? (
          <div className="flex min-h-40 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Loading courses...
            </p>
          </div>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">
              No courses available yet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Courses;