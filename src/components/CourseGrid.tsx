
import { BookOpen, Clock, Users, Star, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Course {
  id: string;
  title: string;
  code: string;
  instructor: string;
  progress: number;
  totalStudents: number;
  rating: number;
  image: string;
  color: string;
  nextDeadline?: string;
  status: "active" | "completed" | "upcoming";
}

interface CourseGridProps {
  onCourseSelect?: (courseId: string) => void;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    code: "FIT1008",
    instructor: "Dr. Sarah Johnson",
    progress: 75,
    totalStudents: 324,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
    color: "#E2F1FC",
    nextDeadline: "Assignment 3 - Dec 15",
    status: "active"
  },
  {
    id: "2",
    title: "Business Information Systems",
    code: "FIT1006",
    instructor: "Prof. Michael Chen",
    progress: 60,
    totalStudents: 256,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    color: "#E2F1FC",
    nextDeadline: "Quiz 2 - Dec 12",
    status: "active"
  },
  {
    id: "3",
    title: "Data Structures and Algorithms",
    code: "FIT2004",
    instructor: "Dr. Emily Rodriguez",
    progress: 45,
    totalStudents: 198,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop",
    color: "#E2F1FC",
    nextDeadline: "Lab Report - Dec 18",
    status: "active"
  },
  {
    id: "4",
    title: "Theory of Computation",
    code: "FIT2014",
    instructor: "Dr. James Wilson",
    progress: 90,
    totalStudents: 167,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    color: "#E2F1FC",
    nextDeadline: "Final Exam - Dec 20",
    status: "active"
  },
  {
    id: "5",
    title: "Systems Development",
    code: "FIT2001",
    instructor: "Prof. Lisa Zhang",
    progress: 30,
    totalStudents: 203,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    color: "#E2F1FC",
    nextDeadline: "Project Proposal - Dec 22",
    status: "active"
  },
  {
    id: "6",
    title: "Usability Engineering",
    code: "FIT3175",
    instructor: "Dr. Amanda Taylor",
    progress: 100,
    totalStudents: 134,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
    color: "#E2F1FC",
    nextDeadline: undefined,
    status: "completed"
  }
];

export default function CourseGrid({ onCourseSelect }: CourseGridProps) {
  const handleCourseClick = (courseId: string) => {
    if (onCourseSelect) {
      onCourseSelect(courseId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, courseId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCourseClick(courseId);
    }
  };

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12"
      role="region"
      aria-label="Course dashboard"
    >
      {mockCourses.map((course, index) => (
        <Card
          key={course.id}
          className="group relative overflow-hidden bg-white rounded-3xl shadow-lg shadow-neutral-200/50 border-0 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          role="article"
          aria-labelledby={`course-title-${course.id}`}
          tabIndex={0}
          onClick={() => handleCourseClick(course.id)}
          onKeyDown={(e) => handleKeyDown(e, course.id)}
        >
          {/* Course Image */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={course.image}
              alt={`${course.title} course illustration`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            
            {/* Status Badge */}
            <Badge
              className={`absolute top-3 right-3 ${
                course.status === "completed"
                  ? "bg-green-500 hover:bg-green-600"
                  : course.status === "upcoming"
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white border-0`}
            >
              {course.status === "completed" ? "Completed" : course.status === "upcoming" ? "Upcoming" : "Active"}
            </Badge>

            {/* Progress Overlay */}
            {course.status !== "upcoming" && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                <div className="flex items-center gap-2 text-white text-sm">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Course progress:</span>
                  <Progress value={course.progress} className="flex-1 h-2" />
                  <span className="font-semibold">{course.progress}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Course Footer */}
          <div 
            className="h-20 px-4 py-3 flex items-center justify-between"
            style={{ backgroundColor: course.color }}
          >
            <div className="flex-1 min-w-0">
              <h3 
                id={`course-title-${course.id}`}
                className="text-[#3F3734] font-bold text-lg leading-tight truncate"
              >
                {course.code} - {course.title}
              </h3>
              <p className="text-[#3F3734]/80 text-sm truncate">
                {course.instructor}
              </p>
            </div>

            <ChevronRight 
              className="h-5 w-5 text-[#3F3734] group-hover:translate-x-1 transition-transform duration-300" 
              aria-hidden="true"
            />
          </div>

          {/* Interactive Hover Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#9BC2E4]/95 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
            <div className="space-y-3 text-white">
              {/* Course Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  <span>{course.totalStudents} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                  <span>{course.rating}</span>
                </div>
              </div>

              {/* Next Deadline */}
              {course.nextDeadline && (
                <div className="text-sm bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <strong>Next:</strong> {course.nextDeadline}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCourseClick(course.id);
                  }}
                >
                  <BookOpen className="h-4 w-4 mr-2" aria-hidden="true" />
                  View Course
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Add Course Card */}
      <Card className="group flex items-center justify-center h-64 border-2 border-dashed border-neutral-300 hover:border-[#9BC2E4] rounded-3xl bg-gradient-to-br from-neutral-50 to-white transition-all duration-300 cursor-pointer">
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#9BC2E4]/20 flex items-center justify-center group-hover:bg-[#9BC2E4]/30 transition-colors">
            <BookOpen className="h-8 w-8 text-[#9BC2E4]" />
          </div>
          <h3 className="font-semibold text-[#3F3734] mb-2">Enroll in New Course</h3>
          <p className="text-sm text-[#3F3734]/70">
            Browse available courses and expand your learning
          </p>
        </div>
      </Card>
    </div>
  );
}