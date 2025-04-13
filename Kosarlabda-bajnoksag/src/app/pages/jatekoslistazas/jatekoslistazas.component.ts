import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  height: number;
  birthYear: number;
  nationality: string;
}

@Component({
  selector: 'app-jatekoslistazas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './jatekoslistazas.component.html',
  styleUrls: ['./jatekoslistazas.component.scss']
})
export class JatekoslistazasComponent {
  displayedColumns: string[] = ['name', 'team', 'position', 'height', 'birthYear', 'nationality'];
  players: Player[] = [
    { id: 1, name: 'Hanga Ádám', team: 'Alba Fehérvár', position: 'Bedobó', height: 200, birthYear: 1989, nationality: 'Magyar' },
    { id: 2, name: 'Keller Ákos', team: 'Falco KC Szombathely', position: 'Irányító', height: 190, birthYear: 1995, nationality: 'Magyar' },
    { id: 3, name: 'Vojvoda Dávid', team: 'Zalakerámia ZTE KK', position: 'Bedobó', height: 197, birthYear: 1996, nationality: 'Magyar' },
    { id: 4, name: 'Pölös Péter', team: 'Egis Körmend', position: 'Center', height: 208, birthYear: 1998, nationality: 'Magyar' },
    { id: 5, name: 'Dénes Benedek', team: 'DEAC', position: 'Irányító', height: 188, birthYear: 2000, nationality: 'Magyar' },
    { id: 6, name: 'Kovács Zoltán', team: 'OSE Lions', position: 'Bedobó', height: 195, birthYear: 1993, nationality: 'Magyar' },
    { id: 7, name: 'Perl Zsolt', team: 'Kecskeméti TE', position: 'Center', height: 205, birthYear: 1995, nationality: 'Magyar' },
    { id: 8, name: 'Pongó Krisztofer', team: 'Atomerőmű SE', position: 'Irányító', height: 192, birthYear: 1997, nationality: 'Magyar' },
    { id: 9, name: 'Tóth Szilárd', team: 'Sopron KC', position: 'Bedobó', height: 198, birthYear: 1994, nationality: 'Magyar' },
    { id: 10, name: 'Kovács Norbert', team: 'PVSK-Panthers', position: 'Center', height: 206, birthYear: 1991, nationality: 'Magyar' },
    { id: 11, name: 'Simon Péter', team: 'Alba Fehérvár', position: 'Irányító', height: 193, birthYear: 1992, nationality: 'Magyar' },
    { id: 12, name: 'Nagy Ádám', team: 'Falco KC Szombathely', position: 'Center', height: 210, birthYear: 1990, nationality: 'Magyar' },
    { id: 13, name: 'Horváth Gergő', team: 'Zalakerámia ZTE KK', position: 'Bedobó', height: 199, birthYear: 1997, nationality: 'Magyar' },
    { id: 14, name: 'Farkas Dániel', team: 'Egis Körmend', position: 'Irányító', height: 185, birthYear: 1999, nationality: 'Magyar' },
    { id: 15, name: 'Balogh Márton', team: 'DEAC', position: 'Bedobó', height: 196, birthYear: 1996, nationality: 'Magyar' },
    { id: 16, name: 'Szabó Krisztián', team: 'OSE Lions', position: 'Center', height: 207, birthYear: 1994, nationality: 'Magyar' },
    { id: 17, name: 'Török Gábor', team: 'Kecskeméti TE', position: 'Irányító', height: 191, birthYear: 1998, nationality: 'Magyar' },
    { id: 18, name: 'Molnár Tamás', team: 'Atomerőmű SE', position: 'Bedobó', height: 194, birthYear: 1993, nationality: 'Magyar' },
    { id: 19, name: 'Fehér László', team: 'Sopron KC', position: 'Center', height: 209, birthYear: 1990, nationality: 'Magyar' },
    { id: 20, name: 'Varga István', team: 'PVSK-Panthers', position: 'Irányító', height: 187, birthYear: 1995, nationality: 'Magyar' }
  ];

  teams: string[] = [
    'Összes csapat',
    'Alba Fehérvár',
    'Falco KC Szombathely',
    'Zalakerámia ZTE KK',
    'Egis Körmend',
    'DEAC',
    'OSE Lions',
    'Kecskeméti TE',
    'Atomerőmű SE',
    'Sopron KC',
    'PVSK-Panthers'
  ];

  selectedTeam: string = 'Összes csapat';
  sort: Sort = { active: 'name', direction: 'asc' };

  get filteredPlayers(): Player[] {
    let players = this.players;
    
    if (this.selectedTeam !== 'Összes csapat') {
      players = players.filter(player => player.team === this.selectedTeam);
    }

    return this.sortData(players.slice());
  }

  sortData(data: Player[]): Player[] {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'team': return compare(a.team, b.team, isAsc);
        case 'position': return compare(a.position, b.position, isAsc);
        case 'height': return compare(a.height, b.height, isAsc);
        case 'birthYear': return compare(a.birthYear, b.birthYear, isAsc);
        case 'nationality': return compare(a.nationality, b.nationality, isAsc);
        default: return 0;
      }
    });
  }

  onSortChange(sortState: Sort) {
    this.sort = sortState;
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}