import { Lineup, StartingPlayer, TeamColor } from '@/lib/types/football';
import { cn } from '@/lib/utils';

function PlayerCircle({
  player,
  colors,
  truncateName,
}: {
  player: StartingPlayer;
  colors: TeamColor;
  truncateName: boolean;
}) {
  // Convert hex colors to CSS format
  const primaryColor = `#${colors.primary}`;
  const numberColor = `#${colors.number}`;
  const borderColor = `#${colors.border}`;

  return (
    <div className="relative flex flex-col items-center gap-1">
      <div
        className="flex size-8 items-center justify-center rounded-full text-sm font-bold sm:size-10 sm:text-base"
        style={{
          backgroundColor: primaryColor,
          color: numberColor,
          border: `2px solid ${borderColor}`,
        }}
      >
        {player.number}
      </div>
      <div
        className={cn(
          'absolute -bottom-5 hidden truncate text-center text-xs min-[360px]:block sm:-bottom-6 sm:max-w-max sm:text-sm',
          { 'max-w-14 min-[400px]:max-w-16': truncateName },
        )}
        title={player.name}
      >
        {player.name.split(' ').pop()}
      </div>
    </div>
  );
}

export default function LineupFormation({
  lineup,
  isHomeTeam,
}: {
  lineup: Lineup;
  isHomeTeam: boolean;
}) {
  const {
    startXI: flatStartXI,
    team: { colors, name: teamName },
  } = lineup;

  // Reorganize into nested structure based on the first "grid" value
  // (eg. 1:1 => row 1, 2:4 => row 2, 2:3 => row 2, etc.)
  const nestedStartXI = flatStartXI.reduce<Record<number, StartingPlayer[]>>(
    (acc, { player }) => {
      const [rowString] = player.grid.split(':');
      const rowNum = +rowString;

      // Get row at current rowNum if exists, else create new one
      const curRow = acc[rowNum] ?? [];
      return { ...acc, [rowNum]: [...curRow, player] };
    },
    {},
  );

  const iterableStartXI = Object.entries(nestedStartXI);

  return (
    <div
      className={cn('flex flex-col gap-10 sm:gap-12', {
        'flex-col-reverse': !isHomeTeam,
      })}
    >
      {iterableStartXI.map(([rowNum, row]) => {
        return (
          <div
            key={`${teamName}-${rowNum}`}
            className="flex justify-center gap-3 min-[360px]:gap-7 min-[370px]:gap-8 min-[400px]:gap-10 sm:gap-12"
          >
            {row.map((player) => (
              <PlayerCircle
                key={player.id}
                colors={player.pos === 'G' ? colors.goalkeeper : colors.player}
                truncateName={row.length > 4}
                {...{ player }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
