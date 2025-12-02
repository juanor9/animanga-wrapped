'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Age from '../features/registration/components/Age/Age';
import AnilistAuth from '../features/registration/components/AnilistAuth/AnilistAuth';
import AnilistCustom from '../features/registration/components/AnilistCustom/AnilistCustom';
import Email from '../features/registration/components/Email/Email';
import First from '../features/registration/components/First/First';
import Location from '../features/registration/components/Location/Location';
import Password from '../features/registration/components/Password/Password';
import PrivacyPolicy from '../features/registration/components/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from '../features/registration/components/TermsAndConditions/TermsAndConditions';
import './page.scss';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const Register = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);

  const handleClick = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    setDirection(1);
    setStep(step + 1);
  };

  const handleSetStep = (newStep) => {
    setDirection(newStep > step ? 1 : -1);
    setStep(newStep);
  };

  useEffect(() => {
    if (window !== undefined && window.localStorage.step) {
      const previousStep = Number(window.localStorage.getItem('step'));
      setStep(previousStep);
      window.localStorage.clear();
    }
  }, []);

  return (
    <motion.main
      className="register"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h1>Create User</h1>
      <div className="register__container">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {step === 1 ? (
            <motion.section
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="register__section register__section--green"
            >
              <First color="yellow" clickFunction={handleClick} />
            </motion.section>
          ) : null}

          {step === 2 ? (
            <motion.section
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="register__section register__section--pink"
            >
              <TermsAndConditions color="green" clickFunction={handleClick} />
            </motion.section>
          ) : null}
          {step === 3 ? (
            <motion.section
              key="step3"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="register__section register__section--orange"
            >
              <PrivacyPolicy color="pink" clickFunction={handleClick} />
            </motion.section>
          ) : null}
          {step === 4 ? (
            <motion.section
              key="step4"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="register__section register__section--yellow"
            >
              <Age color="orange" clickFunction={handleClick} />
            </motion.section>
          ) : null}
          {step === 5 ? (
            <motion.section
              key="step5"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="register__section register__section--green"
            >
              <AnilistAuth color="pink" step={step} clickFunction={handleClick} />
            </motion.section>
          ) : null}
          {step === 6 ? (
            <motion.section
              key="step6"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="register__section register__section--yellow"
            >
              <AnilistCustom color="green" step={step} clickFunction={handleClick} />
            </motion.section>
          ) : null}
          {step === 7 ? (
            <motion.section
              key="step7"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="register__section register__section--yellow"
            >
              <Email color="orange" step={step} clickFunction={handleSetStep} />
            </motion.section>
          ) : null}
          {step === 8 ? (
            <motion.section
              key="step8"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="register__section register__section--orange"
            >
              <Location color="yellow" step={step} clickFunction={handleSetStep} />
            </motion.section>
          ) : null}
          {step === 9 ? (
            <motion.section
              key="step9"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="register__section register__section--pink"
            >
              <Password color="green" />
            </motion.section>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.main>
  );
};

export default Register;
