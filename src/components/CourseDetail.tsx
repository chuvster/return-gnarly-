
import { ArrowLeft, Clock, Users, Star, BookOpen, FileText, Video, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Module {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: "video" | "reading" | "assignment" | "quiz";
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: "upcoming" | "submitted" | "graded";
  score?: number;
}

interface CourseDetailProps {
  courseId: string;
  onBack: () => void;
  onNavigateToStudentTools: () => void;
}

export default function CourseDetail({ courseId, onBack, onNavigateToStudentTools }: CourseDetailProps) {
  // Mock data - in real app, this would be fetched based on courseId
  const course = {
    title: "Introduction to Computer Science",
    code: "FIT1008",
    instructor: "Dr. Sarah Johnson",
    progress: 75,
    totalStudents: 324,
    rating: 4.8,
    description: "This course introduces fundamental concepts in computer science including programming, algorithms, and data structures.",
    image: "https://i.pinimg.com/736x/c1/12/77/c112770a72c6376c1112f2000a2b80f5.jpg"
  };

  const modules: Module[] = [
    { id: "1", title: "Introduction to Programming", duration: "45 min", completed: true, type: "video" },
    { id: "2", title: "Variables and Data Types", duration: "30 min", completed: true, type: "reading" },
    { id: "3", title: "Control Structures", duration: "60 min", completed: true, type: "video" },
    { id: "4", title: "Functions and Methods", duration: "40 min", completed: false, type: "video" },
    { id: "5", title: "Arrays and Collections", duration: "50 min", completed: false, type: "reading" },
  ];

  const assignments: Assignment[] = [
    { id: "1", title: "Hello World Program", dueDate: "2024-12-10", status: "graded", score: 95 },
    { id: "2", title: "Calculator Application", dueDate: "2024-12-15", status: "submitted" },
    { id: "3", title: "Data Structures Project", dueDate: "2024-12-20", status: "upcoming" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 hover:bg-[#9BC2E4]/20"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Courses
      </Button>

      {/* Course Header */}
      <div className="relative mb-8 rounded-3xl overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <Badge className="mb-3 bg-[#9BC2E4] text-[#3F3734]">
            {course.code}
          </Badge>
          <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
          <p className="text-xl opacity-90 mb-4">{course.instructor}</p>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{course.totalStudents} students</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-current" />
              <span>{course.rating} rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{course.progress}% complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={course.progress} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{Math.floor(modules.length * (course.progress / 100))} of {modules.length} modules completed</span>
              <span>{course.progress}% complete</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Content */}
      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="modules">Course Modules</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          <h3 className="text-2xl font-bold mb-6">Course Modules</h3>
          {modules.map((module, index) => (
            <Card
              key={module.id}
              className={`transition-all duration-200 hover:shadow-md ${
                module.completed ? "bg-green-50 border-green-200" : ""
              }`}
            >
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  {module.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                  )}
                  
                  <div className="flex items-center gap-3">
                    {module.type === "video" && <Video className="h-5 w-5 text-blue-600" />}
                    {module.type === "reading" && <FileText className="h-5 w-5 text-green-600" />}
                    {(module.type === "assignment" || module.type === "quiz") && <BookOpen className="h-5 w-5 text-orange-600" />}
                    
                    <div>
                      <h4 className="font-semibold">{module.title}</h4>
                      <p className="text-sm text-gray-600">{module.duration}</p>
                    </div>
                  </div>
                </div>

                <Button
                  variant={module.completed ? "outline" : "default"}
                  size="sm"
                  className={module.completed ? "" : "bg-[#9BC2E4] hover:bg-[#8BB1D9]"}
                >
                  {module.completed ? "Review" : "Start"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <h3 className="text-2xl font-bold mb-6">Assignments</h3>
          {assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h4 className="font-semibold mb-1">{assignment.title}</h4>
                  <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                  {assignment.score && (
                    <p className="text-sm font-semibold text-green-600">Score: {assignment.score}%</p>
                  )}
                </div>

                <Badge
                  className={
                    assignment.status === "graded"
                      ? "bg-green-100 text-green-800"
                      : assignment.status === "submitted"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-orange-100 text-orange-800"
                  }
                >
                  {assignment.status === "graded" ? "Graded" : assignment.status === "submitted" ? "Submitted" : "Pending"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <h3 className="text-2xl font-bold mb-6">Course Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Download className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold">Course Syllabus</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">Complete course outline and schedule</p>
                <Button size="sm" variant="outline">Download</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold">Lecture Notes</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">All lecture slides and notes</p>
                                 <Button 
                   size="sm" 
                   variant="outline"
                   onClick={onNavigateToStudentTools}
                 >
                   Access
                 </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
