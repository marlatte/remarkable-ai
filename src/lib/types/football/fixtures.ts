import { LeagueGeneric, TeamGeneric } from './generics';

export type FixtureIdResponse = {
  fixture: Fixture;
  league: League;
  teams: {
    home: Team;
    away: Team;
  };
  goals: {
    home: number;
    away: number;
  };
  score: Score;
};

type Fixture = {
  id: number;
  referee: string;
  timezone: string;
  date: string; // ISO 8601 format
  timestamp: number;
  periods: {
    first: number;
    second: number;
  };
  venue: {
    id: number;
    name: string;
    city: string;
  };
  status: {
    long: string;
    short: string;
    elapsed: number;
    extra: number | null;
  };
};

type League = LeagueGeneric & {
  round: string;
  standings: boolean;
};

type Team = TeamGeneric & {
  winner: boolean | null;
};

type Score = {
  halftime: GoalBreakdown;
  fulltime: GoalBreakdown;
  extratime: GoalBreakdown;
  penalty: GoalBreakdown;
};

type GoalBreakdown = {
  home: number | null;
  away: number | null;
};
