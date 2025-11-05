import React from 'react';

const Section = ({ id, title, children, accent = 'from-indigo-500 to-cyan-400' }) => {
  return (
    <section id={id} className="relative scroll-mt-20 bg-black py-24 text-white">
      <div className="absolute inset-0 opacity-[0.08]">
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${accent}`} />
      </div>
      <div className="relative mx-auto max-w-5xl px-6">
        <h3 className="text-3xl font-semibold md:text-4xl">{title}</h3>
        <div className="mt-6 text-white/80 leading-relaxed md:text-lg">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
