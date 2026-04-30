'use client';

import { motion } from 'framer-motion';
import Image from 'next/image'; // Next Image ইমপোর্ট করা হয়েছে
import { FiArrowRight, FiPlayCircle } from 'react-icons/fi';

const Banner = () => {
  return (
    <section className="relative w-full bg-[#0f172a] overflow-hidden min-h-[600px] flex items-center">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 blur-[120px] rounded-full -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500 blur-[100px] rounded-full -ml-20 -mb-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6 font-montserrat">
              Master Your Future <br />
              <span className="bg-gradient-to-r from-[#4f46e5] via-[#54f73f] to-[#a855f7] bg-clip-text text-transparent">
                With SkillSphere
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
              Explore world-class courses from industry experts and take your career to the next level with our modern learning platform.
            </p>

            <div className="flex flex-wrap gap-5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#4f46e5] text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-500/25 hover:bg-indigo-600 transition-all"
              >
                Explore All Courses <FiArrowRight />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                <FiPlayCircle className="text-emerald-400 text-xl" /> Watch Demo
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 w-full aspect-square max-w-[500px] mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[40px] rotate-6 scale-95 transition-transform group-hover:rotate-3 duration-500" />

              <div className="relative w-full h-full bg-slate-800 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000"
                  alt="Students learning together"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;