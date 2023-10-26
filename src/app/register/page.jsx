/* eslint-disable no-unused-vars */

'use client';

import './page.scss';
import { useState, useEffect } from 'react';
import First from '../features/registration/components/First/First';
import Email from '../features/registration/components/Email/Email';
import TermsAndConditions from '../features/registration/components/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from '../features/registration/components/PrivacyPolicy/PrivacyPolicy';
import Age from '../features/registration/components/Age/Age';
import AnilistAuth from '../features/registration/components/AnilistAuth/AnilistAuth';
import AnilistCustom from '../features/registration/components/AnilistCustom/AnilistCustom';
import Location from '../features/registration/components/Location/Location';
import Password from '../features/registration/components/Password/Password';

const Register = () => {
  const [step, setStep] = useState(1);
  // console.log('🚀 ~ file: page.jsx:17 ~ Register ~ step:', typeof (step));
  // console.log('🚀 ~ file: page.jsx:17 ~ Register ~ step:', step);

  const handleClick = (event) => {
    event.preventDefault();
    setStep(step + 1);
  };

  useEffect(() => {
    if (window !== undefined && window.localStorage.step) {
      const previousStep = Number(window.localStorage.getItem('step'));
      setStep(previousStep);
      window.localStorage.clear();
    }
  }, []);

  return (
    <main className="register">
      <h1>Create User</h1>
      <div className="register__container">
        {step === 1
          ? (
            <section className="register__section register__section--green">
              <First
                color="yellow"
                clickFunction={handleClick}
              />
            </section>
          )
          : null}

        {step === 2
          ? (
            <section className="register__section register__section--pink">
              <TermsAndConditions
                color="green"
                clickFunction={handleClick}
              />
            </section>
          )
          : null}
        {step === 3
          ? (
            <section className="register__section register__section--orange">
              <PrivacyPolicy
                color="pink"
                clickFunction={handleClick}
              />
            </section>
          )
          : null}
        {step === 4
          ? (
            <section className="register__section register__section--yellow">
              <Age
                color="orange"
                clickFunction={handleClick}
              />
            </section>
          )
          : null}
        {step === 5
          ? (
            <section className="register__section register__section--green">
              <AnilistAuth color="pink" step={step} clickFunction={handleClick} />
            </section>
          )
          : null}
        {step === 6
          ? (
            <section className="register__section register__section--yellow">
              <AnilistCustom color="green" step={step} clickFunction={handleClick} />
            </section>
          )
          : null}
        {step === 7
          ? (
            <section className="register__section register__section--yellow">
              <Email
                color="orange"
                step={step}
                clickFunction={setStep}
              />
            </section>
          )
          : null}
        {step === 8
          ? (
            <section className="register__section register__section--orange">
              <Location
                color="yellow"
                step={step}
                clickFunction={setStep}
              />
            </section>
          )
          : null}
        {step === 9
          ? (
            <section className="register__section register__section--pink">
              <Password
                color="green"
              />
            </section>
          )
          : null}
      </div>
    </main>
  );
};

export default Register;
