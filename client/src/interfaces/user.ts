export interface UserData {
  _id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  genderPreference: string;
  about: string;
  image: string;
}

export interface UserResponseData {
  user: UserData;
}

export interface updateProfileData {
  name: string;
  age: number;
  gender: string;
  genderPreference: string;
  about: string;
  image: string;
}
