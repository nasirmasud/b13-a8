'use client';

import { getAllCourses } from '@/lib/getCourseData';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { AiOutlineLoading3Quarters, AiOutlineSearch } from 'react-icons/ai';
import { VscSearchStop } from 'react-icons/vsc';
import CourseCard from '../components/CourseCard';

const CoursesContent = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || "";

  const [allCourses, setAllCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await getAllCourses();
        setAllCourses(courses || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return allCourses;

    const query = searchQuery.toLowerCase();
    return allCourses.filter((course) => {
      const title = course?.courseName || course?.title || "";
      const instructor = course?.instructorName || course?.instructor || "";
      return title.toLowerCase().includes(query) || instructor.toLowerCase().includes(query);
    });
  }, [searchQuery, allCourses]);

  if (isLoading) return <div className="flex justify-center py-20"><AiOutlineLoading3Quarters className="animate-spin text-3xl" /></div>;

  return (
    <section className="py-20 container mx-auto px-6 lg:px-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {searchQuery && <AiOutlineSearch className="text-[#4f46e5] text-2xl" />}
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a]">
              {searchQuery ? `Search Results` : "All Courses"}
            </h2>
          </div>
          <p className="text-slate-500">
            {searchQuery
              ? `Displaying results for "${searchQuery}"`
              : "Pick the best-rated courses from our community."}
          </p>
        </div>

        {searchQuery && (
          <button
            onClick={() => window.location.href = '/all-courses'}
            className="px-6 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full text-sm font-bold shadow-sm transition-all flex items-center gap-2"
          >
            Show All Courses
          </button>
        )}
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id || index} course={course} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="bg-slate-50 p-6 rounded-full mb-4">
            <VscSearchStop className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-700">No Match Found</h3>
          <p className="text-slate-500 max-w-xs text-center mt-2">
            We couldn@apos;t find any courses for "<span className="font-semibold text-slate-800">{searchQuery}</span>".
          </p>
        </div>
      )}
    </section>
  );
};

const AllCoursesPage = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <AiOutlineLoading3Quarters className="h-10 w-10 animate-spin text-[#4f46e5]" />
        </div>
      }>
        <CoursesContent />
      </Suspense>
    </div>
  );
};

export default AllCoursesPage;