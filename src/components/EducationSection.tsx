import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, School, Calendar, Award, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EducationSection: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const { lang, t } = useLanguage();

  return (
    <section id="education" className="py-20 border-t border-purple-500/20 relative">
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
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.education.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">
            {t.education.title}
          </h2>
          <p className="text-sm text-purple-200/70 mt-1.5 max-w-2xl">
            {t.education.subtitle}
          </p>
        </motion.div>

        {/* Discipline-First Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.education.map((item, idx) => {
            const isHovered = hoveredCardIndex === idx;
            const isClicked = activeCardIndex === idx;
            const isExpanded = isHovered || isClicked;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredCardIndex(idx)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                onClick={() => setActiveCardIndex(isClicked ? null : idx)}
                className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-slate-900 border-purple-400 shadow-xl shadow-purple-500/15 lavender-glow scale-[1.02]'
                    : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50 shadow-md shadow-black/20'
                }`}
              >
                {/* Discipline Header (Clean, only discipline shown initially) */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`p-3 rounded-xl border transition-colors ${
                      isExpanded
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                    }`}>
                      <GraduationCap className="w-5 h-5" />
                    </div>

                    <div className="text-[11px] font-mono text-purple-300/80 flex items-center gap-1">
                      <span>{t.education.hoverInstruction}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-purple-400' : ''}`} />
                    </div>
                  </div>

                  {/* Primary Focus: Just The Discipline */}
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {item.discipline}
                  </h3>
                </div>

                {/* Animated Disclosure: Grade and Details revealed ONLY upon hover or click */}
                <div className="mt-5 pt-4 border-t border-purple-500/20">
                  {isExpanded ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-3 text-xs"
                    >
                      {/* Institution */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-purple-300 uppercase block tracking-wider">
                          {t.education.institution}
                        </span>
                        <div className="text-slate-200 font-semibold flex items-start gap-1.5 leading-snug">
                          <School className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>{item.institution}</span>
                        </div>
                      </div>

                      {/* Year & Location */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-purple-300 uppercase block tracking-wider">
                          {t.education.timelineYear}
                        </span>
                        <div className="text-slate-300 font-mono flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{item.yearStatus}</span>
                        </div>
                      </div>

                      {/* Result / Grade - ONLY visible when hovered or clicked */}
                      <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider">
                          {t.education.result}
                        </span>
                        <span className="text-sm font-bold font-mono text-purple-200 tabular-nums bg-purple-950/70 px-2.5 py-0.5 rounded-lg border border-purple-400/50 shadow-sm shadow-purple-900/30">
                          {item.result}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-purple-300/70">
                      <span className="font-mono text-[11px]">
                        {t.education.tapToReveal}
                      </span>
                      <span className="text-[10px] font-mono text-purple-400">
                        ••••
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
