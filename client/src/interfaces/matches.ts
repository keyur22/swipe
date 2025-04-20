export interface Match {
  _id: string;
  name: string;
  image: string;
}

export interface MatchesResponse {
  matches: Match[];
}
