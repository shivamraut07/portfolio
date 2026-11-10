import { useEffect, useRef } from 'react';

interface NetworkBackgroundProps {
  isDarkMode: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function NetworkBackground({ isDarkMode }: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const connectionDistance = 150;
    const pointerRadius = 140;
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
    const pointer = { x: -1000, y: -1000 };
    let animationFrame = 0;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const updatePointer = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const clearPointer = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const draw = () => {
      const isDark =
        document.documentElement.classList.contains('dark') ||
        document.body.classList.contains('dark') ||
        isDarkMode;
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        const pointerDx = particle.x - pointer.x;
        const pointerDy = particle.y - pointer.y;
        const pointerDistance = Math.hypot(pointerDx, pointerDy);

        if (pointerDistance < pointerRadius && pointerDistance > 0) {
          const force = ((pointerRadius - pointerDistance) / pointerRadius) * 0.012;
          particle.vx += (pointerDx / pointerDistance) * force;
          particle.vy += (pointerDy / pointerDistance) * force;
        }

        particle.vx = Math.max(-0.55, Math.min(0.55, particle.vx));
        particle.vy = Math.max(-0.55, Math.min(0.55, particle.vy));
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (distance < connectionDistance) {
            const alpha = 1 - distance / connectionDistance;
            context.beginPath();
            context.strokeStyle = isDark
              ? `rgba(34, 211, 238, ${alpha * 0.6})`
              : `rgba(15, 23, 42, ${alpha * 0.3})`;
            context.lineWidth = 1;
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }

        context.beginPath();
        context.fillStyle = isDark ? 'rgba(34, 211, 238, 0.8)' : 'rgba(15, 23, 42, 0.35)';
        context.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const themeObserver = new MutationObserver(() => {
      context.clearRect(0, 0, width, height);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    resizeCanvas();
    animationFrame = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('pointerleave', clearPointer);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      themeObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerleave', clearPointer);
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-40" />;
}
