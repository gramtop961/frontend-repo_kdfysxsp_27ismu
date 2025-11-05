import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 py-10 text-center text-white/60">
      <p>
        © {new Date().getFullYear()} — Built with care. Ride on.
      </p>
    </footer>
  );
};

export default Footer;
