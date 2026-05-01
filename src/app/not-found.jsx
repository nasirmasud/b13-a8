'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiHome, FiSearch } from 'react-icons/fi';

const NotFound = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#0f172a] flex items-center justify-center overflow-hidden px-4">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 blur-[150px] rounded-full opacity-20 -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500 blur-[120px] rounded-full opacity-20 -ml-20 -mb-20" />

      <div className="max-w-2xl w-full text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[120px] md:text-[180px] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 to-indigo-900 leading-none select-none">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#4f46e5] text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-500/20 hover:bg-indigo-600 transition-all"
            >
              <FiHome /> Back to Home
            </motion.button>
          </Link>

          <Link href="/all-courses">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              <FiSearch /> Browse Courses
            </motion.button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-slate-500 text-sm italic"
        >
          Lost? Don&apos;t worry, even the best developers get 404s.
        </motion.p>
      </div>
    </section>
  );
};

export default NotFound;