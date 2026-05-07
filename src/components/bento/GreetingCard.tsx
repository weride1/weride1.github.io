'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Period = 'morning' | 'afternoon' | 'evening' | 'night';

const greetings: Record<Period, { en: string; zh: string; emoji: string }> = {
  morning: {
    en: "Good Morning, I'm weride1",
    zh: '早安，今天也要元气满满呀',
    emoji: '☀️',
  },
  afternoon: {
    en: "Good Afternoon, I'm weride1",
    zh: '午安，记得喝杯咖啡',
    emoji: '☕',
  },
  evening: {
    en: "Good Evening, I'm weride1",
    zh: '傍晚好，慢下来看看落日吧',
    emoji: '🌇',
  },
  night: {
    en: "Good Night, I'm weride1",
    zh: '夜深了，早点休息',
    emoji: '🌙',
  },
};

function getPeriod(hour: number): Period {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
}

export default function GreetingCard() {
  const [period, setPeriod] = useState<Period>('morning');

  useEffect(() => {
    setPeriod(getPeriod(new Date().getHours()));
    const t = setInterval(() => setPeriod(getPeriod(new Date().getHours())), 60_000);
    return () => clearInterval(t);
  }, []);

  const g = greetings[period];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass-card p-6 flex items-center gap-5 overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 180 }}
        className="relative shrink-0"
      >
        {/* Moon halo */}
        <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-br from-amber-100 to-amber-200/60 blur-md" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 border border-white/60 shadow-sm flex items-center justify-center overflow-hidden">
          <span className="text-4xl select-none" role="img" aria-label="cat">
            🐱
          </span>
          <span className="absolute -top-1 -right-1 text-base">{g.emoji}</span>
        </div>
      </motion.div>

      <div className="flex-1 min-w-0">
        <motion.p
          key={`en-${period}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-hand text-2xl md:text-3xl text-gray-800 leading-tight tracking-wide"
        >
          {g.en}
          <span className="text-mint-500">,</span>
        </motion.p>
        <motion.p
          key={`en2-${period}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="font-hand text-xl md:text-2xl text-gray-700 leading-tight tracking-wide"
        >
          Nice to meet you!
        </motion.p>
        <motion.p
          key={`zh-${period}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-xs text-gray-500 mt-2"
        >
          {g.zh}
        </motion.p>
      </div>
    </motion.div>
  );
}
