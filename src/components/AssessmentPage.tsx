
import { Calendar, Clock, FileText, CheckCircle, AlertCircle, Trophy, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Assessment {
  id: string;
  title: string;
  course: string;
  courseCode: string;
  type: "quiz" | "assignment" | "exam" | "project";
  dueDate: string;
  status: "upcoming" | "in_progress" | "submitted" | "graded";
  score?: number;
  totalMarks?: number;
  timeLimit?: string;
  attempts?: number;
  maxAttempts?: number;
  description: string;
}

const mockAssessments: Assessment[] = [
  {
    id: "1",
    title: "Programming Fundamentals Quiz",
    course: "Introduction to Computer Science",
    courseCode: "FIT1008",
    type: "quiz",
    dueDate: "2024-12-15",
    status: "upcoming",
    timeLimit: "30 minutes",
    attempts: 0,
    maxAttempts: 2,
    description: "Test your understanding of basic programming concepts including variables, loops, and functions."
  },
  {
    id: "2", 
    title: "Database Design Project",
    course: "Business Information Systems",
    courseCode: "FIT1006",
    type: "project",
    dueDate: "2024-12-20",
    status: "in_progress",
    description: "Design and implement a complete database system for a small business scenario."
  },
  {
    id: "3",
    title: "Algorithm Analysis Assignment",
    course: "Data Structures and Algorithms", 
    courseCode: "FIT2004",
    type: "assignment",
    dueDate: "2024-12-18",
    status: "submitted",
    description: "Analyze time and space complexity of various sorting and searching algorithms."
  },
  {
    id: "4",
    title: "Midterm Examination",
    course: "Theory of Computation",
    courseCode: "FIT2014",
    type: "exam",
    dueDate: "2024-12-12",
    status: "graded",
    score: 87,
    totalMarks: 100,
    description: "Comprehensive exam covering finite automata, regular expressions, and context-free grammars."
  },
  {
    id: "5",
    title: "System Requirements Document",
    course: "Systems Development",
    courseCode: "FIT2001",
    type: "assignment",
    dueDate: "2024-12-22",
    status: "upcoming",
    description: "Create detailed requirements documentation for a software system using industry standards."
  }
];

export default function AssessmentPage() {
  const upcomingAssessments = mockAssessments.filter(a => a.status === "upcoming");
  const inProgressAssessments = mockAssessments.filter(a => a.status === "in_progress");
  const completedAssessments = mockAssessments.filter(a => a.status === "submitted" || a.status === "graded");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-orange-100 text-orange-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "submitted": return "bg-purple-100 text-purple-800";
      case "graded": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "quiz": return <Target className="h-5 w-5" />;
      case "assignment": return <FileText className="h-5 w-5" />;
      case "exam": return <AlertCircle className="h-5 w-5" />;
      case "project": return <Trophy className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

           const AssessmentCard = ({ assessment }: { assessment: Assessment }) => (
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-[#34596F]">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#9BC2E4]/20">
              {getTypeIcon(assessment.type)}
            </div>
            <div>
              <CardTitle className="text-lg mb-1 dark:text-[#FFFFF3]">{assessment.title}</CardTitle>
              <p className="text-sm text-gray-600 dark:text-[#FFFFF3]/80">
                {assessment.courseCode} - {assessment.course}
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(assessment.status)}>
            {assessment.status.replace("_", " ").toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700 dark:text-[#FFFFF3]">{assessment.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-[#FFFFF3]/80">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Due: {new Date(assessment.dueDate).toLocaleDateString()}</span>
          </div>
          
          {assessment.timeLimit && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{assessment.timeLimit}</span>
            </div>
          )}
        </div>

        {assessment.score && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium dark:text-[#FFFFF3]">Your Score</span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {assessment.score}/{assessment.totalMarks}
              </span>
            </div>
            <Progress 
              value={(assessment.score / (assessment.totalMarks || 100)) * 100} 
              className="h-2"
            />
          </div>
        )}

        {assessment.attempts !== undefined && (
                      <div className="text-xs text-gray-500 dark:text-[#FFFFF3]/60">
              Attempts: {assessment.attempts}/{assessment.maxAttempts}
            </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1 bg-[#9BC2E4] hover:bg-[#8BB1D9]"
            size="sm"
          >
            {assessment.status === "upcoming" ? "Start" : 
             assessment.status === "in_progress" ? "Continue" : "View"}
          </Button>
          
          {assessment.status === "graded" && (
            <Button variant="outline" size="sm">
              View Feedback
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#3F3734] dark:text-[#FFFFF3] mb-4">Assessments</h1>
        <p className="text-lg text-gray-600 dark:text-[#FFFFF3]/80">
          Track your assignments, quizzes, and exams across all courses
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 mb-1">Total Due</p>
                <p className="text-2xl font-bold">{upcomingAssessments.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 mb-1">In Progress</p>
                <p className="text-2xl font-bold">{inProgressAssessments.length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-1">Completed</p>
                <p className="text-2xl font-bold">{completedAssessments.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 mb-1">Avg Score</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="upcoming" className="text-sm">
            Upcoming ({upcomingAssessments.length})
          </TabsTrigger>
          <TabsTrigger value="progress" className="text-sm">
            In Progress ({inProgressAssessments.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-sm">
            Completed ({completedAssessments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4 dark:text-[#FFFFF3]">Upcoming Assessments</h3>
          {upcomingAssessments.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingAssessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 dark:bg-[#34596F]">
              <CardContent>
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold mb-2 dark:text-[#FFFFF3]">All caught up!</h3>
                <p className="text-gray-600 dark:text-[#FFFFF3]/80">No upcoming assessments at the moment.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4 dark:text-[#FFFFF3]">In Progress</h3>
          {inProgressAssessments.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {inProgressAssessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12 dark:bg-[#34596F]">
              <CardContent>
                <Clock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2 dark:text-[#FFFFF3]">No ongoing assessments</h3>
                <p className="text-gray-600 dark:text-[#FFFFF3]/80">Start an upcoming assessment to see it here.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4 dark:text-[#FFFFF3]">Completed Assessments</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedAssessments.map((assessment) => (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
