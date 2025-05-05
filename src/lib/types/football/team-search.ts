import { TeamGeneric } from './generics';

export type SearchTeamResponse = {
  team: Team;
  venue: Venue;
};

type Team = TeamGeneric & {
  code: string | null;
  country: string;
  founded: number | null;
  national: boolean;
};

type Venue = {
  id: number | null;
  name: string | null;
  address: string | null;
  city: string | null;
  capacity: number | null;
  surface: string | null;
  image: string | null;
};
