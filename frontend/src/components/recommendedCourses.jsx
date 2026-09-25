import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

function RecommendedCourses({ userId }) {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await API.get("/ai/recommendations");
        setRecommended(res.data.courses || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommended();
  }, []);

  if (loading || recommended.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      {/* Section Header */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold tracking-tight">
          Recommended for you
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Courses selected based on your learning interests.
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recommended.map((course) => (
          <Card
            key={course._id}
            onClick={() => navigate(`/course/${course._id}`)}
            className="group cursor-pointer overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Image */}
            <div className="flex h-24 items-center justify-center bg-primary/10 text-3xl transition-colors group-hover:bg-primary/15">
              📚
            </div>

            {/* Content */}
            <CardContent className="p-4">
              <h3 className="line-clamp-2 text-sm font-medium">
                {course.title}
              </h3>

              <p className="mt-2 text-sm font-semibold text-primary">
                ₹{course.price}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default RecommendedCourses;