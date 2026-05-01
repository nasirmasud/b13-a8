'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiArrowRight, FiCheckCircle, FiClock, FiLayers, FiStar } from 'react-icons/fi';

const SkillSphereSections = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        // Filter top 3 courses by rating
        const topRated = data.sort((a, b) => b.rating - a.rating).slice(0, 3);
        setCourses(topRated);
      });
  }, []);

  return (
    <div className="bg-[#f8fafc] text-[#1e293b]">

      {/* 1. Trending Courses Section */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] mb-2 font-montserrat">Trending Courses</h2>
            <p className="text-slate-500">Pick the best-rated courses from our community.</p>
          </div>
          <button className="flex items-center gap-2 text-[#4f46e5] font-bold border-b-2 border-[#4f46e5]/20 pb-1 hover:border-[#4f46e5] transition-all">
            See all courses <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[32px] overflow-hidden border border-slate-200 flex flex-col h-full group shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
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

                <h3 className="text-xl font-bold text-[#0f172a] mb-3 min-h-[56px] line-clamp-2">{course.title}</h3>

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
          ))}
        </div>
      </section>

      {/* 2. Learning Tips Section */}
      <section className="py-20 bg-indigo-50/50 border-y border-indigo-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0f172a] mb-4">💡 Study Techniques</h2>
            <div className="w-20 h-1 bg-[#4f46e5] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Pomodoro Technique", desc: "Study for 25 minutes, followed by a 5-minute break. Perfect for maintaining focus." },
              { title: "Feynman Technique", desc: "After learning a topic, try explaining it to someone else in simple terms." },
              { title: "Consistent Coding", desc: "Build muscle memory by coding for at least 1 hour every single day." }
            ].map((tip, i) => (
              <div key={i} className="p-10 bg-white border border-indigo-100 rounded-[40px] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                  <FiCheckCircle className="text-[#4f46e5] text-2xl" />
                </div>
                <h4 className="text-[#0f172a] text-xl font-bold mb-4">{tip.title}</h4>
                <p className="text-slate-600 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Top Instructors Section */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl font-black text-[#0f172a] mb-16 font-montserrat tracking-tight">Meet Our Top Instructors</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { name: "Jhankar Mahbub", role: "Web Development", img: "https://i.pravatar.cc/200?u=mahbub" },
            { name: "Sumit Saha", role: "Next.js Expert", img: "https://i.pravatar.cc/200?u=sumit" },
            { name: "Anisul Islam", role: "Software Engineer", img: "https://i.pravatar.cc/200?u=islam" },
            { name: "Jane Cooper", role: "UI/UX Designer", img: "https://i.pravatar.cc/200?u=jane" }
          ].map((ins, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} className="group">
              <div className="relative w-36 h-36 mx-auto mb-6 p-1 bg-white border border-slate-200 rounded-full shadow-md group-hover:border-[#4f46e5] transition-colors">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={ins.img}
                    alt={ins.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              <h4 className="text-[#0f172a] text-xl font-bold">{ins.name}</h4>
              <p className="text-[#4f46e5] text-xs font-bold uppercase tracking-widest mt-1">{ins.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default SkillSphereSections;