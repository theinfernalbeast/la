import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA, ResearchProject } from '../data/portfolioData';
import { Maximize2, X, FlaskConical, Beaker, Sparkles, ChevronDown, CheckCircle2, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ResearchSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [clickedProjectId, setClickedProjectId] = useState<string | null>(null);
  const { lang, t } = useLanguage();

  return (
    <section id="research" className="py-20 border-t border-purple-500/20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-mono mb-2">
            <FlaskConical className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.research.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">
            {t.research.title}
          </h2>
          <p className="text-sm text-purple-200/70 mt-1.5 max-w-2xl">
            {t.research.subtitle}
          </p>
        </motion.div>

        {/* Interactive Projects Cards List */}
        <div className="space-y-8">
          {PORTFOLIO_DATA.researchProjects.map((project, idx) => {
            const isHovered = hoveredProjectId === project.id;
            const isClicked = clickedProjectId === project.id;
            const isExpanded = isHovered || isClicked;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => setClickedProjectId(isClicked ? null : project.id)}
                className={`relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden p-6 sm:p-7 shadow-xl shadow-black/20 ${
                  isExpanded
                    ? 'bg-slate-900/90 border-purple-400/70 lavender-glow scale-[1.01]'
                    : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-500/40'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Research Description (No Bullets, Hover Reveal) */}
                  <div className="lg:col-span-8 space-y-4">
                    {/* Role & Status Pill Bar */}
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded-md bg-purple-500/15 border border-purple-400/30 text-purple-300 font-semibold">
                        {project.role}
                      </span>
                      <span className="text-slate-400" aria-hidden="true">·</span>
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {project.status}
                      </span>
                      {project.institution && (
                        <>
                          <span className="text-slate-400" aria-hidden="true">·</span>
                          <span className="text-purple-300/80 text-[11px]">
                            {project.institution}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Project Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
                      {project.title}
                    </h3>

                    {/* Primary CV Description - Strictly No Bullet Points */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/20 text-slate-200 text-sm sm:text-base leading-relaxed">
                      {project.description}
                    </div>

                    {/* Interactive Hover Indicator */}
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-300/90 pt-1">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                      <span>{isExpanded ? (lang === 'bn' ? 'বিস্তারিত বৈজ্ঞানিক তথ্য উন্মোচিত' : 'Full scientific context revealed') : t.research.hoverToExpand}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-purple-400' : ''}`} />
                    </div>

                    {/* Expanded Scientific Content on Hover / Click */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-4 pt-3 border-t border-purple-500/20 overflow-hidden"
                        >
                          {/* Scientific Context Paragraph (Continuous Prose) */}
                          <div className="space-y-1.5">
                            <span className="text-xs font-mono uppercase tracking-wider text-purple-300 block">
                              {t.research.scientificContext}
                            </span>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-purple-950/20 p-3.5 rounded-xl border border-purple-500/20">
                              {project.scientificDetails}
                            </p>
                          </div>

                          {/* Methodology Highlights (Pill Badges instead of bullet points) */}
                          <div className="space-y-2">
                            <span className="text-xs font-mono uppercase tracking-wider text-purple-300 block">
                              {t.research.keyHighlights}
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {project.highlights.map((highlight, hIdx) => (
                                <div
                                  key={hIdx}
                                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right Column: Research Visual Asset & Lightbox */}
                  <div className="lg:col-span-4">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(project.image);
                      }}
                      className="relative rounded-xl overflow-hidden border border-purple-500/30 aspect-4/3 cursor-pointer group bg-slate-950 shadow-md"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                        <span className="px-3 py-1.5 text-xs text-white bg-purple-900/90 rounded-lg border border-purple-400/40 flex items-center gap-1.5 shadow-lg">
                          <Maximize2 className="w-3.5 h-3.5 text-purple-300" />
                          <span>{t.research.viewPhoto}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-11 right-0 text-slate-300 hover:text-white p-2 rounded-lg bg-slate-900/80 border border-slate-700 cursor-pointer"
              aria-label="Close image"
            >
              <X className="w-5 h-5 text-purple-400" />
            </button>
            <img
              src={selectedImage}
              alt="Research Visual Display"
              referrerPolicy="no-referrer"
              className="w-full max-h-[85vh] object-contain rounded-xl border border-purple-500/40 shadow-2xl"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
};
