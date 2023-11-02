import { getUserFilter } from '../../user/user.services.mjs';
import { signToken } from '../auth.services.mjs';

async function handleLogin(
  req,
  res,
) {
  const { email, password } = req.body;

  try {
    const user = await getUserFilter({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // verify if user is active
    if (user.isActive !== true) { return res.status(401).json({ message: 'User is not active' }); }

    // verify password
    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // JWT
    const jwtPayload = user.profile;

    const userToken = signToken(jwtPayload);

    return res.status(200).json({
      profile: user.profile,
      userToken,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default handleLogin;
