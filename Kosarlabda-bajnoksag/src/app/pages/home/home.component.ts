import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  featuredNews = [
    {
      title: 'Alba Fehérvár nyerte a bajnokság nyitófordulóját',
      date: '2023-10-08',
      summary: 'A hazai csapat 98-85-re legyőzte a Falco KC Szombathelyt a nyitó mérkőzésen.'
    },
    {
      title: 'Rekord nézőszám a Zalakerámia-ZTE mérkőzésen',
      date: '2023-10-07',
      summary: 'Több mint 5000 néző előtt győzte le a ZTE KK az Egis Körmendet.'
    },
    {
      title: 'Új szponzor a bajnokságnak',
      date: '2023-10-05',
      summary: 'A főszponzori jogokat a OTP Bank nyerte el a következő 3 évre.'
    }
  ];

  topPlayers = [
    { name: 'Hanga Ádám', team: 'Alba Fehérvár', points: 28.5, rebounds: 8.2, assists: 6.7 },
    { name: 'Keller Ákos', team: 'Falco KC Szombathely', points: 25.3, rebounds: 5.8, assists: 7.4 },
    { name: 'Vojvoda Dávid', team: 'Zalakerámia ZTE KK', points: 23.7, rebounds: 7.1, assists: 5.2 }
  ];

  upcomingMatches = [
    { homeTeam: 'DEAC', awayTeam: 'Kecskeméti TE', date: '2023-10-15' },
    { homeTeam: 'Atomerőmű SE', awayTeam: 'PVSK-Panthers', date: '2023-10-15' },
    { homeTeam: 'Sopron KC', awayTeam: 'Alba Fehérvár', date: '2023-10-16' }
  ];
}