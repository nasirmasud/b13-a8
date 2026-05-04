'use client';

import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== "") {
      router.push(`/all-courses?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  const shadow = useTransform(
    scrollY,
    [0, 50],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 20px rgba(0,0,0,0.08)"]
  );

  const logoGradient = "bg-gradient-to-r from-[#4f46e5] via-[#54f73f] to-[#a855f7] bg-clip-text text-transparent";

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/all-courses', label: 'Courses' },
    { href: '/profile', label: 'My Profile' },
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.info("Logout Successful! See you again.");
  };

  return (
    <>
      <motion.nav
        style={{ boxShadow: shadow }}
        className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-[50] border-b border-slate-200"
      >
        {/* --- Desktop Layout --- */}
        <div className="hidden lg:flex items-center h-16 px-6 gap-4 max-w-[1440px] mx-auto">
          <Link href="/" className="flex-shrink-0 mr-2">
            <h1 className={`font-montserrat font-extrabold text-4xl tracking-tight ${logoGradient} cursor-pointer`}>
              SkillSphere
            </h1>
          </Link>

          <div className="flex-1 mx-2">
            <div className="relative flex items-center w-full">
              <span className="absolute left-4 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search for courses"
                className="w-full pl-10 pr-5 py-2 rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:border-[#4f46e5] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-7 flex-shrink-0 ml-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="relative group text-sm font-medium">
                <span className={`${pathname === link.href ? 'text-[#4f46e5]' : 'text-slate-700'}`}>{link.label}</span>
                <motion.span className={`absolute -bottom-1 left-0 h-0.5 bg-[#4f46e5] transition-all ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="flex items-center gap-3">
                  <Link href="/login">
                    <button className="px-5 py-2 text-sm font-bold border border-[#1e1b4b] text-[#1e1b4b] rounded-full hover:bg-[#1e1b4b] hover:text-white transition-all font-montserrat">Log in</button>
                  </Link>
                  <Link href="/registration">
                    <button className="px-5 py-2 text-sm font-bold bg-[#1e1b4b] text-white rounded-full hover:bg-indigo-900 transition-all font-montserrat shadow-md">Registration</button>
                  </Link>
                </div>
              ) : (
                <>
                  <Avatar>
                    <Avatar.Image alt="John Doe" src={user?.image} referrerPolicy='no-referrer' />
                    <Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
                  </Avatar>
                  <Button onClick={handleSignOut} color="danger" variant="flat" size="sm" className="px-5 py-2 text-sm font-bold border border-[#1e1b4b] text-[#1e1b4b] rounded-full hover:bg-[#1e1b4b] hover:text-white transition-all font-montserrat">
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* --- Mobile Layout --- */}
        <div className="flex lg:hidden items-center h-16 px-4">
          <button onClick={() => setIsOpen(true)} className="p-2 -ml-2 text-[#1e1b4b]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1 flex justify-center">
            <Link href="/"><span className={`font-montserrat font-extrabold text-2xl ${logoGradient}`}>SkillSphere</span></Link>
          </div>
        </div>
      </motion.nav>

      {/* --- Mobile Drawer --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.3 }} className="absolute top-0 left-0 w-[280px] h-full bg-white shadow-2xl flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <span className={`font-montserrat font-extrabold text-xl ${logoGradient}`}>SkillSphere</span>
                <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Search */}
              <div className="px-5 py-3 border-b border-slate-50">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="Search courses..."
                    className="w-full pl-4 pr-4 py-2 rounded-xl bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-5 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-4 px-4 text-lg font-semibold rounded-2xl transition-all ${pathname === link.href ? 'bg-indigo-50 text-[#4f46e5]' : 'text-slate-700 active:bg-slate-50'}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="p-5 border-t bg-slate-50/50">
                {!user ? (
                  <div className="grid gap-3">
                    <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-3.5 font-bold border-2 border-[#1e1b4b] text-[#1e1b4b] rounded-2xl">Log in</Link>
                    <Link href="/registration" onClick={() => setIsOpen(false)} className="w-full text-center py-3.5 font-bold bg-[#1e1b4b] text-white rounded-2xl shadow-lg">Registration</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className='flex'>
                      <Avatar>
                        <Avatar.Image alt="John Doe" src={user?.image} referrerPolicy='no-referrer' />
                        <Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
                      </Avatar>
                      <div className="min-w-0 px-2">
                        <p className="font-bold text-slate-900 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    <Button onClick={() => { handleSignOut(); setIsOpen(false); }} color="danger" variant="flat" className="w-full px-5 py-2 text-sm font-bold border border-[#1e1b4b] text-[#1e1b4b] rounded-full hover:bg-[#1e1b4b] hover:text-white transition-all font-montserrat">
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
