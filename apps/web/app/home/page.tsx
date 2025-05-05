"use client"
import { useState } from "react";
import Navbar from "@/components/navbar";
import CourseInput from "@/components/CourseInput";
import { toast } from "sonner";
import CourseList, { Course } from "@/components/CourseList";

const Index = () => {
  const [user] = useState({
    name: "Alex Smith",
    avatarUrl: "" // You can add a default avatar URL here
  });
  
  // Mock course data without thumbnails
  const [courses] = useState<Course[]>([
    {
      id: "course-1",
      title: "Introduction to Machine Learning",
      status: "ongoing",
      onlineUsers: 124
    },
    {
      id: "course-2",
      title: "Web Development Fundamentals",
      status: "completed",
      onlineUsers: 89
    },
    {
      id: "course-3",
      title: "Data Science Essentials",
      status: "pending",
      onlineUsers: 56
    },
    {
      id: "course-4",
      title: "iOS App Development with Swift and SwiftUI for Beginners",
      status: "ongoing",
      onlineUsers: 42
    }
  ]);

  const handleCourseSubmit = (topic: string) => {
    // This would actually create a new course or redirect to a course page
    toast("Course request submitted",{
      description: `Creating a course on: ${topic}`,
    });
    console.log("Creating course on:", topic);
  };

  return (
    <div className="min-h-screen bg-gray-50 lovable-gradient-bg">
      <Navbar 
      // userName={user.name} avatarUrl={user.avatarUrl} 
      />
      
      <div className="container mx-auto px-4 py-8 h-screen flex items-center justify-center flex-col">
      <h1 className="text-5xl font-bold flex items-center justify-center flex-wrap">
        Make your own,
        <span className="inline-flex items-center ml-3">
          <span>World</span>
        </span>
      </h1>
        <CourseInput onSubmit={handleCourseSubmit} />
        <CourseList courses={courses} />
      </div>
    </div>
  );
};

export default Index;