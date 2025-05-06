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
  startXI: Array<PlayerWrapper & { grid: string }>;
  substitutes: Array<PlayerWrapper>;
};

export type TeamColor = {
  primary: string;
  number: string;
  border: string;
};

export type PlayerWrapper = {
  player: {
    id: number;
    name: string;
    number: number;
    pos: 'G' | 'D' | 'M' | 'F';
  };
};
