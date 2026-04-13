import { createContext, useContext, useState, type ReactNode } from "react";

interface CourseContextType {
  courseId: number | null;
  courseTitle: string | null;
  setCourseData: (id: number, title: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courseId, setCourseId] = useState<number | null>(null);
  const [courseTitle, setCourseTitle] = useState<string | null>(null);

  const setCourseData = (id: number, title: string) => {
    setCourseId(id);
    setCourseTitle(title);
  };

  return (
    <CourseContext.Provider value={{ courseId, courseTitle, setCourseData }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
