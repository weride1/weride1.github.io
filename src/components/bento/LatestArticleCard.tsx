'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText } from 'lucide-react';

interface Props {
  article?: {
    slug: string;
    title: string;
    date: string;
    summary?: string;
    tags?: string[];
    cover?: string;
  };
}

export default function LatestArticleCard({ article }: Props) {
  if (!article) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="glass-card p-6 flex items-center justify-center text-sm text-gray-400"
      >
        暂无文章
      </motion.div>
    );
  }

  const initial = article.title.slice(0, 1);

  return (
    <motion.a
      href={`/articles/${article.slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass-card p-5 flex gap-4 items-stretch group cursor-pointer relative overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="shrink-0 w-20 rounded-2xl overflow-hidden bg-gradient-to-br from-mint-200 to-amber-100 border border-white/60 flex items-center justify-center">
        {article.cover ? (
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="font-hand text-4xl text-mint-700/70 select-none">
            {initial}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col py-1">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-1.5">
          <FileText size={10} />
          <span>Latest Post</span>
        </div>
        <h3 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-mint-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-1.5">
            {article.summary}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2">
          <time className="text-[11px] text-gray-400 tabular-nums">
            {article.date}
          </time>
          {article.tags && article.tags.length > 0 && (
            <span className="text-[10px] text-mint-600 bg-mint-100/80 px-2 py-0.5 rounded-full">
              #{article.tags[0]}
            </span>
          )}
        </div>
      </div>

      <ArrowUpRight
        size={14}
        className="absolute top-4 right-4 text-gray-300 group-hover:text-mint-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
      />
    </motion.a>
  );
}
