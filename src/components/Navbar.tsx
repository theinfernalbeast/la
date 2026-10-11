import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';

interface NavbarProps {
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { isClinical } = useTheme();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isClinical
          ? isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-purple-200/80 shadow-md shadow-slate-200/40'
            : 'bg-transparent border-b border-transparent'
          : isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-purple-500/25 shadow-xl shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Thin, animated scroll progress bar at the top of the viewport */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-300 origin-left z-50 shadow-sm shadow-purple-500/50"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Distinctive Portfolio Logo (No text 'lubna akter') */}
          <a
            href="#"
            aria-label="Portfolio Home"
            title="Portfolio Home"
            className="group flex items-center gap-3 shrink-0 py-1 transition-all"
          >
            {/* Elegant Modern Pharmaceutical & Portfolio Monogram Emblem */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/30 via-purple-600/20 to-indigo-900/40 border border-purple-400/50 shadow-md shadow-purple-950/50 group-hover:border-purple-300 group-hover:scale-105 transition-all">
              <svg
                viewBox="0 0 40 40"
                className="w-6 h-6 text-purple-300 group-hover:text-purple-100 transition-colors drop-shadow"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Hexagonal molecular ring emblem */}
                <polygon
                  points="20,4 34,12 34,28 20,36 6,28 6,12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-400"
                />
                {/* Central Stylized Cross / Diamond node */}
                <circle cx="20" cy="20" r="3.5" fill="currentColor" className="text-purple-300" />
                <path
                  d="M20 9V14M20 26V31M10 15L14 17.5M26 22.5L30 25M10 25L14 22.5M26 17.5L30 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="text-purple-400/80"
                />
              </svg>
              {/* Subtle pulsing indicator pip */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-purple-400 border-2 border-slate-950 animate-pulse" />
            </div>

            {/* Logo Badge Label */}
            <div className="flex items-center">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-purple-300 group-hover:text-purple-200 transition-colors flex items-center gap-1.5">
                <span>PORTFOLIO</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a
              href="#research"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              {t.nav.research}
            </a>
            <a
              href="#competencies"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              {t.nav.skills}
            </a>
            <a
              href="#experience"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              {t.nav.timeline}
            </a>
            <a
              href="#education"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              {t.nav.education}
            </a>
            <a
              href="#about"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              {t.nav.about}
            </a>
            <a
              href="#contact"
              className="hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-purple-400"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Actions (Theme Switcher only) */}
          <div className="hidden sm:flex items-center gap-2.5">
            <ThemeSwitcher />
          </div>

          {/* Mobile Right Controls: Theme + Hamburger */}
          <div className="flex sm:hidden items-center gap-1.5">
            <ThemeSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-lg border focus:outline-none ${
                isClinical
                  ? 'bg-white border-slate-200 text-slate-700'
                  : 'bg-slate-900 border-purple-500/30 text-slate-300 hover:text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-4 pt-2 pb-5 space-y-2.5 backdrop-blur-xl transition-colors ${
            isClinical
              ? 'bg-white/98 border-purple-200 text-slate-800 shadow-xl'
              : 'bg-slate-950/98 border-purple-500/20 text-slate-200'
          }`}
        >
          <a
            href="#research"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-purple-300 py-1"
          >
            {t.nav.research}
          </a>
          <a
            href="#competencies"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-purple-300 py-1"
          >
            {t.nav.skills}
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-purple-300 py-1"
          >
            {t.nav.timeline}
          </a>
          <a
            href="#education"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-purple-300 py-1"
          >
            {t.nav.education}
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-purple-300 py-1"
          >
            {t.nav.about}
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-purple-300 py-1"
          >
            {t.nav.contact}
          </a>
        </div>
      )}
    </header>
  );
};
