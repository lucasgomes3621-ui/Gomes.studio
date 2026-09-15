/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ManifestoSection } from './components/ManifestoSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { FounderSection } from './components/FounderSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TechQuantumBackground } from './components/TechQuantumBackground';
import { InteractiveCursor } from './components/InteractiveCursor';
import { ImageModal } from './components/ImageModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<string>('Landing Page Profissional');

  // Image Modal state
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [modalImageTitle, setModalImageTitle] = useState('');
  const [modalCodeSnippet, setModalCodeSnippet] = useState<string | undefined>();

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = ['inicio', 'manifesto', 'projetos', 'servicos', 'diferenciais', 'processo', 'sobre', 'fundador', 'contato'];
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'manifesto') {
            setActiveSection('inicio');
          } else if (id === 'diferenciais' || id === 'processo') {
            setActiveSection('servicos');
          } else {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.25,
      rootMargin: '-80px 0px -40% 0px',
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleOpenImage = (src: string, title: string, codeSnippet?: string) => {
    setModalImageSrc(src);
    setModalImageTitle(title);
    setModalCodeSnippet(codeSnippet);
    setImageModalOpen(true);
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-[#E2E8F0] selection:bg-[#0066FF] selection:text-white flex flex-col relative overflow-x-hidden">
      {/* High-Tech Quantum Matrix & Data Pulses Looping Animation Background */}
      <TechQuantumBackground />

      {/* Kinetic Interactive Cursor with dynamic movement ribbon glow */}
      <InteractiveCursor />

      {/* Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 flex flex-col relative z-10">
        <Hero onImageClick={handleOpenImage} />
        <ManifestoSection />
        <ProjectsSection
          onImageClick={handleOpenImage}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
        <ServicesSection onSelectService={handleSelectService} />
        <FeaturesSection />
        <ProcessSection />
        <AboutSection />
        <FounderSection onImageClick={handleOpenImage} />
        <ContactSection initialService={selectedService} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Image Lightbox & HTML Snippet Modal */}
      <ImageModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        imageSrc={modalImageSrc}
        title={modalImageTitle}
        codeSnippet={modalCodeSnippet}
      />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onImageClick={handleOpenImage}
      />
    </div>
  );
}
