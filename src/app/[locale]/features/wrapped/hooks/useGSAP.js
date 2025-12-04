import gsap from 'gsap';
import { useEffect, useRef } from 'react';

/**
 * Hook for GSAP animations with cleanup
 * @param {Function} animationFn - Function that returns GSAP timeline or tween
 * @param {Array} dependencies - Dependencies array for useEffect
 */
export function useGSAPAnimation(animationFn, dependencies = []) {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current = animationFn();

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, dependencies);

  return animationRef;
}

/**
 * Hook for creating GSAP context
 */
export function useGSAPContext(containerRef, dependencies = []) {
  const ctx = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    ctx.current = gsap.context(() => {}, containerRef.current);

    return () => {
      if (ctx.current) {
        ctx.current.revert();
      }
    };
  }, dependencies);

  return ctx;
}

/**
 * Hook for slide enter/exit animations
 */
export function useSlideAnimation(slideRef, isActive, animationType = 'fade') {
  useEffect(() => {
    if (!slideRef.current) return;

    if (isActive) {
      // Enter animation
      switch (animationType) {
        case 'fade':
          gsap.fromTo(
            slideRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            }
          );
          break;
        case 'slide-up':
          gsap.fromTo(
            slideRef.current,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
            }
          );
          break;
        case 'slide-left':
          gsap.fromTo(
            slideRef.current,
            { x: 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
            }
          );
          break;
        case 'scale':
          gsap.fromTo(
            slideRef.current,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
            }
          );
          break;
        default:
          gsap.to(slideRef.current, { opacity: 1, duration: 0.3 });
      }
    } else {
      // Exit animation
      gsap.to(slideRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isActive, animationType]);
}

/**
 * Hook for counter animation
 */
export function useCounterAnimation(elementRef, targetValue, duration = 2, decimals = 0) {
  useEffect(() => {
    if (!elementRef.current || targetValue === undefined) return;

    const obj = { value: 0 };

    gsap.to(obj, {
      value: targetValue,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (elementRef.current) {
          elementRef.current.textContent = obj.value.toFixed(decimals);
        }
      },
    });
  }, [targetValue, duration, decimals]);
}
