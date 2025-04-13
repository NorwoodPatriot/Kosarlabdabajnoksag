import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

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
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './csapatlistazas.component.html',
  styleUrls: ['./csapatlistazas.component.scss']
})
export class CsapatlistazasComponent {
  displayedColumns: string[] = ['name', 'city', 'founded', 'championships', 'league'];
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
  
  filteredTeams: Team[] = [...this.teams];
  filterOption: string = 'all';

  applyFilter() {
    if (this.filterOption === 'champions') {
      this.filteredTeams = this.teams.filter(team => team.championships > 0);
    } else {
      this.filteredTeams = [...this.teams];
    }
  }

  sortData(sort: Sort) {
    const data = this.filteredTeams.slice();
    if (!sort.active || sort.direction === '') {
      this.filteredTeams = data;
      return;
    }

    this.filteredTeams = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'city': return compare(a.city, b.city, isAsc);
        case 'founded': return compare(a.founded, b.founded, isAsc);
        case 'championships': return compare(a.championships, b.championships, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}