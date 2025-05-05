import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Input } from "./ui/input";

interface CourseInputProps {
  onSubmit?: (topic: string) => void;
}

const CourseInput = ({ onSubmit }: CourseInputProps) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && onSubmit) {
      onSubmit(topic);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-2 mb-12">
      <h2 className="text-2xl font-medium text-center mb-6">What would you like to learn today?</h2>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="course-input h-16 rounded-4xl"
          placeholder="Enter any topic to start learning..."
        />
        <Button 
          type="submit"
          variant="noShadow"
          className="absolute right-3 top-3 rounded-lg"
          disabled={!topic.trim()}
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default CourseInput;