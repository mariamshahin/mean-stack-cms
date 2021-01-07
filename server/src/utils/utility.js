export const checkId = (id) => id.match(/^[0-9a-fA-F]{24}$/);

export const deletePw = (user) => {
  const updatedUser = { ...user._doc };
  delete updatedUser.password;
  return updatedUser;
};
