'use client';
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  /** 有日报的日期数组，格式 'YYYY-MM-DD' */
  markedDates?: string[];
  /** 点击日期跳转的链接前缀，会拼成 `${linkPrefix}${date}` */
  linkPrefix?: string;
}

const monthNames = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月',
];
const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

function ymd(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function MiniCalendar({ markedDates = [], linkPrefix = '/daily/' }: Props) {
  const today = new Date();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const markedSet = useMemo(() => new Set(markedDates), [markedDates]);

  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  const days: Array<number | null> = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const isCurrentMonth =
    view.year === today.getFullYear() && view.month === today.getMonth();

  const navigate = (delta: number) => {
    setView((v) => {
      const m = v.month + delta;
      if (m < 0) return { year: v.year - 1, month: 11 };
      if (m > 11) return { year: v.year + 1, month: 0 };
      return { year: v.year, month: m };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-card p-5 flex flex-col"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-gray-700">
          {view.year} 年 {monthNames[view.month]}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-full hover:bg-white/60 transition-colors text-gray-500"
            aria-label="上个月"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => setView({ year: today.getFullYear(), month: today.getMonth() })}
            className="px-2 py-1 text-[10px] tracking-wide rounded-full hover:bg-white/60 transition-colors text-gray-500"
          >
            今天
          </button>
          <button
            type="button"
            onClick={() => navigate(1)}
            className="p-1.5 rounded-full hover:bg-white/60 transition-colors text-gray-500"
            aria-label="下个月"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center flex-1">
        {weekDays.map((d) => (
          <div key={d} className="text-[10px] text-gray-400 py-1">
            {d}
          </div>
        ))}
        {days.map((day, i) => {
          if (day === null) return <div key={`e${i}`} />;
          const dateStr = ymd(view.year, view.month, day);
          const isToday = isCurrentMonth && day === today.getDate();
          const hasEntry = markedSet.has(dateStr);

          const cell = (
            <motion.div
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className={`relative aspect-square flex items-center justify-center rounded-full text-xs cursor-pointer transition-colors ${
                isToday
                  ? 'bg-mint-400 text-white font-medium shadow-sm'
                  : hasEntry
                  ? 'text-gray-700 hover:bg-white/60 font-medium'
                  : 'text-gray-500 hover:bg-white/40'
              }`}
            >
              {day}
              {hasEntry && !isToday && (
                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-mint-400" />
              )}
              {hasEntry && isToday && (
                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-white/90" />
              )}
            </motion.div>
          );

          return hasEntry ? (
            <a key={dateStr} href={`${linkPrefix}${dateStr}`} className="block">
              {cell}
            </a>
          ) : (
            <div key={dateStr}>{cell}</div>
          );
        })}
      </div>
    </motion.div>
  );
}
