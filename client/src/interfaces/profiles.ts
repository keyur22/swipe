export interface Profile {
  _id: string;
  name: string;
  image: string;
  age: number;
  about: string;
}

export interface ProfilesResponse {
  users: Profile[];
}
