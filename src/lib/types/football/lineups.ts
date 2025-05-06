export type Lineup = {
  team: {
    id: number;
    name: string;
    logo: string;
    colors: {
      player: TeamColor;
      goalkeeper: TeamColor;
    };
  };
  coach: {
    id: number;
    name: string;
    photo: string;
  };
  formation: string;
  startXI: { player: StartingPlayer }[];
  substitutes: { player: Substitute }[];
};

export type TeamColor = {
  primary: string;
  number: string;
  border: string;
};

type Player = {
  id: number;
  name: string;
  number: number;
  pos: 'G' | 'D' | 'M' | 'F';
};
export type StartingPlayer = Player & { grid: string };
export type Substitute = Player & { grid: null };
