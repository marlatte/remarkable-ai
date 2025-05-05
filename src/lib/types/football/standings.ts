import { LeagueGeneric, TeamGeneric } from './generics';

export type StandingsResponse = {
  league: LeagueGeneric & {
    standings: Standing[][];
  };
};

export type Standing = {
  rank: number;
  team: TeamGeneric;
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
