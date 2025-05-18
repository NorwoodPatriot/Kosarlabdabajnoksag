import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: Date;
  location: string;
}

@Component({
  selector: 'app-meccsnaptar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meccsnaptar.component.html',
  styleUrls: ['./meccsnaptar.component.scss']
})
export class MeccsnaptarComponent {
  teams: string[] = [
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

  matches: Match[] = [

    { id: 1, homeTeam: 'Alba Fehérvár', awayTeam: 'Falco KC Szombathely', date: new Date('2023-10-07'), location: 'Alba Aréna, Székesfehérvár' },
    { id: 2, homeTeam: 'Zalakerámia ZTE KK', awayTeam: 'Egis Körmend', date: new Date('2023-10-07'), location: 'Városi Sportcsarnok, Zalaegerszeg' },
    { id: 3, homeTeam: 'DEAC', awayTeam: 'OSE Lions', date: new Date('2023-10-07'), location: 'DEAC Sportcsarnok, Debrecen' },
    { id: 4, homeTeam: 'Kecskeméti TE', awayTeam: 'Atomerőmű SE', date: new Date('2023-10-07'), location: 'Messzi István Sportcsarnok, Kecskemét' },
    { id: 5, homeTeam: 'Sopron KC', awayTeam: 'PVSK-Panthers', date: new Date('2023-10-07'), location: 'Novomatic Aréna, Sopron' },
    
    { id: 6, homeTeam: 'Falco KC Szombathely', awayTeam: 'Zalakerámia ZTE KK', date: new Date('2023-10-14'), location: 'Arena Savaria, Szombathely' },
    { id: 7, homeTeam: 'Egis Körmend', awayTeam: 'DEAC', date: new Date('2023-10-14'), location: 'Körmend Városi Sportcsarnok, Körmend' },
    { id: 8, homeTeam: 'OSE Lions', awayTeam: 'Kecskeméti TE', date: new Date('2023-10-14'), location: 'Oroszlányi Sportcsarnok, Oroszlány' },
    { id: 9, homeTeam: 'Atomerőmű SE', awayTeam: 'Sopron KC', date: new Date('2023-10-14'), location: 'Paksi Sportcsarnok, Paks' },
    { id: 10, homeTeam: 'PVSK-Panthers', awayTeam: 'Alba Fehérvár', date: new Date('2023-10-14'), location: 'Lauber Dezső Sportcsarnok, Pécs' }
  ];

  getNextMatches(team: string): Match[] {
    return this.matches
      .filter(match => match.homeTeam === team || match.awayTeam === team)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 2);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('hu-HU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
}