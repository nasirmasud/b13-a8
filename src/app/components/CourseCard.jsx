'use client';

import { authClient } from '@/lib/auth-client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiClock, FiLayers, FiStar } from 'react-icons/fi';

const CourseCard = ({ course, index }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const targetPath = `/all-courses/${course.id}`;

  const handleCardClick = (e) => {
    e.stopPropagation();
    router.push(targetPath);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick(e)}
      className="bg-white rounded-[32px] overflow-hidden border border-slate-200 flex flex-col h-full group shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer outline-none focus:ring-2 focus:ring-[#4f46e5]/20"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
          <span className="bg-white text-[#4f46e5] px-5 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Click For Details
          </span>
        </div>

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#4f46e5] text-xs font-bold rounded-full shadow-sm">
            {course.category}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1 text-[#f59e0b] font-bold text-sm">
            <FiStar className="fill-[#f59e0b]" /> {course.rating}
          </div>
          <span className="text-slate-300">|</span>
          <div className="text-slate-500 text-xs font-semibold flex items-center gap-1 uppercase tracking-wider">
            <FiLayers /> {course.level}
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#0f172a] mb-3 min-h-[56px] line-clamp-2 group-hover:text-[#4f46e5] transition-colors">
          {course.title}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">Instructor</span>
            <span className="font-bold text-sm text-[#334155]">{course.instructor}</span>
          </div>

          <div className="text-right">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">Duration</span>
            <span className="flex items-center gap-1 text-sm font-semibold text-[#64748b]">
              <FiClock className="text-[#10b981]" /> {course.duration}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;