import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../api/axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/user/courses/${courseId}`);
        setCourse(res.data.course);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handlePurchase = async () => {
    setPurchasing(true);
    setMsg("");

    try {
      await API.post(`/user/purchase/${courseId}`);
      setMsg("Purchase successful! Go to dashboard.");
    } catch (err) {
    console.error("PURCHASE REQUEST ERROR:", err);

    setMsg(
        err.response?.data?.error ||
        err.response?.data?.msg ||
        "Purchase failed"
    );
} finally {
      setPurchasing(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">
          Loading course...
        </p>
      </div>
    );
  }

  // Course not found
  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <p className="text-muted-foreground">
          Course not found.
        </p>

        <Button
          variant="outline"
          onClick={() => navigate("/")}
        >
          Back to courses
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="text-lg font-medium transition-opacity hover:opacity-80"
          >
            ⚡ LearnFlow
          </button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            My dashboard
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          
          {/* Left Side */}
          <div className="space-y-6">
            
            {/* Course Header */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {course.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="leading-7 text-muted-foreground">
                  {course.description}
                </p>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Course content
                </CardTitle>
              </CardHeader>

              <CardContent>
                {course.content && course.content.length > 0 ? (
                  <div className="divide-y">
                    {course.content.map((lesson, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        {/* Lesson Number */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                          {i + 1}
                        </div>

                        {/* Lesson Title */}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">
                            {lesson.title}
                          </p>
                        </div>

                        {/* Duration */}
                        {lesson.duration && (
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {Math.floor(lesson.duration / 60)} min
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No lessons added yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Purchase Card */}
          <div>
            <Card className="lg:sticky lg:top-6">
              <CardHeader>
                <CardTitle className="text-2xl">
                  ₹{course.price}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Message */}
                {msg && (
                  <div className="rounded-md border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm text-green-500">
                    {msg}
                  </div>
                )}

                {/* Purchase Button */}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePurchase}
                  disabled={purchasing}
                >
                  {purchasing
                    ? "Processing..."
                    : "Buy this course"}
                </Button>

                {/* Course Benefits */}
                <div className="space-y-3 border-t pt-5">
                  <p className="text-sm font-medium">
                    This course includes:
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>⚡</span>
                      <span>Lifetime access</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>🏆</span>
                      <span>Certificate on completion</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>🤖</span>
                      <span>AI doubt solver included</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}

export default CoursePage;