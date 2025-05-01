type FootballApiResult = {
  get: string;
  parameters: {
    league: string;
    season: string;
  };
  errors: string[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: Array<StandingsResponse>;
};

type StandingsResponse = {
  league: League;
};

type League = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: Standing[][];
};

type Standing = {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  all: MatchStats;
  home: MatchStats;
  away: MatchStats;
  update: string; // ISO 8601 timestamp
};

type Team = {
  id: number;
  name: string;
  logo: string;
};

type MatchStats = {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: Goals;
};

type Goals = {
  for: number;
  against: number;
};
