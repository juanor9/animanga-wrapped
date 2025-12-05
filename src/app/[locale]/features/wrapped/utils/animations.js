/* eslint-disable import/no-named-as-default */
import gsap from 'gsap';

/**
 * GSAP Animation utilities for Wrapped
 */

/**
 * Fade in animation
 */
export function fadeIn(element, options = {}) {
  const defaults = {
    duration: 0.5,
    ease: 'power2.out',
    opacity: 1,
  };

  return gsap.fromTo(element, { opacity: 0 }, { ...defaults, ...options, opacity: 1 });
}

/**
 * Slide up animation
 */
export function slideUp(element, options = {}) {
  const defaults = {
    duration: 0.6,
    ease: 'power3.out',
    y: 0,
    opacity: 1,
  };

  return gsap.fromTo(element, { y: 100, opacity: 0 }, { ...defaults, ...options });
}

/**
 * Slide left animation
 */
export function slideLeft(element, options = {}) {
  const defaults = {
    duration: 0.6,
    ease: 'power3.out',
    x: 0,
    opacity: 1,
  };

  return gsap.fromTo(element, { x: 100, opacity: 0 }, { ...defaults, ...options });
}

/**
 * Scale in animation
 */
export function scaleIn(element, options = {}) {
  const defaults = {
    duration: 0.6,
    ease: 'back.out(1.7)',
    scale: 1,
    opacity: 1,
  };

  return gsap.fromTo(element, { scale: 0.8, opacity: 0 }, { ...defaults, ...options });
}

/**
 * Stagger animation for lists
 */
export function staggerIn(elements, options = {}) {
  const defaults = {
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.1,
    y: 0,
    opacity: 1,
  };

  return gsap.fromTo(elements, { y: 50, opacity: 0 }, { ...defaults, ...options });
}

/**
 * Number counter animation
 */
export function animateCounter(element, targetValue, options = {}) {
  const defaults = {
    duration: 2,
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
 */
export function pulse(element, options = {}) {
  const defaults = {
    duration: 1.5,
    ease: 'power1.inOut',
    scale: 1.05,
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
 */
export function exitSlide(element, options = {}) {
  const defaults = {
    duration: 0.4,
    ease: 'power2.in',
    y: -50,
    opacity: 0,
  };

  return gsap.to(element, { ...defaults, ...options });
}
