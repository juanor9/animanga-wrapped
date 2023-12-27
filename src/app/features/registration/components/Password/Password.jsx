import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { newUser } from '../../../../../redux/features/user';
import createUser from '../../services/registration';
import { login } from '../../../user/services/users';

const Password = ({ color }) => {
  // State y Redux hooks
  const [password, setPassword] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  // Gestiona el cambio de valor en el input de contraseña
  const handleChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  // Actualiza Redux con la nueva contraseña
  const updateRedux = () => {
    if (password) {
      dispatch(newUser({ ...user, password }));
    }
  };

  // Crea el nuevo usuario al enviar el formulario
  const createUserAtSubmit = async (newUserToCreate) => {
    const createUserDispatch = await dispatch(createUser(newUserToCreate));
    return createUserDispatch;
  };

  // Inicia sesión del usuario después del registro
  const loginUserAfterRegistration = async (form, fulfillment) => {
    if (!fulfillment.payload.errors) {
      dispatch(login(form)).then(() => setShouldRedirect(true));
    } else {
      throw new Error(fulfillment.payload.errors.message);
    }
  };

  // Gestiona el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    updateRedux();

    if (password) {
      const updatedUser = { ...user, password };
      const newUserFulfilled = await createUserAtSubmit(updatedUser);
      const { email } = updatedUser;
      const form = { email, password };
      loginUserAfterRegistration(form, newUserFulfilled);
    }
  };

  // Redirecciona si el inicio de sesión es exitoso
  useEffect(() => {
    if (shouldRedirect) {
      router.push('./user');
    }
  }, [shouldRedirect]);

  return (
    <div>
      <p>
        Alright, last piece of the puzzle!
        Let&apos;s set a sturdy password to safeguard your epic
        yearly stats. After this, we&apos;ll break down your
        anime and manga journey for the year!
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          className={`register__button register__button--${color}`}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Password;
