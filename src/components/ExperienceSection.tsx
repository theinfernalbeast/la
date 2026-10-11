import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, Award, HeartHandshake, Calendar, MapPin, CheckCircle2, History } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MilestoneItem {
  id: string;
  type: 'work' | 'venture' | 'certification' | 'extracurricular';
  title: string;
  organization: string;
  period: string;
  location?: string;
  points: string[];
}

export const ExperienceSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'experience' | 'certifications'>('all');
  const { lang, t } = useLanguage();

  const milestones: MilestoneItem[] = [
    {
      id: 'neymat',
      type: 'venture',
      title: 'Co-Founder',
      organization: 'Neymat Home Décor',
      period: '04/2026 - Present',
      location: 'Dhaka, Bangladesh',
      points: PORTFOLIO_DATA.workExperience[0] ? PORTFOLIO_DATA.workExperience[0].points : [
        'Co-founded an early-stage home décor brand, building it from the ground up primarily through social media-based sales and marketing.',
        'Grew order volume by nearly 20% since launch by managing sourcing, inventory, and customer engagement end-to-end.',
      ],
    },
    {
      id: 'pharma-insights',
      type: 'work',
      title: 'Education Byte Builder',
      organization: 'Pharma Insights',
      period: '01/2026 - 02/2026',
      location: 'Dhaka, Bangladesh',
      points: PORTFOLIO_DATA.workExperience[1] ? PORTFOLIO_DATA.workExperience[1].points : [
        'Produced research-backed content that strengthened platform credibility.',
        'Simplified complex pharma concepts into clear, engaging content.',
        'Researched pharmacy and healthcare topics to ensure content accuracy.',
        'Supported structured editorial planning and monthly scheduling.',
      ],
    },
    {
      id: 'cadd-cert',
      type: 'certification',
      title: 'Computer Aided Drug and Vaccine Design',
      organization: 'BioPC',
      period: 'Course Certification',
      points: ['Specialized computational drug and vaccine design training program.'],
    },
    {
      id: 'medicine-concept',
      type: 'certification',
      title: 'Medicine Concept Plus (10th Batch)',
      organization: 'Clear Concept',
      period: 'Clinical Course',
      points: ['Clinical pharmacotherapy, medicine concept fundamentals, and disease management.'],
    },
    {
      id: 'emaan',
      type: 'work',
      title: 'Branch In-Charge',
      organization: 'Emaan',
      period: '05/2023 - 07/2023',
      location: 'Dhaka, Bangladesh',
      points: PORTFOLIO_DATA.workExperience[2] ? PORTFOLIO_DATA.workExperience[2].points : [
        'Promoted to Branch In-Charge within one month for performance.',
        'Grew branch sales by up to 20% through strong customer engagement.',
        'Managed daily branch operations and supervised sales team performance.',
        'Boosted customer retention through improved service delivery.',
      ],
    },
    {
      id: 'girls-guide',
      type: 'extracurricular',
      title: 'Volunteer',
      organization: 'Bangladesh Girls Guide',
      period: '2014 - 2018',
      points: PORTFOLIO_DATA.extraCurricular[0].points,
    },
  ];

  const filteredMilestones = milestones.filter((m) => {
    if (filter === 'experience') return m.type === 'work' || m.type === 'venture';
    if (filter === 'certifications') return m.type === 'certification' || m.type === 'extracurricular';
    return true;
  });

  const getTypeBadge = (type: MilestoneItem['type']) => {
    switch (type) {
      case 'work':
        return { label: 'Work Experience', color: 'text-purple-300 bg-purple-500/15 border-purple-400/30' };
      case 'venture':
        return { label: 'Entrepreneurial Venture', color: 'text-indigo-300 bg-indigo-500/15 border-indigo-400/30' };
      case 'certification':
        return { label: 'Training & Certification', color: 'text-pink-300 bg-pink-500/15 border-pink-400/30' };
      case 'extracurricular':
        return { label: 'Affiliations & Voluntary', color: 'text-purple-300 bg-purple-500/15 border-purple-400/30' };
    }
  };

  return (
    <section id="experience" className="py-20 border-t border-purple-500/20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-mono mb-2">
              <History className="w-3.5 h-3.5 text-purple-400" />
              <span>{t.timeline.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">
              {t.timeline.title}
            </h2>
            <p className="text-sm text-purple-200/70 mt-1 max-w-xl">
              {t.timeline.subtitle}
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center bg-slate-900/90 border border-purple-500/20 p-1.5 rounded-xl shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.timeline.all}
            </button>
            <button
              onClick={() => setFilter('experience')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'experience'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.timeline.work}
            </button>
            <button
              onClick={() => setFilter('certifications')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'certifications'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.timeline.training}
            </button>
          </div>
        </motion.div>

        {/* Vertical Timeline Track */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-purple-500/30 space-y-10">
          <AnimatePresence mode="popLayout">
            {filteredMilestones.map((item, idx) => {
              const badge = getTypeBadge(item.type);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  {/* Glowing Node Dot on Timeline Spine */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-purple-400 group-hover:scale-125 group-hover:border-purple-300 transition-all shadow-sm shadow-purple-500/30">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full m-auto mt-0.5 group-hover:bg-purple-200 transition-colors" />
                  </div>

                  {/* Milestone Card */}
                  <motion.div
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="bg-slate-900/60 border border-purple-500/20 rounded-2xl p-6 hover:border-purple-400/50 transition-colors shadow-xl shadow-black/20"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3.5 border-b border-purple-500/20">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md border ${badge.color}`}>
                            {badge.label}
                          </span>
                          <span className="text-xs font-mono text-purple-300/80 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-purple-400" />
                            {item.period}
                          </span>
                          {item.location && (
                            <span className="text-xs text-purple-300/80 font-mono flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-purple-400" />
                              {item.location}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white">
                          {item.title}{' '}
                          <span className="text-slate-400 font-normal">at</span>{' '}
                          <span className="text-purple-300 font-semibold">{item.organization}</span>
                        </h3>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="text-purple-400 mt-1">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
