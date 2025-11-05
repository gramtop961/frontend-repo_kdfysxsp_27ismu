import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = ({ onStart }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlays for contrast (won't block interaction) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-semibold md:text-6xl tracking-tight">
          A Playful, Interactive Portfolio
        </h1>
        <p className="mt-4 max-w-2xl text-white/80 md:text-lg">
          Scroll to ride the line. Each station reveals a different chapter — About, Work, and Contact.
        </p>
        <button
          onClick={onStart}
          className="mt-8 rounded-full bg-white/90 px-6 py-3 text-black transition hover:bg-white"
        >
          Start the journey
        </button>
      </div>
    </section>
  );
};

export default Hero;
