// 1. Játékos interfész
export interface Player {
    id: number;
    name: string;
    team: string;
    position: string;
    height: number;
    pointsPerGame: number;
  }
  
  // 2. Csapat interfész
  export interface Team {
    id: number;
    name: string;
    city: string;
    founded: number;
  }
  
  // 3. Mérkőzés interfész
  export interface Match {
    id: number;
    homeTeam: string;
    awayTeam: string;
    date: Date;
    homeScore?: number;
    awayScore?: number;
  }
  
  // 4. Hír interfész
  export interface News {
    id: number;
    title: string;
    content: string;
    date: Date;
  }