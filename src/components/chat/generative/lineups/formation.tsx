import { Lineup, StartingPlayer, TeamColor } from '@/lib/types/football';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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

  return (
    <div className="relative flex flex-col items-center gap-1">
      <div
        className="relative flex size-10 items-center justify-center overflow-hidden rounded-full shadow-sm sm:size-12 md:size-16"
        style={{
          border: `2px solid ${primaryColor}`,
        }}
      >
        <Image
          src={
            `https://media.api-sports.io/football/players/${player.id}.png` ||
            '/placeholder.svg'
          }
          alt={player.name}
          fill
          className="object-contain"
          sizes="(max-width: 8000px) 50px"
        />
      </div>
      <div
        className={cn(
          'absolute -bottom-6 flex gap-0.5 text-center text-xs min-[400px]:gap-1 sm:max-w-max sm:text-sm',
          { 'max-w-14 min-[410px]:max-w-16': truncateName },
        )}
        title={player.name}
      >
        <span className="min-[370px]:text-muted-foreground max-[370px]:text-sm">
          {player.number}
        </span>
        <span className="hidden truncate min-[370px]:block">
          {player.name.split(' ').pop()}
        </span>
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
            className="flex justify-center gap-3 min-[360px]:gap-5 min-[370px]:gap-6 min-[410px]:gap-9 min-[430px]:gap-10 sm:gap-12"
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
