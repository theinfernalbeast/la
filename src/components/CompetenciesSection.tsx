import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Search, Sparkles, X, CheckCircle2, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SkillItem {
  id: string;
  name: string;
  category: 'core' | 'soft' | 'computer';
  categoryLabel: string;
}

export const CompetenciesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'core' | 'soft' | 'computer'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const { lang, t } = useLanguage();

  // Compile all skills directly from CV
  const allSkills: SkillItem[] = useMemo(() => {
    const list: SkillItem[] = [];

    PORTFOLIO_DATA.coreCompetencies.forEach((name, idx) => {
      list.push({
        id: `core-${idx}`,
        name,
        category: 'core',
        categoryLabel: t.skills.core,
      });
    });

    PORTFOLIO_DATA.softSkills.forEach((name, idx) => {
      list.push({
        id: `soft-${idx}`,
        name,
        category: 'soft',
        categoryLabel: t.skills.soft,
      });
    });

    PORTFOLIO_DATA.computerLiteracy.forEach((name, idx) => {
      list.push({
        id: `comp-${idx}`,
        name,
        category: 'computer',
        categoryLabel: t.skills.computer,
      });
    });

    return list;
  }, [t]);

  // Filter skills based on selected category and search input
  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [allSkills, selectedCategory, searchQuery]);

  const categoryCounts = {
    all: allSkills.length,
    core: PORTFOLIO_DATA.coreCompetencies.length,
    soft: PORTFOLIO_DATA.softSkills.length,
    computer: PORTFOLIO_DATA.computerLiteracy.length,
  };

  return (
    <section id="competencies" className="py-20 border-t border-purple-500/20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-mono mb-2">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.skills.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">
            {t.skills.title}
          </h2>
          <p className="text-sm text-purple-200/70 mt-1.5 max-w-2xl">
            {t.skills.subtitle}
          </p>
        </motion.div>

        {/* Interactive Controls Bar: Category Filters & Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-8 bg-slate-900/80 p-3 rounded-2xl border border-purple-500/20 shadow-lg"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t.skills.all} ({categoryCounts.all})
            </button>
            <button
              onClick={() => setSelectedCategory('core')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                selectedCategory === 'core'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t.skills.core} ({categoryCounts.core})
            </button>
            <button
              onClick={() => setSelectedCategory('soft')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                selectedCategory === 'soft'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t.skills.soft} ({categoryCounts.soft})
            </button>
            <button
              onClick={() => setSelectedCategory('computer')}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                selectedCategory === 'computer'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t.skills.computer} ({categoryCounts.computer})
            </button>
          </div>

          {/* Search Field */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.skills.searchPlaceholder}
              className="w-full bg-slate-950 border border-purple-500/20 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Interactive Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill === skill.id;

              const getBadgeColor = (category: SkillItem['category']) => {
                switch (category) {
                  case 'core':
                    return 'text-purple-300 bg-purple-500/15 border-purple-400/30';
                  case 'soft':
                    return 'text-indigo-300 bg-indigo-500/15 border-indigo-400/30';
                  case 'computer':
                    return 'text-pink-300 bg-pink-500/15 border-pink-400/30';
                }
              };

              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedSkill(isSelected ? null : skill.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-950 border-purple-400 shadow-md shadow-purple-500/20 lavender-glow'
                      : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold text-white leading-snug">
                      {skill.name}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 ${getBadgeColor(skill.category)}`}>
                      {skill.categoryLabel}
                    </span>
                  </div>

                  {/* Interactive Status Indicator on Selection */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2.5 pt-2 border-t border-purple-500/20 text-xs text-purple-300 flex items-center gap-1.5 font-mono"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>{t.skills.verified}</span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-slate-400 bg-slate-900/40 rounded-xl border border-purple-500/20">
            <p className="text-sm">{t.skills.noSkillsFound} "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2 text-xs text-purple-400 hover:underline cursor-pointer"
            >
              {t.skills.resetFilters}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
