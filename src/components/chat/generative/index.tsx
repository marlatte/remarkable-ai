import {
  FootballApiLineups,
  FootballApiStandings,
  FootballApiTopScorers,
} from '@/lib/types/football';
import { UIMessage } from 'ai';
import LeagueTable from './league-table';
import TopScorers from './top-scorers';
import { Fragment } from 'react';
import CollapsibleToolCall from './tool-call';
import LineupDisplay from './lineups';

export default function GenerativeComponents({
  message,
  chatStatus,
}: {
  message: UIMessage;
  chatStatus: 'submitted' | 'streaming' | 'ready' | 'error';
}) {
  const PREM_LOGO_SRC = 'https://media.api-sports.io/football/leagues/39.png';

  return message.parts?.map((part) => {
    if (part.type === 'tool-invocation' && chatStatus === 'ready') {
      const generativeComponents = [];
      const { state, toolName, args, toolCallId } = part.toolInvocation;

      if (state === 'result') {
        switch (toolName) {
          case 'getStandings':
            {
              const { response } = part.toolInvocation
                .result as FootballApiStandings;

              const [{ league }] = response;
              const {
                standings: [standings],
                season,
              } = league;

              generativeComponents.push({
                name: 'getStandings',
                value: <LeagueTable {...{ standings, season }} />,
              });
            }
            break;

          case 'getTopScorers':
            {
              const { response: topScorers, parameters } = part.toolInvocation
                .result as FootballApiTopScorers;
              const season = Number(parameters.season);

              generativeComponents.push({
                name: 'getTopScorers',
                value: (
                  <TopScorers
                    {...{ season, topScorers, premLogoSrc: PREM_LOGO_SRC }}
                  />
                ),
              });
            }
            break;

          case 'getFixtureLineups':
            {
              const { response: lineups } = part.toolInvocation
                .result as FootballApiLineups;
              generativeComponents.push({
                name: 'getFixtureLineups',
                value: <LineupDisplay {...{ lineups }} />,
              });
            }
            break;
        }
      }
      return (
        <Fragment key={`${toolCallId}-${toolName}-${JSON.stringify(args)}`}>
          <CollapsibleToolCall {...{ part }} />
          {generativeComponents.map(({ name, value }) => (
            <Fragment key={name}>{value}</Fragment>
          ))}
        </Fragment>
      );
    }
  });
}
