"use client";

import { motion } from "framer-motion";

export default function Loading() {
  const logoGradient =
    "bg-gradient-to-r from-[#4f46e5] via-[#54f73f] to-[#a855f7] bg-clip-text text-transparent";

  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh] w-full'>
      <div className='relative flex items-center justify-center'>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className='absolute w-32 h-32 rounded-full bg-[#4f46e5]/20'
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className='w-16 h-16 border-4 border-t-[#4f46e5] border-r-transparent border-b-[#54f73f] border-l-transparent rounded-full'
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='mt-8 flex flex-col items-center'
      >
        <h2
          className={`font-montserrat font-extrabold text-2xl tracking-tight ${logoGradient}`}
        >
          SkillSphere
        </h2>
        <div className='flex gap-1 mt-2'>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className='w-1.5 h-1.5 bg-[#4f46e5] rounded-full'
            />
          ))}
        </div>
      </motion.div>

      <p className='mt-4 text-slate-400 text-sm font-medium animate-pulse'>
        Loading resources...
      </p>
    </div>
  );
}
