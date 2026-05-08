'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronDown } from 'lucide-react';

interface FeedItem {
  slug: string;
  date: string;
  mood?: string;
  content: string;
}

const PREVIEW_CHARS = 60;

function isLong(content: string) {
  return Array.from(content).length > PREVIEW_CHARS;
}

export default function DailyFeed({ feed }: { feed: FeedItem[] }) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const toggleExpand = (slug: string) => {
    setExpandedSlug(expandedSlug === slug ? null : slug);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-container p-3 flex flex-col"
      style={{ height: '300px' }}
    >
      {/* 固定标题 */}
      <div className="flex items-center gap-2 mb-3 shrink-0">
        <Activity size={14} className="text-emerald-500" />
        <h2 className="text-sm font-semibold text-gray-800">信息流日报</h2>
      </div>

      {/* 可滚动内容区 */}
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="relative pl-6">
          {/* Timeline dashed line */}
          <div className="absolute left-3 top-2 bottom-2 w-px border-l border-dashed border-gray-300" />

          <div className="space-y-2">
            {feed.map((item, i) => {
              const isExpanded = expandedSlug === item.slug;
              return (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-5 top-3 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />

                  <motion.div
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
                    className="rounded-2xl p-2 cursor-pointer transition-all duration-300"
                    onClick={() => toggleExpand(item.slug)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <time className="text-xs text-gray-400 font-mono">
                          {item.date.slice(5)}
                        </time>
                        {item.mood && (
                          <span className="text-sm">{item.mood}</span>
                        )}
                      </div>
                      {isLong(item.content) && (
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={14} className="text-gray-400" />
                        </motion.div>
                      )}
                    </div>

                    <motion.p
                      initial={false}
                      animate={{ height: 'auto' }}
                      className={`text-sm text-gray-600 leading-relaxed whitespace-pre-wrap ${
                        isLong(item.content) && !isExpanded ? 'line-clamp-2' : ''
                      }`}
                    >
                      {item.content}
                    </motion.p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
        {feed.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">暂无动态</p>
        )}
      </div>
    </motion.div>
  );
}
