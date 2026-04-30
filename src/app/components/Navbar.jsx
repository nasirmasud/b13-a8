'use client';

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const shadow = useTransform(scrollY, [0, 50], ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 20px rgba(0,0,0,0.08)"]);

  const logoGradient = "bg-gradient-to-r from-[#4f46e5] via-[#54f73f] to-[#a855f7] bg-clip-text text-transparent";

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/profile', label: 'My Profile' },
  ];

  return (
    <motion.nav
      className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-[100] border-b border-slate-200 shadow-sm"
    >
      {/* Desktop Version */}
      <div className="hidden lg:flex items-center h-16 px-6 gap-4 max-w-[1440px] mx-auto">
        <Link href="/" className="flex-shrink-0 mr-2">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className={`font-montserrat font-extrabold text-2xl tracking-tight ${logoGradient} cursor-pointer`}
          >
            SkillSphere
          </motion.h1>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-2">
          <div className="relative flex items-center w-full">
            <span className="absolute left-4 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </span>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              placeholder="Search for courses"
              className="w-full pl-10 pr-5 py-2.5 rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#1e1b4b] focus:ring-1 focus:ring-[#1e1b4b]/10 transition-all"
            />
          </div>
        </div>

        {/* Desktop Links */}
        <div className="flex items-center gap-7 flex-shrink-0 ml-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="relative group text-sm font-medium">
                <span className={`${isActive ? 'text-[#4f46e5]' : 'text-slate-700'} transition-colors`}>
                  {link.label}
                </span>
                <motion.span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#4f46e5] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            );
          })}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 text-sm font-bold border border-[#1e1b4b] text-[#1e1b4b] rounded-lg hover:bg-[#1e1b4b] hover:text-white transition-all font-montserrat"
            >
              Log in
            </motion.button>
            <motion.button
              whileHover={{ y: -1, boxShadow: "0px 10px 20px rgba(30, 27, 75, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 text-sm font-bold bg-[#1e1b4b] text-white rounded-lg hover:bg-indigo-900 transition-all font-montserrat"
            >
              Sign up
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex lg:hidden items-center h-14 px-4 gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#1e1b4b]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </motion.button>

        <div className="flex-1 flex justify-center">
          <Link href="/">
            <span className={`font-montserrat font-extrabold text-2xl tracking-tight ${logoGradient}`}>
              SkillSphere
            </span>
          </Link>
        </div>

        <button className="text-[#1e1b4b]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#1e1b4b]/40 backdrop-blur-sm z-[110] lg:hidden"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-4/5 max-w-sm h-full bg-white z-[120] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <span className={`font-montserrat font-extrabold text-xl ${logoGradient}`}>
                  SkillSphere
                </span>
                <button onClick={() => setIsOpen(false)} className="text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 py-6 px-5 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 text-lg font-semibold border-b border-slate-50 hover:text-[#4f46e5] ${pathname === link.href ? 'text-[#4f46e5]' : 'text-slate-700'}`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-5 flex flex-col gap-3"
              >
                <button className="w-full py-3 text-sm font-bold border-2 border-[#1e1b4b] text-[#1e1b4b] rounded-xl font-montserrat">
                  Log in
                </button>
                <button className="w-full py-3 text-sm font-bold bg-[#1e1b4b] text-white rounded-xl font-montserrat">
                  Sign up
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;