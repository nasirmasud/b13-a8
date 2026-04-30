'use client';

import Link from 'next/link';
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter
} from 'react-icons/fa';

const Footer = () => {
  const logoGradient = "bg-gradient-to-r from-[#4f46e5] via-[#54f73f] to-[#a855f7] bg-clip-text text-transparent";

  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebookF />, href: '#' },
    { name: 'Twitter', icon: <FaTwitter />, href: '#' },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, href: '#' },
    { name: 'Instagram', icon: <FaInstagram />, href: '#' },
  ];

  return (
    <footer className="w-full bg-[#1e1b4b] border-t border-indigo-900 pt-16 pb-8 text-slate-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:justify-items-center mb-12 container mx-auto px-4">

        <div className="lg:justify-self-start space-y-4">
          <Link href="/">
            <h2 className={`font-montserrat font-extrabold text-2xl tracking-tight ${logoGradient}`}>
              SkillSphere
            </h2>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[250px]">
            Elevate your skills with our modern learning platform. Learn from industry experts.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-montserrat font-bold text-white text-lg">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-montserrat font-bold text-white text-lg">Follow Us</h3>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-900/50 border border-indigo-800 text-slate-300 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:justify-self-end space-y-4">
          <h3 className="font-montserrat font-bold text-white text-lg">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-400" />
              <span className="hover:text-indigo-300 transition-colors cursor-pointer">support@skillsphere.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-indigo-400" />
              <span>+880 1234 567890</span>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-indigo-400" />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 border-t border-indigo-900/50 pt-8 text-center">
        <p className="text-slate-500 text-xs tracking-wide">
          © {new Date().getFullYear()} <span className="text-slate-400 font-medium">SkillSphere</span>. All rights reserved. Developed with ❤️ by Nasir.
        </p>
      </div>
    </footer>
  );
};

export default Footer;