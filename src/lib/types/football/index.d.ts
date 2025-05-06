import { FixtureIdResponse } from './fixtures';
import { Lineup } from './lineups';
import { StandingsResponse } from './standings';
import { SearchTeamResponse } from './team-search';
export { PlayerStatsResponse } from './top-scorers';
export { Standing } from './standings';

type FootballApiResponse = {
  parameters: {
    league?: string;
    season: ?string;
  };
  errors: string[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
};

type FootballApiStandings = FootballApiResponse & {
  get: 'standings';
  response: StandingsResponse[];
};

type FootballApiTopScorers = FootballApiResponse & {
  get: 'players/topscorers';
  parameters: { team: string };
  response: PlayerStatsResponse[];
};

type FootballApiSearchTeams = FootballApiResponse & {
  get: 'teams';
  parameters: { search: string };
  response: SearchTeamResponse[];
};

type FootballApiFixtures = {
  get: 'fixtures';
  parameters: { team: string };
  response: FixtureIdResponse[];
};

type FootballApiHead2Head = {
  get: 'fixtures/headtohead';
  parameters: { h2h: string };
  response: FixtureIdResponse[];
};

type FootballApiLineups = {
  get: 'fixtures/lineups';
  parameters: { fixture: string };
  response: Lineup[];
};

export {
  FootballApiSearchTeams,
  FootballApiStandings,
  FootballApiTopScorers,
  FootballApiFixtures,
  FootballApiHead2Head,
  FootballApiLineups,
};
