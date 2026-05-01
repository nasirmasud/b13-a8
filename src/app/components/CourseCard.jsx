'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiClock, FiLayers, FiStar } from 'react-icons/fi';

const CourseCard = ({ course, index }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-[32px] overflow-hidden border border-slate-200 flex flex-col h-full group shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-56 w-full">
        <Image
          src={course.image}
          alt={course.title}
          priority={index === 0}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#4f46e5] text-xs font-bold rounded-full shadow-sm">
            {course.category}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1 text-[#f59e0b] font-bold text-sm">
            <FiStar className="fill-[#f59e0b]" /> {course.rating}
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 text-xs font-semibold flex items-center gap-1 uppercase tracking-wider">
            <FiLayers /> {course.level}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#0f172a] mb-3 min-h-[56px] line-clamp-2">
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