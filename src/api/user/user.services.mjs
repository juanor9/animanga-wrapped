/* eslint-disable no-unused-vars */
import User from './user.model.mjs';

// Create user
export default function createUser(
  user,
) {
  return User.create(user);
}

// Get user by filter
export function getUserFilter(filter) {
  const user = User.findOne(filter);
  return user;
}

// // get user by id
// export function getUserById(id: string) {
//   return User.findById(id).populate("publisher");
// }

// // Update user
// export function updateUser
// (id: string, user: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt'>>) {
//   return User.findByIdAndUpdate(id, user, {new: true});
// }
