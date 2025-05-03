import { tool } from 'ai';
import { z } from 'zod';

const API_KEY = process.env.FOOTBALL_API_KEY || '';
const API_HOST = 'v3.football.api-sports.io';

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
    league: z
      .number()
      .default(39)
      .describe('League ID (39 for Premier League)'),
    season: z
      .number()
      .default(2023)
      .describe('Season year (e.g., 2023, 2022, 2021)'),
  }),
  execute: async ({ league, season }) => {
    const data = await fetchFootballAPI('/standings', { league, season });
    return data;
  },
});

const searchTeam = tool({
  description: 'Search for a team by name to get its Team ID and details',
  parameters: z.object({
    name: z.string().describe('Team name to search for'),
  }),
  execute: async ({ name }) => {
    const data = await fetchFootballAPI('/teams', { search: name });
    return data;
  },
});

const getTopScorers = tool({
  description: 'Get top scorers for a specific league and season',
  parameters: z.object({
    league: z
      .number()
      .default(39)
      .describe('League ID (39 for Premier League)'),
    season: z
      .number()
      .default(2023)
      .describe('Season year (e.g., 2023, 2022, 2021)'),
  }),
  execute: async ({ league, season }) => {
    const data = await fetchFootballAPI('/players/topscorers', {
      league,
      season,
    });
    return data;
  },
});

const getFixtures = tool({
  description: 'Get Fixture IDs to be used with getFixtureInfo',
  parameters: z.object({
    team: z.number().optional().describe('Team ID'),
    league: z
      .number()
      .default(39)
      .describe('League ID (39 for Premier League)'),
    season: z
      .number()
      .default(2023)
      .describe('Season year (e.g., 2023, 2022, 2021)'),
  }),
  execute: async ({ team, league, season }) => {
    const data = await fetchFootballAPI('/fixtures', { team, league, season });
    return data;
  },
});

export { getStandings, searchTeam, getTopScorers, getFixtures };
