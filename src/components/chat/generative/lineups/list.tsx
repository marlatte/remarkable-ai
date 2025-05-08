import {
  Lineup,
  StartingPlayer,
  Substitute,
  TeamColor,
} from '@/lib/types/football';

function PlayerListItem({
  player,
  colors,
}: {
  player: StartingPlayer | Substitute;
  colors: TeamColor;
}) {
  // Convert hex colors to CSS format
  const primaryColor = `#${colors.primary}`;
  const numberColor = `#${colors.number}`;
  const borderColor = `#${colors.border}`;

  return (
    <div className="bg-muted/20 flex items-center gap-3">
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm"
        style={{
          backgroundColor: primaryColor,
          color: numberColor,
          border: `2px solid ${borderColor}`,
        }}
      >
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
