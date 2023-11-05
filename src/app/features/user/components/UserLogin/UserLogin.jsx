import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../services/users';

const UserLogin = () => {
  // Hooks de Redux y Next.js
  const dispatch = useDispatch();
  const router = useRouter();

  // Estado local para manejar el email y password del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado local para determinar si debemos redireccionar al usuario después del login
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Manejador de cambio para el email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Manejador de cambio para el password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Manejador de envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const form = {
        email,
        password,
      };
      // Dispatch de la acción de login y luego seteamos el redireccionamiento
      dispatch(login(form)).then(() => setShouldRedirect(true));
    } catch (error) {
      throw new Error(error);
    }
  };

  // Efecto para manejar el redireccionamiento cuando el usuario ha iniciado sesión
  useEffect(() => {
    if (shouldRedirect) {
      router.push('./user');
    }
  }, [shouldRedirect]);

  // Renderizado del componente
  return (
    <section className="user-registration">
      <form onSubmit={handleSubmit} className="user-registration__form">
        <label htmlFor="mail" className="user-registration__label">
          Email
          <input
            className="user-registration__input"
            id="mail"
            name="mail"
            onChange={handleEmailChange}
            type="email"
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
          />
        </label>
        <button type="submit" className="user-registration__button">
          Login
        </button>
      </form>
    </section>
  );
};

export default UserLogin;
