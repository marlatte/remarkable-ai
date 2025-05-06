import {
  FootballApiFixtures,
  FootballApiHead2Head,
  FootballApiLineups,
  FootballApiSearchTeams,
  FootballApiStandings,
  FootballApiTopScorers,
} from '@/lib/types/football';
import { tool } from 'ai';
import { z } from 'zod';

const API_KEY = process.env.FOOTBALL_API_KEY || '';
const API_HOST = 'v3.football.api-sports.io';
const PREM_LEAGUE_ID = 39;

async function fetchFootballAPI(
  endpoint: string,
  params: Record<string, string | number | undefined>,
) {
  const url = new URL(`https://${API_HOST}${endpoint}`);

  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching from football API:', error);
    throw error;
  }
}

const getStandings = tool({
  description: 'Get the standings for a specific league and season',
  parameters: z.object({
    season: z
      .number()
      .default(2023)
      .describe('Season year (e.g., 2023, 2022, 2021)'),
  }),
  execute: async ({ season }) => {
    const data = (await fetchFootballAPI('/standings', {
      league: PREM_LEAGUE_ID,
      season,
    })) as FootballApiStandings;
    return data;
  },
});

const searchTeam = tool({
  description: 'Search for a team by name to get its Team ID and details',
  parameters: z.object({
    name: z.string().describe('Team name to search for'),
  }),
  execute: async ({ name }) => {
    const data = (await fetchFootballAPI('/teams', {
      search: name,
    })) as FootballApiSearchTeams;
    return data;
  },
});

const getTopScorers = tool({
  description: 'Get top scorers for a specific league and season',
  parameters: z.object({
    season: z
      .number()
      .default(2023)
      .describe('Season year (e.g., 2023, 2022, 2021)'),
  }),
  execute: async ({ season }) => {
    const data = (await fetchFootballAPI('/players/topscorers', {
      league: PREM_LEAGUE_ID,
      season,
    })) as FootballApiTopScorers;
    return data;
  },
});

const getHead2Head = tool({
  description: 'Get details for matches between 2 teams.',
  parameters: z.object({
    teams: z.array(z.number()).describe('Team IDs'),
    season: z
      .number()
      .default(2023)
      .describe('Season year (e.g., 2023, 2022, 2021)'),
  }),
  execute: async ({ teams, season }) => {
    const data = (await fetchFootballAPI('/fixtures/headtohead', {
      h2h: teams.join('-'),
      league: PREM_LEAGUE_ID,
      season,
    })) as FootballApiHead2Head;
    return data;
  },
});

const getSingleFixtureDetails = tool({
  description: 'Get details of a specific match.',
  parameters: z.object({
    id: z.number().describe('Fixture ID to get info for a specific match.'),
  }),
  execute: async ({ id }) => {
    const data = (await fetchFootballAPI('/fixtures', {
      id,
    })) as FootballApiFixtures;
    return data;
  },
});

const getSeasonFixtures = tool({
  description: 'Get all fixtures from a single season.',
  parameters: z.object({
    season: z
      .number()
      .default(2023)
      .describe('Season year (e.g., 2023, 2022, 2021)'),
  }),
  execute: async ({ season }) => {
    const data = (await fetchFootballAPI('/fixtures', {
      league: PREM_LEAGUE_ID,
      season,
    })) as FootballApiFixtures;
    return data;
  },
});

const getTeamFixtures = tool({
  description: 'Get all fixtures for a single team from a single season.',
  parameters: z.object({
    team: z.number().describe('Team ID'),
    season: z
      .number()
      .default(2023)
      .describe('Season year (e.g., 2023, 2022, 2021)'),
  }),
  execute: async ({ team, season }) => {
    const data = (await fetchFootballAPI('/fixtures', {
      team,
      league: PREM_LEAGUE_ID,
      season,
    })) as FootballApiFixtures;
    return data;
  },
});

const getFixtureLineups = tool({
  description: 'Get lineups for a specific fixture',
  parameters: z.object({
    fixture: z.number().describe('Fixture ID'),
  }),
  execute: async ({ fixture }) => {
    const data = (await fetchFootballAPI('/fixtures/lineups', {
      fixture,
    })) as FootballApiLineups;
    return data;
  },
});

// TODO ----------------------- TODO
// TODO  Add type definitions   TODO
// TODO For the following tools TODO
// TODO ----------------------- TODO

const getTeamStatistics = tool({
  description: 'Get statistics for a specific team in a league and season',
  parameters: z.object({
    team: z.number().describe('Team ID'),
    season: z
      .number()
      .default(2023)
      .describe('Season year (e.g., 2023, 2022, 2021)'),
  }),
  execute: async ({ team, season }) => {
    const data = await fetchFootballAPI('/teams/statistics', {
      team,
      league: PREM_LEAGUE_ID,
      season,
    });
    return data;
  },
});

const searchPlayer = tool({
  description: 'Search for a player by name to get their ID and details.',
  parameters: z.object({
    name: z.string().describe('Player name to search for'),
    season: z
      .number()
      .optional()
      .describe('Season year (e.g., 2023, 2022, 2021)'),
  }),
  execute: async ({ name, season }) => {
    const data = await fetchFootballAPI('/players', {
      search: name,
      league: PREM_LEAGUE_ID,
      season,
    });
    return data;
  },
});

const getSquadByTeam = tool({
  description: 'Get players for a specific team',
  parameters: z.object({
    team: z.number().describe('Team ID'),
  }),
  execute: async ({ team }) => {
    const data = await fetchFootballAPI('/players/squads', { team });
    return data;
  },
});

const getPlayerHistory = tool({
  description:
    'Get the list of teams and seasons in which the player played during his career.',
  parameters: z.object({
    player: z.number().describe('Player ID'),
  }),
  execute: async ({ player }) => {
    const data = await fetchFootballAPI('/players/teams', { player });
    return data;
  },
});

export {
  getStandings,
  searchTeam,
  getTopScorers,
  getHead2Head,
  getSingleFixtureDetails,
  getSeasonFixtures,
  getTeamFixtures,
  getFixtureLineups,
  getTeamStatistics,
  searchPlayer,
  getSquadByTeam,
  getPlayerHistory,
};
