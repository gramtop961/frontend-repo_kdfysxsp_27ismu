import React, { useRef } from 'react';
import Hero from './components/Hero.jsx';
import Rail from './components/Rail.jsx';
import Section from './components/Section.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const railAnchorRef = useRef(null);

  const startJourney = () => {
    railAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-black text-white">
      <Hero onStart={startJourney} />

      {/* Anchor before the rail to ensure proper scroll target */}
      <div ref={railAnchorRef} />
      <Rail />

      <Section id="about" title="About" accent="from-purple-500 to-pink-500">
        <p>
          I craft thoughtful digital products with a blend of code, motion, and play. My focus is
          building fast, expressive interfaces that feel alive while staying accessible and robust.
        </p>
        <p className="mt-4">
          This space is a living lab — I love sharing experiments and deep dives into the creative
          process behind interactive experiences.
        </p>
      </Section>

      <Section id="work" title="Selected Work" accent="from-emerald-500 to-cyan-500">
        <ul className="space-y-3">
          <li className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
            Dynamic data visualizations for a fintech dashboard, featuring realtime animations and
            accessibility-first patterns.
          </li>
          <li className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
            Immersive storytelling microsite with parallax scroll, 3D elements, and buttery page
            transitions.
          </li>
          <li className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
            Component library and design tokens for a product suite used by multiple teams.
          </li>
        </ul>
      </Section>

      <Section id="contact" title="Contact" accent="from-indigo-500 to-sky-500">
        <p>
          Want to collaborate or just say hi? I’m open to freelance and full-time opportunities.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 font-medium text-black transition hover:bg-white/90"
          >
            Email me
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-3 font-medium text-white/90 hover:text-white hover:border-white/40"
          >
            Explore work
          </a>
        </div>
      </Section>

      <Footer />
    </div>
  );
}

export default App;
