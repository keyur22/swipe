export const getUserSafeFields = (user) => {
  const { _id, name, age, gender, genderPreference, about, image, email } =
    user || {};

  return {
    _id,
    name,
    email,
    age,
    gender,
    genderPreference,
    about,
    image
  };
};
