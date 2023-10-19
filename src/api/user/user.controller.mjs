/* eslint-disable no-unused-vars */
// import crypto from 'crypto';
// import bcrypt from 'bcryptjs';
import createUser from './user.services.mjs';
// import { verifyToken, signToken } from '../../auth/auth.services';

export default async function handleCreateUser(req, res) {
  const data = req.body;
  const newUser = data;
  try {
    newUser.isActive = true;
    newUser.role = 'USER';

    // Create user
    const user = await createUser(data);

    // Send verification email
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// export async function handleGetUser(req: Request, res: Response) {
//   try {
//     const userToken = req.headers?.authorization?.split(" ")[1] as string;
//     if (!userToken) {
//       return res.status(401).json({
//         message: "You are not authorized to access to this information",
//       });
//     }
//     const decoded = verifyToken(userToken);
//     return res.status(200).json(decoded);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// }

// export async function handleUpdateUser(req: Request, res: Response) {
//   const { id } = req.params;
//   const data = req.body;
//   try {
//     // verify if new data is password
//     if (data.password) {
//       // encrypt password
//       const salt = await bcrypt.genSalt(10);
//       const hash = await bcrypt.hash(data.password, salt);
//       data.password = hash;
//     }
//     const user = await updateUser(id, data);

//     if (!user) {
//       return res.status(404).json({ message: "User not found to update" });
//     }

//     //create a new token with new profile
//     const newToken = signToken(user.profile);
//     //create object with new data to pass to update
//     const newData = {
//       newUser: user,
//       newToken: newToken,
//     };

//     return res.status(200).json(newData);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// }
