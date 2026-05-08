'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Eye, Sparkles, Code } from 'lucide-react';

interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  cover?: string;
  /** 浏览量（可选） */
  views?: number;
}

interface Props {
  projects: Project[];
}

export default function RandomProjectCard({ projects }: Props) {
  // SSR/初次渲染稳定取第 0 个，避免水合不一致；mount 后再随机
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (projects.length <= 1) return;
    setIndex(Math.floor(Math.random() * projects.length));
  }, [projects.length]);

  const project = projects[index];
  if (!project) {
    return (
      <div className="glass-container p-6 text-center text-sm text-gray-400">
        暂无项目
      </div>
    );
  }

  const initial = project.title.slice(0, 1);

  return (
    <motion.a
      href={project.link || `/projects/${project.slug}`}
      target={project.link ? '_blank' : undefined}
      rel={project.link ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-card p-3 group cursor-pointer relative overflow-hidden flex gap-3 items-stretch"
    >
      {/* Cover */}
      <div className="shrink-0 w-20 md:w-[88px] rounded-2xl overflow-hidden bg-gradient-to-br from-mint-300 to-amber-100 border border-white/60 flex items-center justify-center relative">
        {project.cover ? (
          <img
            src={project.cover}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <>
            <span className="font-hand text-4xl text-mint-700/70 select-none">
              {initial}
            </span>
            <Code
              size={14}
              className="absolute bottom-2 right-2 text-mint-700/50"
            />
          </>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center gap-2 text-[9px] tracking-[0.2em] text-gray-400 uppercase mb-1">
          <Sparkles size={10} className="text-mint-500" />
          <span>Featured Project</span>
        </div>
        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-mint-600 transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mt-1">
          {project.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] text-gray-600 bg-white/60 border border-white/50 px-1.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          {typeof project.views === 'number' && (
            <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 tabular-nums">
              <Eye size={11} />
              {project.views.toLocaleString()}
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
