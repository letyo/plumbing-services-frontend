import React, { useEffect, useRef, useState } from 'react';

const Section = ({ id, title, children }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0;
        if (isInView) {
          setIsVisible(true);
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Trigger on initial render
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      }}
    >
      <h1>{title}</h1>
      {children}
    </section>
  );
};

export default Section;