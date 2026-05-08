'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X } from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  alt: string;
}

const polaroidRotations = [-6, 4, -2, 6, -4, 2, -6, 4, -2];

export default function PhotoWall({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<Photo | null>(null);
  const displayPhotos = photos.slice(0, 4);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="glass-container p-8 h-full"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Camera size={16} className="text-mint-500" />
            <h2 className="text-lg font-semibold text-gray-800">照片墙</h2>
          </div>
          <a href="/photos" className="text-xs text-gray-400 hover:text-mint-600 transition-colors">
            查看全部
          </a>
        </div>

        {/* Polaroid stack effect */}
        <div className="relative h-64 mx-2">
          {displayPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: polaroidRotations[i % polaroidRotations.length],
                x: i * 45 - 140,
                y: i * 28,
              }}
              whileHover={{
                scale: 1.1,
                rotate: 0,
                zIndex: 10,
                y: -20,
                transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(photo)}
              className="absolute left-1/2 top-0 -translate-x-1/2 cursor-pointer"
              style={{ zIndex: i + 1 }}
            >
              <div className="relative bg-white p-2.5 pb-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                {/* paperclip decoration */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-3 rounded-t-md bg-gradient-to-b from-mint-300/80 to-mint-400/80 border-t border-white/60" />
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-32 h-32 object-cover rounded grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-8"
            onClick={() => setSelected(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(24px)' }}
              exit={{ backdropFilter: 'blur(0px)' }}
              className="absolute inset-0 bg-black/20"
            />

            {/* Photo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white p-3 rounded-2xl shadow-2xl">
                <img
                  src={selected.src}
                  alt={selected.alt}
                  className="w-full rounded-xl"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelected(null)}
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg"
              >
                <X size={16} className="text-gray-600" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
