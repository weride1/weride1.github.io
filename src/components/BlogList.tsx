'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Article {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

interface Props {
  articles: Article[];
}

export default function BlogList({ articles }: Props) {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const a of articles) for (const t of a.tags) set.add(t);
    return Array.from(set).sort();
  }, [articles]);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Sync with URL ?tag=xxx so links from article detail pages work
  useEffect(() => {
    const sync = () => {
      const tag = new URL(window.location.href).searchParams.get('tag');
      setActiveTag(tag);
    };
    sync();
    document.addEventListener('astro:page-load', sync);
    document.addEventListener('astro:after-swap', sync);
    window.addEventListener('popstate', sync);
    return () => {
      document.removeEventListener('astro:page-load', sync);
      document.removeEventListener('astro:after-swap', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  const setTag = (tag: string | null) => {
    setActiveTag(tag);
    const url = new URL(window.location.href);
    if (tag) url.searchParams.set('tag', tag);
    else url.searchParams.delete('tag');
    window.history.replaceState({}, '', url.toString());
  };

  const filtered = activeTag
    ? articles.filter((a) => a.tags.includes(activeTag))
    : articles;

  const grouped = useMemo(() => {
    const acc: Record<string, Article[]> = {};
    for (const a of filtered) {
      const year = new Date(a.date).getFullYear().toString();
      (acc[year] ||= []).push(a);
    }
    return acc;
  }, [filtered]);

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          <TagPill
            label="全部"
            active={activeTag === null}
            onClick={() => setTag(null)}
          />
          {allTags.map((tag) => (
            <TagPill
              key={tag}
              label={`#${tag}`}
              active={activeTag === tag}
              onClick={() => setTag(activeTag === tag ? null : tag)}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag ?? 'all'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-12"
        >
          {years.map((year) => (
            <section key={year}>
              <h2 className="text-5xl font-bold text-gray-200 mb-6 tracking-tighter">{year}</h2>
              <div className="space-y-1">
                {grouped[year].map((article) => (
                  <a
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="flex items-center justify-between py-4 px-5 -mx-5 rounded-2xl hover:bg-white/40 transition-all duration-300 group hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <time className="text-xs text-gray-400 tabular-nums shrink-0 w-16">
                        {article.date.slice(5)}
                      </time>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors truncate">
                        {article.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      {(article.tags.length > 0 ? article.tags : ['Article']).slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}

          {filtered.length === 0 && (
            <div className="glass-container p-12 text-center">
              <p className="text-gray-400 text-sm">
                {activeTag ? `没有找到 #${activeTag} 的文章` : '暂无文章'}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function TagPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 border ${
        active
          ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
          : 'bg-white/50 text-gray-600 border-white/40 hover:bg-white/70'
      }`}
    >
      {label}
    </motion.button>
  );
}
