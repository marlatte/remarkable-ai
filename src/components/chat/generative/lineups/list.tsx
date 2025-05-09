import {
  Lineup,
  StartingPlayer,
  Substitute,
  TeamColor,
} from '@/lib/types/football';
import Image from 'next/image';

function PlayerListItem({
  player,
  colors,
}: {
  player: StartingPlayer | Substitute;
  colors: TeamColor;
}) {
  // Convert hex colors to CSS format
  const primaryColor = `#${colors.primary}`;

  return (
    <div className="bg-muted/20 flex items-center gap-3">
      <div
        className="relative flex size-10 items-center justify-center overflow-hidden rounded-full shadow-sm"
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
      <div className="text-muted-foreground w-5 shrink-0 text-end">
        {player.number}
      </div>
      <div className="w-max">{player.name}</div>
    </div>
  );
}

export default function LineupList({ lineup }: { lineup: Lineup }) {
  const {
    startXI,
    substitutes,
    team: { colors },
  } = lineup;

  return (
    <div className="grid w-max gap-3">
      <h3 className="text-muted-foreground text-lg font-medium">Starting XI</h3>
      <div className="grid w-max gap-3">
        {startXI.map(({ player }) => (
          <PlayerListItem
            key={player.id}
            player={player}
            colors={player.pos === 'G' ? colors.goalkeeper : colors.player}
          />
        ))}
      </div>
      <h3 className="text-muted-foreground mt-3 text-lg font-medium">
        Substitutes
      </h3>
      <div className="grid w-max gap-3">
        {substitutes.map(({ player }) => (
          <PlayerListItem
            key={player.id}
            player={player}
            colors={player.pos === 'G' ? colors.goalkeeper : colors.player}
          />
        ))}
      </div>
    </div>
  );
}
