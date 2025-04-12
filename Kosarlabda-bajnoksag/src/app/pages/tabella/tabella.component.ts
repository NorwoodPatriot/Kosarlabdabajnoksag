import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamStanding {
  position: number;
  team: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

@Component({
  selector: 'app-tabella',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabella.component.html',
  styleUrls: ['./tabella.component.scss']
})
export class TabellaComponent {
  standings: TeamStanding[] = [
    { position: 1, team: 'Alba Fehérvár', matchesPlayed: 10, wins: 9, draws: 0, losses: 1, points: 27, goalsFor: 890, goalsAgainst: 760, goalDifference: +130 },
    { position: 2, team: 'Falco KC Szombathely', matchesPlayed: 10, wins: 8, draws: 0, losses: 2, points: 24, goalsFor: 850, goalsAgainst: 780, goalDifference: +70 },
    { position: 3, team: 'Zalakerámia ZTE KK', matchesPlayed: 10, wins: 7, draws: 0, losses: 3, points: 21, goalsFor: 820, goalsAgainst: 790, goalDifference: +30 },
    { position: 4, team: 'Egis Körmend', matchesPlayed: 10, wins: 6, draws: 0, losses: 4, points: 18, goalsFor: 800, goalsAgainst: 800, goalDifference: 0 },
    { position: 5, team: 'DEAC', matchesPlayed: 10, wins: 5, draws: 0, losses: 5, points: 15, goalsFor: 780, goalsAgainst: 810, goalDifference: -30 },
    { position: 6, team: 'OSE Lions', matchesPlayed: 10, wins: 4, draws: 0, losses: 6, points: 12, goalsFor: 770, goalsAgainst: 820, goalDifference: -50 },
    { position: 7, team: 'Kecskeméti TE', matchesPlayed: 10, wins: 3, draws: 0, losses: 7, points: 9, goalsFor: 750, goalsAgainst: 830, goalDifference: -80 },
    { position: 8, team: 'Atomerőmű SE', matchesPlayed: 10, wins: 2, draws: 0, losses: 8, points: 6, goalsFor: 730, goalsAgainst: 850, goalDifference: -120 },
    { position: 9, team: 'Sopron KC', matchesPlayed: 10, wins: 1, draws: 0, losses: 9, points: 3, goalsFor: 710, goalsAgainst: 870, goalDifference: -160 },
    { position: 10, team: 'PVSK-Panthers', matchesPlayed: 10, wins: 0, draws: 0, losses: 10, points: 0, goalsFor: 700, goalsAgainst: 900, goalDifference: -200 }
  ];

  sortColumn: string = 'position';
  sortDirection: 'asc' | 'desc' = 'asc';

  sortStandings(column: keyof TeamStanding): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.standings.sort((a, b) => {
      // Szöveges mezők rendezése
      if (column === 'team') {
        const result = a.team.localeCompare(b.team);
        return this.sortDirection === 'asc' ? result : -result;
      }
      
      // Számos mezők rendezése
      const aValue = a[column] as number;
      const bValue = b[column] as number;
      
      if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '⇅';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
}