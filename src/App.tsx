import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThreeBackgroundCanvas } from './components/ThreeBackgroundCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ResearchSection } from './components/ResearchSection';
import { CompetenciesSection } from './components/CompetenciesSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ScrollToTop } from './components/ScrollToTop';

function PortfolioApp() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { isClinical } = useTheme();

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 overflow-x-hidden ${
        isClinical
          ? 'bg-slate-50 text-slate-900 selection:bg-purple-600 selection:text-white'
          : 'bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white'
      }`}
    >
      {/* 3D Ambient Background Canvas - consistent real-time physics in both themes */}
      <ThreeBackgroundCanvas />

      {/* Fixed Top Navigation Bar with Theme Switcher */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="relative z-10">
        <HeroSection />

        <ResearchSection />

        <CompetenciesSection />

        <ExperienceSection />

        <EducationSection />

        <AboutSection />

        <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Footer with social channels, contact methods, and centered Lubna Akter Portfolio */}
      <Footer />

      {/* Floating Scroll to Top Button with smooth lavender glow */}
      <ScrollToTop />

      {/* Interactive Full CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}
