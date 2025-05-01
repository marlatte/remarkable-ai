type FootballApiGeneric = {
  parameters: {
    team?: string;
    league: string;
    season: string;
  };
  errors: string[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
};

type FootballApiStandings = FootballApiGeneric & {
  get: 'standings';
  response: StandingsResponse[];
};

type FootballApiTopScorers = FootballApiGeneric & {
  get: 'players/topscorers';
  response: PlayerStatsResponse[];
};

type League = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
};

type StandingsResponse = {
  league: StandingsLeague;
};

type StandingsLeague = League & {
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
  all: SeasonStats;
  home: SeasonStats;
  away: SeasonStats;
  update: string; // ISO 8601 timestamp
};

type SeasonStats = {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: SeasonGoals;
};

type SeasonGoals = {
  for: number;
  against: number;
};

type Team = {
  id: number;
  name: string;
  logo: string;
};

type PlayerStatsResponse = {
  player: Player;
  statistics: Statistic[];
};

type Player = {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: {
    date: string;
    place: string;
    country: string;
  };
  nationality: string;
  height: string;
  weight: string;
  injured: boolean;
  photo: string;
};

type Statistic = {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  };
  games: {
    appearences: number;
    lineups: number;
    minutes: number;
    number: number | null;
    position: string;
    rating: string;
    captain: boolean;
  };
  substitutes: {
    in: number;
    out: number;
    bench: number;
  };
  shots: {
    total: number;
    on: number;
  };
  goals: {
    total: number;
    conceded: number;
    assists: number;
    saves: number | null;
  };
  passes: {
    total: number;
    key: number;
    accuracy: number | null;
  };
  tackles: {
    total: number;
    blocks: number;
    interceptions: number;
  };
  duels: {
    total: number;
    won: number;
  };
  dribbles: {
    attempts: number;
    success: number;
    past: number | null;
  };
  fouls: {
    drawn: number;
    committed: number;
  };
  cards: {
    yellow: number;
    yellowred: number;
    red: number;
  };
  penalty: {
    won: number | null;
    commited: number | null;
    scored: number;
    missed: number;
    saved: number | null;
  };
};
