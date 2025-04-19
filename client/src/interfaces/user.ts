export interface CurrentUser {
  user: {
    _id: string;
    name: string;
    email: string;
    age: number;
    gender: string;
    genderPreference: string;
    about: string;
    image: string;
  };
}
