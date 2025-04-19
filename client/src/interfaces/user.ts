export interface SignUp {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  genderPreference: string;
}

export interface CurrentUser {
  user: {
    _id: string;
    name: string;
    email: string;
    age: number;
    gender: string;
    genderPreference: string;
    about: string;
  };
}
