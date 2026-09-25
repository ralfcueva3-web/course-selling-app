import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

function CourseCard({ course }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/course/${course._id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    navigate(`/course/${course._id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="group cursor-pointer overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Course Image / Placeholder */}
      <div className="flex h-32 items-center justify-center bg-indigo-950 text-4xl">
        📚
      </div>

      {/* Course Content */}
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">
          {course.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {course.description}
        </p>

        <p className="mt-4 text-lg font-semibold text-primary">
          ₹{course.price}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <Button
          onClick={handleButtonClick}
          className="w-full"
        >
          View course
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CourseCard;