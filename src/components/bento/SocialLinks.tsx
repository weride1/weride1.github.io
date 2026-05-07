'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Tv, BookOpen, Mail } from 'lucide-react';

const links = [
  {
    icon: Code,
    label: 'GitHub',
    href: 'https://github.com/weride1',
    color: 'hover:bg-gray-900 hover:text-white hover:border-gray-900',
  },
  {
    icon: Tv,
    label: 'Bilibili',
    href: '#',
    color: 'hover:bg-pink-400 hover:text-white hover:border-pink-400',
  },
  {
    icon: BookOpen,
    label: '小红书',
    href: '#',
    color: 'hover:bg-red-400 hover:text-white hover:border-red-400',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:hi@example.com',
    color: 'hover:bg-mint-500 hover:text-white hover:border-mint-500',
  },
];

export default function SocialLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-card p-5 flex flex-col justify-center"
    >
      <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-3">
        Find Me On
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-gray-600 bg-white/60 border border-white/50 transition-all duration-300 ${link.color}`}
          >
            <link.icon size={14} />
            <span>{link.label}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
