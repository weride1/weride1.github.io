'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code } from 'lucide-react';

interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  featured?: boolean;
  size?: '1x1' | '2x2';
}

export default function MyProjects({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-6">我的项目</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <motion.a
            key={project.slug}
            href={project.link || `/projects/${project.slug}`}
            target={project.link ? '_blank' : undefined}
            rel={project.link ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card-sm p-5 cursor-pointer group relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-amber-100 flex items-center justify-center">
                <Code size={18} className="text-gray-600" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1.5 group-hover:text-gray-900 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-white/50 text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ArrowUpRight
                size={16}
                className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
