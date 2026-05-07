'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { List } from 'lucide-react';

export interface TocItem {
  depth: number;
  text: string;
  slug: string;
}

interface Props {
  items: TocItem[];
}

export default function Toc({ items }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .map((it) => document.getElementById(it.slug))
      .filter((el): el is HTMLElement => !!el);

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveSlug(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -65% 0px',
        threshold: [0, 1],
      }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav
      aria-label="目录"
      className="hidden xl:block sticky top-28 self-start ml-8 w-56 shrink-0"
    >
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
        <List size={12} />
        <span>目录</span>
      </div>
      <ul className="space-y-1.5 border-l border-white/40">
        {items.map((it) => {
          const isActive = activeSlug === it.slug;
          return (
            <li key={it.slug} style={{ paddingLeft: (it.depth - 2) * 12 }}>
              <a
                href={`#${it.slug}`}
                className={`relative block pl-3 -ml-px py-0.5 text-xs leading-relaxed border-l transition-colors duration-200 ${
                  isActive
                    ? 'text-gray-900 border-morandi-sage'
                    : 'text-gray-400 hover:text-gray-700 border-transparent'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="toc-active-marker"
                    className="absolute -left-px top-0 bottom-0 w-px bg-morandi-sage"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {it.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
