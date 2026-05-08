'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DigitalClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time ? time.getHours().toString().padStart(2, '0') : '--';
  const minutes = time ? time.getMinutes().toString().padStart(2, '0') : '--';
  const dateLabel = time
    ? time.toLocaleDateString('zh-CN', {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      })
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass-card px-5 py-1.5 flex flex-col items-center overflow-hidden h-full"
    >
      <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-gray-500/80 uppercase mb-2">
        <span>Local Time</span>
        <span className="font-mono text-mint-500">●</span>
      </div>
      <div className="flex items-baseline gap-1 font-mono">
        <span className="text-5xl font-normal text-gray-800 tabular-nums tracking-tight">
          {hours}
        </span>
        <span className="text-5xl font-normal text-mint-400 animate-pulse">:</span>
        <motion.span
          key={minutes}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          className="text-5xl font-normal text-gray-800 tabular-nums tracking-tight"
        >
          {minutes}
        </motion.span>
      </div>
      <div className="text-xs text-gray-500 mt-1 font-medium">{dateLabel}</div>
    </motion.div>
  );
}
