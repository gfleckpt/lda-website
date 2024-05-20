import React, { useState, useEffect } from 'react';
import "../styles.css"
import "../otherstyles.css"
import { Slice } from "gatsby"

const Layout = ({ children }) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight * 0.01) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Slice alias="header" />
      {children}
      <Slice alias="footer" />
      {showTopBtn && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            display: 'inline-block',
            padding: '10px',
            zIndex: 1000
          }}
        >
          ↑
        </button>
      )}
    </>
  )
}

export default Layout
