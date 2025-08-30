
import Head from "next/head";
import { Search, Bell, User, BookOpen, Calendar, Users, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import CourseGrid from "@/components/CourseGrid";
import CourseDetail from "@/components/CourseDetail";
import AssessmentPage from "@/components/AssessmentPage";
import LecturePage from "@/components/LecturePage";
import StudentPage from "@/components/StudentPage";
import Navigation from "@/components/Navigation";

type PageView = "dashboard" | "course-detail" | "assessments" | "lectures" | "student-tools";

export default function HomePage() {
  const [isAccessibilityPanelOpen, setIsAccessibilityPanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<PageView>("dashboard");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView("course-detail");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedCourseId(null);
  };

  const handleNavigateToAssessments = () => {
    setCurrentView("assessments");
    setIsMobileMenuOpen(false);
  };

  const handleNavigateToCourses = () => {
    setCurrentView("dashboard");
    setIsMobileMenuOpen(false);
  };

  const handleNavigateToLectures = () => {
    setCurrentView("lectures");
    setIsMobileMenuOpen(false);
  };

  const handleNavigateToStudentTools = () => {
    setCurrentView("student-tools");
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Head>
        <title>FAIRE - Learning Management System</title>
        <meta name="description" content="Accessible Learning Management System for all students" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-[#FFFEFA] relative overflow-hidden">
        {/* Accessibility Panel */}
        <AccessibilityPanel 
          isOpen={isAccessibilityPanelOpen} 
          onClose={() => setIsAccessibilityPanelOpen(false)} 
        />

        {/* Header */}
        <header 
          className="w-full h-21 bg-[#9BC2E4] rounded-b-[20px] shadow-lg relative z-10"
          role="banner"
          aria-label="Main navigation"
        >
          <div className="max-w-[1280px] mx-auto px-6 py-4 flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
              <h1 className="text-[#3F3734] text-4xl lg:text-5xl font-bold tracking-tight">
                FAIRE
              </h1>
            </div>

            {/* Navigation */}
            <Navigation 
              isMobileMenuOpen={isMobileMenuOpen} 
              currentView={currentView}
              onNavigateToCourses={handleNavigateToCourses}
              onNavigateToAssessments={handleNavigateToAssessments}
              onNavigateToLectures={handleNavigateToLectures}
              onNavigateToStudentTools={handleNavigateToStudentTools}
            />

            {/* User Profile & Actions */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAccessibilityPanelOpen(true)}
                className="text-[#3F3734] hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Open accessibility settings"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Accessibility Settings</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-[#3F3734] hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-full border-2 border-[#3F3734] bg-[#D9D9D9] hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
                aria-label="User profile menu"
              >
                <User className="h-6 w-6 text-[#3F3734]" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[1280px] mx-auto px-6 py-8" role="main" id="main-content">
          {currentView === "dashboard" && (
            <>
              {/* Page Title & Search */}
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                  <h2 className="text-[#3F3734] text-3xl lg:text-4xl font-bold">
                    My Courses
                  </h2>
                  
                  {/* Search */}
                  <div className="relative max-w-lg w-full">
                    <Input
                      type="search"
                      placeholder="Search courses"
                      className="pl-12 pr-4 py-3 rounded-full border-2 border-[#919191] bg-[#F6F6F6] text-[#3F3734] placeholder:text-[#919191] focus:border-[#9BC2E4] focus:ring-2 focus:ring-[#9BC2E4]/20"
                      aria-label="Search through your courses"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#919191]" />
                  </div>
                </div>
              </div>

              {/* Course Grid */}
              <CourseGrid onCourseSelect={handleCourseSelect} />
            </>
          )}

          {currentView === "course-detail" && selectedCourseId && (
            <CourseDetail
              courseId={selectedCourseId}
              onBack={handleBackToDashboard}
            />
          )}

          {currentView === "assessments" && (
            <AssessmentPage />
          )}

          {currentView === "lectures" && (
            <LecturePage />
          )}

          {currentView === "student-tools" && (
            <StudentPage />
          )}
        </main>

        {/* Skip Links for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#9BC2E4] text-[#3F3734] px-4 py-2 rounded-lg font-semibold z-50"
        >
          Skip to main content
        </a>
      </div>
    </>
  );
}