import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../services/users';

const UserLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, isLocked, lockoutEndTime, loginAttempts, userToken } = useSelector(
    (state) => state.userData
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    if (userToken) {
      router.push('./user');
    }
  }, [userToken, router]);

  useEffect(() => {
    let interval;
    if (isLocked && lockoutEndTime) {
      const updateRemainingTime = () => {
        const now = new Date().getTime();
        const difference = lockoutEndTime - now;
        if (difference > 0) {
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
          setRemainingTime(`${minutes}m ${seconds}s`);
        } else {
          setRemainingTime(null);
          // Optionally dispatch an action to reset lock state
          clearInterval(interval);
        }
      };

      interval = setInterval(updateRemainingTime, 1000);
      updateRemainingTime(); // Initial call
    }

    return () => clearInterval(interval);
  }, [isLocked, lockoutEndTime]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <section className="user-registration">
      {isLocked ? (
        <div className="user-registration__locked-account">
          <h2>Account Locked</h2>
          <p>Your account has been temporarily locked due to too many failed login attempts.</p>
          {remainingTime && <p>Please try again in: {remainingTime}</p>}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="user-registration__form">
          <label htmlFor="mail" className="user-registration__label">
            Email
            <input
              className="user-registration__input"
              id="mail"
              name="mail"
              onChange={handleEmailChange}
              type="email"
              disabled={isLocked}
            />
          </label>
          <label htmlFor="password" className="user-registration__label">
            Password
            <input
              className="user-registration__input"
              id="password"
              name="password"
              onChange={handlePasswordChange}
              type="password"
              disabled={isLocked}
            />
          </label>
          {error && <p className="user-registration__error">{error}</p>}
          {loginAttempts === 4 && (
            <p className="user-registration__warning">
              You have 1 attempt left before your account is temporarily locked.
            </p>
          )}
          <button type="submit" className="user-registration__button" disabled={isLocked}>
            Login
          </button>
        </form>
      )}
    </section>
  );
};

export default UserLogin;
