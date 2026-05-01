"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiCheckCircle } from 'react-icons/fi';


const TipsInstructor = () => {
  return (
    <>
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
    </>
  )
}

export default TipsInstructor
