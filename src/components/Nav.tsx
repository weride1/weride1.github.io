'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, FileText, FolderCode, Activity, Camera } from 'lucide-react';

const navItems = [
  { icon: Home, label: '首页', href: '/' },
  { icon: FileText, label: '文章', href: '/blog' },
  { icon: FolderCode, label: '项目', href: '/projects' },
  { icon: Activity, label: '日报', href: '/daily' },
  { icon: Camera, label: '照片墙', href: '/photos' },
];

function normalize(pathname: string) {
  if (pathname === '/') return '/';
  if (pathname.startsWith('/articles') || pathname === '/blog') return '/blog';
  if (pathname.startsWith('/projects')) return '/projects';
  if (pathname.startsWith('/daily') || pathname.startsWith('/feed')) return '/daily';
  if (pathname.startsWith('/photos')) return '/photos';
  return pathname;
}

function useActivePath() {
  const [path, setPath] = useState<string>('/');

  useEffect(() => {
    const sync = () => setPath(normalize(window.location.pathname));
    sync();
    document.addEventListener('astro:page-load', sync);
    document.addEventListener('astro:after-swap', sync);
    return () => {
      document.removeEventListener('astro:page-load', sync);
      document.removeEventListener('astro:after-swap', sync);
    };
  }, []);

  return path;
}

export default function Nav() {
  const activePath = useActivePath();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-nav px-2 py-2 flex items-center gap-1"
    >
      {navItems.map((item, i) => {
        const isActive = activePath === item.href;
        return (
          <motion.a
            key={item.label}
            href={item.href}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-sm tracking-wide transition-colors duration-300 ${
              isActive
                ? 'text-gray-900 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="nav-active-pill"
                className="absolute inset-0 bg-white/60 rounded-full border border-white/40 shadow-sm"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <item.icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="hidden sm:inline">{item.label}</span>
            </span>
          </motion.a>
        );
      })}
    </motion.nav>
  );
}
