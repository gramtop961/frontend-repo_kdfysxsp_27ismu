import React, { useEffect, useMemo, useRef, useState } from 'react';

const stations = [
  { key: 'about', label: 'About' },
  { key: 'work', label: 'Work' },
  { key: 'contact', label: 'Contact' },
];

const clamp = (n, min, max) => Math.max(min, Math.min(n, max));

const Rail = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const trainRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0..1 across the rail

  // Compute station stops evenly spaced along the track
  const stops = useMemo(() => {
    const count = stations.length - 1;
    return stations.map((s, i) => ({ ...s, p: count === 0 ? 0 : i / count }));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight; // scrollable height within this section
      const scrolled = clamp(1 - (rect.bottom - window.innerHeight) / total, 0, 1);
      setProgress(isNaN(scrolled) ? 0 : scrolled);
    };

    const onResize = () => onScroll();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Translate train along the track
  const trainStyle = useMemo(() => {
    const trackWidth = trackRef.current?.offsetWidth || 0;
    const trainWidth = trainRef.current?.offsetWidth || 0;
    const maxX = Math.max(0, trackWidth - trainWidth);
    const x = maxX * progress;
    return { transform: `translateX(${x}px)` };
  }, [progress]);

  // Determine active station based on progress
  const activeKey = useMemo(() => {
    const nearest = stops.reduce((acc, s) => {
      const d = Math.abs(progress - s.p);
      if (!acc || d < acc.d) return { key: s.key, d };
      return acc;
    }, null);
    return nearest?.key || stations[0].key;
  }, [progress, stops]);

  const scrollToSection = (key) => {
    const target = document.getElementById(key);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section ref={sectionRef} className="relative h-[250vh] bg-neutral-950 text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background parallax layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black opacity-90" />
        </div>

        {/* Track */}
        <div className="relative z-10 mx-auto mt-24 h-[2px] w-[1600px] max-w-[94vw] bg-white/20" ref={trackRef}>
          {/* Stations */}
          {stops.map((s, i) => (
            <div
              key={s.key}
              className="absolute -top-3"
              style={{ left: `calc(${s.p * 100}% - 8px)` }}
            >
              <div className={`h-4 w-4 rounded-full transition-colors ${activeKey === s.key ? 'bg-white' : 'bg-white/40'}`} />
              <button
                onClick={() => scrollToSection(s.key)}
                className={`mt-3 text-xs sm:text-sm md:text-base transition-colors ${activeKey === s.key ? 'text-white' : 'text-white/60'} hover:text-white`}
              >
                {s.label}
              </button>
            </div>
          ))}

          {/* Train */}
          <div
            ref={trainRef}
            className="absolute -top-6 flex items-center gap-2 transition-transform"
            style={trainStyle}
          >
            <div className="h-10 w-16 rounded-md bg-white/90 shadow-xl shadow-black/30" />
            <div className="h-8 w-12 rounded-md bg-white/70" />
            <div className="h-8 w-12 rounded-md bg-white/60" />
          </div>
        </div>

        {/* Headline */}
        <div className="pointer-events-none absolute inset-x-0 top-1/3 flex flex-col items-center px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Ride the Line</h2>
          <p className="mt-3 max-w-xl text-white/70">Scroll to glide between stations. Click a stop to jump.</p>
        </div>
      </div>
    </section>
  );
};

export default Rail;
