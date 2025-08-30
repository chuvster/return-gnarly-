
import { BookOpen, FileCheck, Upload, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  isMobileMenuOpen: boolean;
  currentView: "dashboard" | "course-detail" | "assessments" | "lectures" | "student-tools";
  onNavigateToCourses: () => void;
  onNavigateToAssessments: () => void;
  onNavigateToLectures: () => void;
  onNavigateToStudentTools: () => void;
}

export default function Navigation({ 
  isMobileMenuOpen, 
  currentView, 
  onNavigateToCourses, 
  onNavigateToAssessments,
  onNavigateToLectures,
  onNavigateToStudentTools
}: NavigationProps) {
  const navItems = [
    { 
      label: "My Courses", 
      action: onNavigateToCourses, 
      icon: BookOpen, 
      active: currentView === "dashboard" || currentView === "course-detail"
    },
    { 
      label: "Assessments", 
      action: onNavigateToAssessments, 
      icon: FileCheck, 
      active: currentView === "assessments"
    }
    // ,
    // { 
    //   label: "Lectures", 
    //   action: onNavigateToLectures, 
    //   icon: Upload, 
    //   active: currentView === "lectures"
    // },
    // { 
    //   label: "Student Tools", 
    //   action: onNavigateToStudentTools, 
    //   icon: Lightbulb, 
    //   active: currentView === "student-tools"
    // }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main navigation">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            onClick={item.action}
            className={`text-lg font-bold px-3 py-2 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white transition-colors ${
              item.active 
                ? "text-[#3F3734] dark:text-[#FFFFF3] border-b-2 border-[#3F3734] dark:border-[#FFFFF3]" 
                : "text-[#3F3734]/80 dark:text-[#FFFFF3]/80 hover:text-[#3F3734] dark:hover:text-[#FFFFF3]"
            }`}
            aria-current={item.active ? "page" : undefined}
          >
            <item.icon className="h-4 w-4 mr-2" aria-hidden="true" />
            {item.label}
          </Button>
                 ))}
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#9BC2E4] border-t border-white/20 lg:hidden z-20">
          <nav className="px-6 py-4 space-y-2" role="navigation" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={item.action}
                className={`w-full justify-start text-lg font-bold px-4 py-3 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white ${
                  item.active 
                    ? "text-[#3F3734] dark:text-[#FFFFF3] bg-white/10" 
                    : "text-[#3F3734]/80 dark:text-[#FFFFF3]/80"
                }`}
                aria-current={item.active ? "page" : undefined}
              >
                <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
                {item.label}
              </Button>
                         ))}
          </nav>
        </div>
      )}
    </>
  );
}