'use client';

import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

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


// 'use client';

// import { authClient } from '@/lib/auth-client';
// import { Avatar, Button } from '@heroui/react';
// import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useState } from 'react';

// const Navbar = () => {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();
//   const { scrollY } = useScroll();

//   const shadow = useTransform(
//     scrollY,
//     [0, 50],
//     ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 20px rgba(0,0,0,0.08)"]
//   );

//   const logoGradient = "bg-gradient-to-r from-[#4f46e5] via-[#54f73f] to-[#a855f7] bg-clip-text text-transparent";

//   const navLinks = [
//     { href: '/', label: 'Home' },
//     { href: '/all-courses', label: 'Courses' },
//     { href: '/profile', label: 'My Profile' },
//   ];

//   const handleSignOut = async () => {
//     await authClient.signOut();
//   };

//   const defaultAvatar = "https://img.heroui.chat/image/avatar?w=400&h=400&u=3";

//   return (
//     <motion.nav
//       style={{ boxShadow: shadow }}
//       className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-[100] border-b border-slate-200"
//     >
//       {/* Desktop Version */}
//       <div className="hidden lg:flex items-center h-16 px-6 gap-4 max-w-[1440px] mx-auto">
//         <Link href="/" className="flex-shrink-0 mr-2">
//           <motion.h1
//             whileHover={{ scale: 1.05 }}
//             className={`font-montserrat font-extrabold text-4xl tracking-tight ${logoGradient} cursor-pointer`}
//           >
//             SkillSphere
//           </motion.h1>
//         </Link>

//         {/* Search Bar */}
//         <div className="flex-1 mx-2">
//           <div className="relative flex items-center w-full">
//             <span className="absolute left-4 text-slate-400">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
//               </svg>
//             </span>
//             <input
//               type="text"
//               placeholder="Search for courses"
//               className="w-full pl-10 pr-5 py-2 rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:border-[#4f46e5] transition-all"
//             />
//           </div>
//         </div>

//         {/* Desktop Links & Auth */}
//         <div className="flex items-center gap-7 flex-shrink-0 ml-2">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.href;
//             return (
//               <Link key={link.href} href={link.href} className="relative group text-sm font-medium">
//                 <span className={`${isActive ? 'text-[#4f46e5]' : 'text-slate-700'}`}>{link.label}</span>
//                 <motion.span className={`absolute -bottom-1 left-0 h-0.5 bg-[#4f46e5] transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
//               </Link>
//             );
//           })}

//           <div className="flex items-center gap-4">
//             {!user ? (
//               <div className="flex items-center gap-3">
//                 <Link href="/login">
//                   <button className="px-5 py-2 text-sm font-bold border border-[#1e1b4b] text-[#1e1b4b] rounded-full hover:bg-[#1e1b4b] hover:text-white transition-all font-montserrat">
//                     Log in
//                   </button>
//                 </Link>
//                 <Link href="/registration">
//                   <button className="px-5 py-2 text-sm font-bold bg-[#1e1b4b] text-white rounded-full hover:bg-indigo-900 transition-all font-montserrat shadow-md">
//                     Registration
//                   </button>
//                 </Link>
//               </div>
//             ) : (
//               <div className="flex items-center gap-3">
//                 {/* Desktop Avatar with Proper Nesting */}
//                 <Avatar color="primary"
//                   className="w-8 h-8 ring-2 ring-offset-2 ring-[#4f46e5]"
//                   src={user?.image}
//                   name={user?.name}
//                   showFallback>
//                   <Avatar.Image src={user?.image || defaultAvatar} alt={user.name || "User"} referrerPolicy='no-referrer' />
//                   <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
//                 </Avatar>
//                 <Button onClick={handleSignOut} color="danger" variant="flat" size="sm" className="px-5 py-2 text-sm font-bold border border-[#1e1b4b] text-[#1e1b4b] rounded-full hover:bg-[#1e1b4b] hover:text-white transition-all font-montserrat">
//                   Logout
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Header */}
//       <div className="flex lg:hidden items-center h-14 px-4 gap-3">
//         <button onClick={() => setIsOpen(!isOpen)} className="text-[#1e1b4b]">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
//           </svg>
//         </button>
//         <div className="flex-1 flex justify-center">
//           <Link href="/"><span className={`font-montserrat font-extrabold text-2xl ${logoGradient}`}>SkillSphere</span></Link>
//         </div>

//         {/* Mobile Top Avatar Shortcut */}
//         {user && (
//           <Avatar size="sm" isBordered color="primary">
//             <Avatar.Image src={user?.image || defaultAvatar} alt={user.name} />
//             <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
//           </Avatar>
//         )}
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-[#1e1b4b]/40 backdrop-blur-sm z-[110] lg:hidden" />
//             <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 w-4/5 max-w-sm h-full bg-white z-[120] lg:hidden flex flex-col shadow-2xl">
//               <div className="flex items-center justify-between p-5 border-b">
//                 <span className={`font-montserrat font-extrabold text-xl ${logoGradient}`}>SkillSphere</span>
//                 <button onClick={() => setIsOpen(false)} className="text-slate-500">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
//                 </button>
//               </div>

//               <div className="flex-1 py-6 px-5 space-y-2 overflow-y-auto">
//                 {navLinks.map((link) => (
//                   <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`block py-3 text-lg font-semibold border-b border-slate-50 ${pathname === link.href ? 'text-[#4f46e5]' : 'text-slate-700'}`}>
//                     {link.label}
//                   </Link>
//                 ))}
//               </div>

//               <div className="p-5 mt-auto border-t">
//                 {!user ? (
//                   <div className="flex flex-col gap-3">
//                     <Link href="/login" onClick={() => setIsOpen(false)} className="text-center w-full py-3 text-sm font-bold border-2 border-[#1e1b4b] text-[#1e1b4b] rounded-xl">Log in</Link>
//                     <Link href="/registration" onClick={() => setIsOpen(false)} className="text-center w-full py-3 text-sm font-bold bg-[#1e1b4b] text-white rounded-xl">Registration</Link>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
//                     {/* Mobile Drawer Large Avatar */}
//                     <Avatar color="primary"
//                       className="w-8 h-8 ring-2 ring-offset-2 ring-[#4f46e5]"
//                       src={user?.image}
//                       name={user?.name}
//                       showFallback>
//                       <Avatar.Image src={user?.image || defaultAvatar} alt={user.name} referrerPolicy='no-referrer' />
//                       <Avatar.Fallback className="text-xl">{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
//                     </Avatar>
//                     <div className="text-center">
//                       <p className="font-bold text-slate-900 text-lg">{user.name}</p>
//                       <p className="text-xs text-slate-500 mb-3">{user.email}</p>
//                       <Button onClick={handleSignOut} color="danger" variant="flat" className="w-full font-bold rounded-xl">
//                         Logout
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// };

// export default Navbar;

