import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Team {
  id: number;
  name: string;
  city: string;
  founded: number;
  championships: number;
  league: string;
}

@Component({
  selector: 'app-csapatlistazas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './csapatlistazas.component.html',
  styleUrl: './csapatlistazas.component.scss'
})
export class CsapatlistazasComponent {
  teams: Team[] = [
    { id: 1, name: 'Alba Fehérvár', city: 'Székesfehérvár', founded: 1991, championships: 12, league: 'NB I/A' },
    { id: 2, name: 'Falco KC Szombathely', city: 'Szombathely', founded: 1954, championships: 1, league: 'NB I/A' },
    { id: 3, name: 'Zalakerámia ZTE KK', city: 'Zalaegerszeg', founded: 1920, championships: 3, league: 'NB I/A' },
    { id: 4, name: 'Egis Körmend', city: 'Körmend', founded: 1951, championships: 0, league: 'NB I/A' },
    { id: 5, name: 'DEAC', city: 'Debrecen', founded: 2000, championships: 0, league: 'NB I/A' },
    { id: 6, name: 'OSE Lions', city: 'Oroszlány', founded: 2006, championships: 0, league: 'NB I/A' },
    { id: 7, name: 'Kecskeméti TE', city: 'Kecskemét', founded: 1950, championships: 0, league: 'NB I/A' },
    { id: 8, name: 'Atomerőmű SE', city: 'Paks', founded: 1982, championships: 0, league: 'NB I/A' },
    { id: 9, name: 'Sopron KC', city: 'Sopron', founded: 1975, championships: 0, league: 'NB I/A' },
    { id: 10, name: 'PVSK-Panthers', city: 'Pécs', founded: 2005, championships: 0, league: 'NB I/A' }
  ];

  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  sortTeams(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.teams.sort((a, b) => {
      const aValue = a[column as keyof Team];
      const bValue = b[column as keyof Team];
      
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