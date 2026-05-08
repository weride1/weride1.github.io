'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { PenLine, Plus } from 'lucide-react';

interface Props {
  href?: string;
}

export default function WriteButton({ href = '/blog' }: Props) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="relative group flex flex-col justify-between h-full px-6 py-4 rounded-[28px] bg-gradient-to-br from-mint-400 to-mint-500 text-white overflow-hidden shadow-[0_8px_24px_rgba(95,184,154,0.35)]"
    >
      {/* Decorative blob */}
      <div className="absolute -right-6 -top-8 w-28 h-28 rounded-full bg-white/15 blur-xl" />
      <div className="absolute -right-4 -bottom-10 w-32 h-32 rounded-full bg-mint-200/30 blur-2xl" />

      {/* Top: label + title + button */}
      <div className="relative z-10 flex justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/80">
            Write
          </span>
          <h2 className="text-[22px] font-bold tracking-tight mt-1">写文章</h2>
        </div>
        <motion.div
          whileHover={{ rotate: 90 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center self-start group-hover:bg-white/35 transition-colors"
        >
          <Plus size={28} className="text-white" strokeWidth={2.5} />
        </motion.div>
      </div>

      {/* Bottom: description */}
      <div className="relative z-10">
        <p className="text-sm text-white/80 font-medium">记录此刻的想法</p>
      </div>
    </motion.a>
  );
}
