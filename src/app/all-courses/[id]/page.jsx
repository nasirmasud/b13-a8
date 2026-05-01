import { FiAlertCircle, FiCheck, FiGlobe, FiStar, FiUsers } from 'react-icons/fi';

const CourseDetailsPage = async ({ params }) => {
  const { id } = await params;

  const response = await fetch('https://b13-a8.vercel.app/data.json');
  const courses = await response.json();

  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Course not found!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#1e1b4b] text-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            {course.title}
          </h1>
          <p className="text-xl mb-6 max-w-3xl text-gray-200">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-2 py-1 bg-[#eceb98] text-[#3d3c0a] text-xs font-bold uppercase">
              {course.tag || "Bestseller"}
            </span>
            <span className="text-[#f3ca8c] font-bold flex items-center gap-1 text-sm">
              {course.rating} <FiStar className="fill-[#f3ca8c]" />
            </span>
            <span className="text-[#c0c4fc] underline text-sm cursor-pointer">
              ({course.totalRatings?.toLocaleString() || "0"} ratings)
            </span>
            <span className="text-sm">{course.totalLearners?.toLocaleString() || "0"} learners</span>
          </div>

          <p className="text-sm mb-4">
            Created by <span className="text-[#c0c4fc] underline cursor-pointer">{course.instructor}</span>
          </p>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FiAlertCircle /> Last updated {course.lastUpdated || "4/2026"}
            </div>
            <div className="flex items-center gap-2">
              <FiGlobe /> {course.language || "English"}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row mb-12">
          <div className="bg-[#4f46e5] text-white p-6 flex flex-col items-center justify-center min-w-[120px]">
            <div className="text-2xl mb-1">⭐</div>
            <span className="font-bold text-sm">Premium</span>
          </div>
          <div className="grow p-6 flex flex-col items-center text-center md:items-start md:text-left md:flex-row md:justify-between gap-8">
            <p className="text-[#1c1d1f] font-medium text-lg leading-snug">
              Access 28,000+ top-rated courses with <br className="hidden md:block" />
              <span className="font-bold">Personal Plan.</span>
            </p>
            <div className="h-full w-[1px] bg-slate-200 hidden md:block"></div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold flex items-center justify-center gap-1">
                {course.rating} <div className="flex text-[#b4690e] text-xs">★★★★★</div>
              </div>
              <div className="text-xs text-slate-500 underline">{course.totalRatings?.toLocaleString()} ratings</div>
            </div>

            {/* Learners Section */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold flex items-center justify-center gap-2">
                <FiUsers className="text-slate-400" /> {course.totalLearners?.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500">learners</div>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {course.whatYouWillLearn?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <FiCheck className="mt-1 shrink-0 text-slate-600" />
                <span className="text-[#1c1d1f] text-[14.5px] leading-relaxed">
                  {item}
                </span>
              </div>
            )) || <p className="text-slate-500">Learning objectives not specified.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;