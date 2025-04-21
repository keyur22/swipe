export const USER_SAFE_FIELDS = [
  // No need to specify _id, as it is sent by default when used with select()
  'name',
  'email',
  'age',
  'gender',
  'genderPreference',
  'about'
];

export const allowedGenders = ['male', 'female'];
export const allowedGenderPreference = ['male', 'female', 'others'];
