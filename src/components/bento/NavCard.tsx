'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, FileText, FolderCode, Activity, Camera } from 'lucide-react';

const navItems = [
  { icon: Home, label: '主页', en: 'Home', href: '/' },
  { icon: FileText, label: '文章', en: 'Articles', href: '/blog' },
  { icon: FolderCode, label: '项目', en: 'Projects', href: '/projects' },
  { icon: Activity, label: '日报', en: 'Daily', href: '/daily' },
  { icon: Camera, label: '照片', en: 'Photos', href: '/photos' },
];

function normalize(pathname: string) {
  if (pathname === '/') return '/';
  if (pathname.startsWith('/articles') || pathname === '/blog') return '/blog';
  if (pathname.startsWith('/projects')) return '/projects';
  if (pathname.startsWith('/daily') || pathname.startsWith('/feed')) return '/daily';
  if (pathname.startsWith('/photos')) return '/photos';
  return pathname;
}

export default function NavCard() {
  const [activePath, setActivePath] = useState<string>('/');

  useEffect(() => {
    const sync = () => setActivePath(normalize(window.location.pathname));
    sync();
    document.addEventListener('astro:page-load', sync);
    document.addEventListener('astro:after-swap', sync);
    return () => {
      document.removeEventListener('astro:page-load', sync);
      document.removeEventListener('astro:after-swap', sync);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 flex flex-col h-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="relative w-12 h-12 rounded-full bg-amber-300 overflow-hidden border-2 border-white/70 shadow-sm shrink-0">
          <img
            src="/avatar.png"
            alt="weride1"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-gray-800 tracking-tight truncate">
              weride1
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 truncate">1947999194@qq.com</p>
        </div>
      </div>

      <div className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2 px-2">
        General
      </div>

      <ul className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = activePath === item.href;
          return (
            <li key={item.href}>
              <motion.a
                href={item.href}
                whileHover={{ x: isActive ? 0 : 2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition-colors duration-200 ${
                  isActive
                    ? 'text-mint-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navcard-active"
                    className="absolute inset-0 bg-mint-200/70 rounded-2xl border border-mint-300/50"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  <item.icon
                    size={16}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={isActive ? 'text-mint-600' : 'text-gray-400'}
                  />
                  <span>{item.label}</span>
                  <span className="ml-auto text-[10px] tracking-wider text-gray-400">
                    {item.en}
                  </span>
                </span>
              </motion.a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
