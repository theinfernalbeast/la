import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA, PersonalInterestItem } from '../data/portfolioData';
import { 
  Tv, 
  Sparkles, 
  BookOpen, 
  Utensils, 
  Heart, 
  Compass, 
  ChevronDown, 
  UserCheck, 
  Mail, 
  Phone,
  Globe,
  Droplet,
  Languages,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const [hoveredInterestId, setHoveredInterestId] = useState<string | null>(null);
  const [clickedInterestId, setClickedInterestId] = useState<string | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<'all' | 'bn' | 'en'>('all');
  const { lang, t } = useLanguage();

  const getInterestIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-indigo-400" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-purple-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-pink-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-violet-400" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="about" className="py-20 border-t border-purple-500/20 relative">
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
            <Heart className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.about.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-xl">
            {t.about.interestsSubtitle}
          </p>
        </motion.div>

        {/* Top Feature: The 5 Personal Interests (Interactive Cards Layout) */}
        <div className="mb-12">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-purple-500/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                {t.about.interestsTitle}
              </h3>
            </div>
            <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-400/30">
              {PORTFOLIO_DATA.personalInterests.length} Passions
            </span>
          </div>

          {/* 5 Distinct Cards in responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PORTFOLIO_DATA.personalInterests.map((interest) => {
              const isHovered = hoveredInterestId === interest.id;
              const isClicked = clickedInterestId === interest.id;
              const isExpanded = isHovered || isClicked;

              return (
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  onMouseEnter={() => setHoveredInterestId(interest.id)}
                  onMouseLeave={() => setHoveredInterestId(null)}
                  onClick={() => setClickedInterestId(isClicked ? null : interest.id)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isExpanded
                      ? 'bg-slate-900 border-purple-400 shadow-xl shadow-purple-500/15 lavender-glow scale-[1.02]'
                      : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50 shadow-md shadow-black/20'
                  }`}
                >
                  <div>
                    {/* Header: Icon + Title + Category */}
                    <div className="flex items-start gap-3.5 mb-3">
                      <div
                        className={`p-3 rounded-xl border transition-colors shrink-0 ${
                          isExpanded
                            ? 'bg-purple-950/80 border-purple-400 text-purple-200'
                            : 'bg-slate-950 border-purple-500/20 text-purple-300'
                        }`}
                      >
                        {getInterestIcon(interest.icon)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {interest.title}
                        </h4>
                        <span className="text-[11px] font-mono text-purple-300/80 block mt-1 truncate">
                          {interest.category}
                        </span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      {interest.shortDesc}
                    </p>

                    {/* Keywords pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {interest.keywords.map((kw, kIdx) => (
                        <span
                          key={kIdx}
                          className="text-[10px] font-mono bg-purple-500/10 text-purple-200 px-2 py-0.5 rounded border border-purple-500/20"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Deep Narrative on Hover / Click */}
                  <div className="mt-4 pt-3 border-t border-purple-500/20">
                    {isExpanded ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-2 text-xs"
                      >
                        <p className="text-purple-200/90 leading-relaxed bg-purple-950/40 p-3 rounded-xl border border-purple-500/30">
                          {interest.detailedDesc}
                        </p>
                      </motion.div>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] font-mono text-purple-400/80">
                        <span>{t.about.hoverToExplore}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Lower Row: Personal Particulars with Interactive Language Bar & Academic References */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Personal Particulars with Language Bar (NO WhatsApp here) */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-900/60 border border-purple-500/20 rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/20"
            >
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-purple-500/20">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <h3 className="text-base font-bold text-white">
                    {t.about.detailsTitle}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-purple-300">Verified Particulars</span>
              </div>

              {/* 2 Particulars: Nationality & Blood Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
                <div className="p-4 bg-slate-950/80 border border-purple-500/20 hover:border-purple-400/60 rounded-xl transition-all hover:scale-[1.02] group">
                  <span className="text-purple-300/80 block text-[11px] font-mono uppercase tracking-wider">
                    {t.about.nationality}
                  </span>
                  <div className="text-white font-semibold text-sm mt-1.5 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-purple-400" />
                    <span>{PORTFOLIO_DATA.personalDetails.nationality}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/80 border border-purple-500/20 hover:border-purple-400/60 rounded-xl transition-all hover:scale-[1.02] group">
                  <span className="text-purple-300/80 block text-[11px] font-mono uppercase tracking-wider">
                    {t.about.bloodGroup}
                  </span>
                  <div className="text-purple-300 font-bold font-mono text-base mt-1 flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-purple-400" />
                    <span>{PORTFOLIO_DATA.personalDetails.bloodGroup}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Language Proficiency Bar */}
              <div className="p-4 bg-slate-950/90 border border-purple-500/30 rounded-xl space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-300">
                      Language Proficiency
                    </span>
                  </div>
                  {/* Interactive toggle filter pills */}
                  <div className="flex items-center gap-1 bg-purple-950/50 p-0.5 rounded-lg border border-purple-500/30 text-[10px] font-mono">
                    <button
                      onClick={() => setActiveLangTab('all')}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        activeLangTab === 'all'
                          ? 'bg-purple-500 text-white font-bold'
                          : 'text-purple-300 hover:text-white'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveLangTab('bn')}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        activeLangTab === 'bn'
                          ? 'bg-purple-500 text-white font-bold'
                          : 'text-purple-300 hover:text-white'
                      }`}
                    >
                      Bengali
                    </button>
                    <button
                      onClick={() => setActiveLangTab('en')}
                      className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                        activeLangTab === 'en'
                          ? 'bg-purple-500 text-white font-bold'
                          : 'text-purple-300 hover:text-white'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                {/* Bengali Bar */}
                {(activeLangTab === 'all' || activeLangTab === 'bn') && (
                  <div className="space-y-1.5 transition-all">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>Bengali (বাংলা)</span>
                      </span>
                      <span className="font-mono text-purple-300 text-[11px]">Native / First Language (100%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-purple-500/20">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full shadow-sm shadow-purple-500/40"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">Mother tongue, fully bilingual in academic and clinical discourse.</p>
                  </div>
                )}

                {/* English Bar */}
                {(activeLangTab === 'all' || activeLangTab === 'en') && (
                  <div className="space-y-1.5 transition-all pt-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>English</span>
                      </span>
                      <span className="font-mono text-indigo-300 text-[11px]">Professional Working & Fluent (92%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-purple-500/20">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '92%' }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full shadow-sm shadow-indigo-500/40"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">Primary medium for scientific writing, pharmacological literature, and research.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Academic References */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-900/60 border border-purple-500/20 rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/20 space-y-4"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-purple-500/20">
                <UserCheck className="w-4 h-4 text-purple-400" />
                <h3 className="text-base font-bold text-white">
                  {t.about.referencesTitle}
                </h3>
              </div>

              <div className="space-y-4">
                {PORTFOLIO_DATA.references.map((ref, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-950/80 border border-purple-500/20 rounded-xl text-xs sm:text-sm space-y-2 hover:border-purple-400/50 transition-colors"
                  >
                    <div className="font-bold text-white text-sm sm:text-base">{ref.name}</div>
                    <div className="text-purple-300 font-mono text-xs">{ref.title}</div>
                    <div className="text-slate-400 text-xs">{ref.institution}</div>
                    <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-300 font-mono">
                      <a href={`tel:${ref.phone.split(' ')[0]}`} className="hover:text-purple-300 flex items-center gap-1.5 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-purple-400" />
                        <span>{ref.phone}</span>
                      </a>
                      <a href={`mailto:${ref.email}`} className="hover:text-purple-300 flex items-center gap-1.5 transition-colors">
                        <Mail className="w-3.5 h-3.5 text-purple-400" />
                        <span>{ref.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
