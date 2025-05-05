import { useRef } from "react";
import CourseCard, { CourseStatus } from "./CourseCard";

export interface Course {
  id: string;
  title: string;
  status: CourseStatus;
  onlineUsers: number;
}

interface CourseListProps {
  courses: Course[];
}

const CourseList = ({ courses }: CourseListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 z-5">
      <h3 className="text-lg font-medium text-gray-600 mb-4">Your courses</h3>
      <div 
        ref={containerRef}
        className="flex overflow-x-auto space-x-4 pb-6 scrollbar-none"
      >
        {courses.map((course, index) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            status={course.status}
            onlineUsers={course.onlineUsers}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;