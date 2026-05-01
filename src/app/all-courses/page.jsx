import { getAllCourses } from '@/lib/getCourseData';
import CourseCard from '../components/CourseCard';

const AllCoursesPage = async () => {
  const allCourses = await getAllCourses();

  return (
    <div className="bg-[#f8fafc]">
      <section className="py-20 container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-2">All Courses</h2>
            <p className="text-slate-500">Pick the best-rated courses from our community.</p>
          </div>
          <button className="flex items-center gap-2 text-[#4f46e5] font-bold border-b-2 border-[#4f46e5]/20 pb-1 hover:border-[#4f46e5] transition-all">
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default AllCoursesPage
