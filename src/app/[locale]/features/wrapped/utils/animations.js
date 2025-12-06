/* eslint-disable import/no-named-as-default */
import gsap from 'gsap';

/**
 * GSAP Animation utilities for Wrapped
 * Sistema de diseño Animanga Wrapped 2025
 * Motion specs: ease-out para entradas, ease-in para salidas
 */

/**
 * Fade in animation
 * Duration: 0.5s (animaciones generales)
 */
export function fadeIn(element, options = {}) {
  const defaults = {
    duration: 0.5,
    ease: 'power2.out', // ease-out para entradas
    opacity: 1,
  };

  return gsap.fromTo(element, { opacity: 0 }, { ...defaults, ...options, opacity: 1 });
}

/**
 * Slide up animation
 * Duration: 0.6s con ease-out
 */
export function slideUp(element, options = {}) {
  const defaults = {
    duration: 0.6,
    ease: 'power2.out', // ease-out para entradas
    y: 0,
    opacity: 1,
  };

  return gsap.fromTo(element, { y: 100, opacity: 0 }, { ...defaults, ...options });
}

/**
 * Slide left animation (transición entre pantallas)
 * Duration: 0.3s (250-350ms según specs)
 */
export function slideLeft(element, options = {}) {
  const defaults = {
    duration: 0.3,
    ease: 'power2.out', // ease-out para entradas
    x: 0,
    opacity: 1,
  };

  return gsap.fromTo(element, { x: 100, opacity: 0 }, { ...defaults, ...options });
}

/**
 * Scale in animation (números grandes, portadas)
 * Con overshoot ligero (1.03 → 1.0)
 */
export function scaleIn(element, options = {}) {
  const defaults = {
    duration: 0.6,
    ease: 'back.out(1.3)', // Overshoot más sutil
    scale: 1,
    opacity: 1,
  };

  return gsap.fromTo(element, { scale: 0.7, opacity: 0 }, { ...defaults, ...options });
}

/**
 * Stagger animation for lists (Top 5, etc.)
 * Duration: 0.5s con stagger de 0.1s (100ms según specs)
 */
export function staggerIn(elements, options = {}) {
  const defaults = {
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.1, // 80-120ms según specs
    y: 0,
    opacity: 1,
  };

  return gsap.fromTo(elements, { y: 50, opacity: 0 }, { ...defaults, ...options });
}

/**
 * Number counter animation
 * Duration: 0.7s (600-800ms según specs)
 */
export function animateCounter(element, targetValue, options = {}) {
  const defaults = {
    duration: 0.7, // Actualizado de 2s a 0.7s
    ease: 'power2.out',
    decimals: 0,
  };

  const config = { ...defaults, ...options };
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: targetValue,
    duration: config.duration,
    ease: config.ease,
    onUpdate: () => {
      if (element) {
        element.textContent = obj.value.toFixed(config.decimals);
      }
    },
  });
}

/**
 * Bounce animation
 */
export function bounce(element, options = {}) {
  const defaults = {
    duration: 0.8,
    ease: 'elastic.out(1, 0.3)',
    scale: 1,
  };

  return gsap.fromTo(element, { scale: 0 }, { ...defaults, ...options, scale: 1 });
}

/**
 * Pulse animation (looping)
 * Para emblemas del club (1.0 → 1.03 → 1.0)
 */
export function pulse(element, options = {}) {
  const defaults = {
    duration: 2, // ~2s según specs del club
    ease: 'power1.inOut',
    scale: 1.03, // Pulso sutil
    repeat: -1,
    yoyo: true,
  };

  return gsap.to(element, { ...defaults, ...options });
}

/**
 * Create a master timeline for slide content
 */
export function createSlideTimeline() {
  return gsap.timeline({
    defaults: {
      ease: 'power2.out',
    },
  });
}

/**
 * Entrance sequence for typical slide
 * Title -> Big number -> Description -> CTA
 */
export function slideEntranceSequence(timeline, { title, number, description, cta }) {
  if (title) {
    timeline.add(fadeIn(title, { duration: 0.5 }), 0);
  }

  if (number) {
    timeline.add(scaleIn(number, { duration: 0.8 }), 0.3);
  }

  if (description) {
    timeline.add(slideUp(description, { duration: 0.5 }), 0.8);
  }

  if (cta) {
    timeline.add(fadeIn(cta, { duration: 0.4 }), 1.2);
  }

  return timeline;
}

/**
 * Background gradient animation
 */
export function animateGradient(element) {
  return gsap.to(element, {
    backgroundPosition: '100% 50%',
    duration: 8,
    ease: 'none',
    repeat: -1,
    yoyo: true,
  });
}

/**
 * Rotate animation (for loading or effects)
 */
export function rotate(element, options = {}) {
  const defaults = {
    rotation: 360,
    duration: 2,
    ease: 'none',
    repeat: -1,
  };

  return gsap.to(element, { ...defaults, ...options });
}

/**
 * Fade out and slide down exit
 * Ease-in para salidas según specs
 */
export function exitSlide(element, options = {}) {
  const defaults = {
    duration: 0.3, // Transición entre pantallas 250-350ms
    ease: 'power2.in', // ease-in para salidas
    y: -50,
    opacity: 0,
  };

  return gsap.to(element, { ...defaults, ...options });
}
