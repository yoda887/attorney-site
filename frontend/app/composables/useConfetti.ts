export const useConfetti = () => {
  const trigger = () => {
    // Check if reduced motion is enabled to respect WCAG accessibility rules
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const colors = ['#C78C19', '#1B2A4A', '#FFFFFF'];
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = Math.random() * 8 + 4 + 'px';
      confetti.style.height = Math.random() * 12 + 6 + 'px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      confetti.style.zIndex = '10000';
      confetti.style.pointerEvents = 'none';
      confetti.style.boxShadow = '0 2px 4px rgba(27, 42, 74, 0.2)';
      document.body.appendChild(confetti);

      const animationDuration = Math.random() * 2 + 1.5;
      
      confetti.animate([
        { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
        { transform: `translate3d(${Math.random() * 300 - 150}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: animationDuration * 1000,
        easing: 'cubic-bezier(.37,0,.63,1)',
        fill: 'forwards'
      });

      setTimeout(() => confetti.remove(), animationDuration * 1000);
    }
  };

  return { trigger };
};
