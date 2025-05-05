import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export type CourseStatus = "ongoing" | "completed" | "pending";

interface CourseCardProps {
  id: string;
  title: string;
  status: CourseStatus;
  onlineUsers: number;
  index: number;
}

const CourseCard = ({ 
  id, 
  title, 
  status, 
  onlineUsers,
  index,
}: CourseCardProps) => {
  // Determine the badge color based on status
  const getStatusColor = (status: CourseStatus) => {
    switch (status) {
      case "ongoing":
        return "bg-amber-500";
      case "completed":
        return "bg-emerald-500";
      case "pending":
        return "bg-slate-400";
      default:
        return "bg-gray-400";
    }
  };

  // Format status text to capitalize first letter
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Calculate animation delay for staggered effects
  const animationDelay = `${index * 0.1}s`;

  return (
    <div 
      className="course-card animate-slide bg-white p-4 rounded-b-lg max-w-64"
      style={{ animationDelay }}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center mb-2">
            <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(status)} mr-2`}></span>
            <span className="text-xs text-gray-600">{formatStatus(status)}</span>
          </div>
          <h3 className="font-medium text-base text-gray-800 truncate">{title}</h3>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-500">
            Online: {onlineUsers}
          </span>
          <Button 
            variant="noShadow"
            size="sm" 
            className="text-xs h-7 px-2 rounded"
          >
            Visit <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;