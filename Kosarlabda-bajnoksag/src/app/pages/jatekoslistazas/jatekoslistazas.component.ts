import { Component, OnInit } from '@angular/core'; // Importáld az OnInit-et
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
// Nincs szükség MatButtonModule-ra, ha nincs feltöltő gomb
// import { MatButtonModule } from '@angular/material/button';

// Importáld a Firestore modulokat az olvasáshoz
import { Firestore, collection, collectionData, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs'; // Importáld az Observable-t


interface Player {
  // Az 'id' mező hozzáadása hasznos lehet, ha a Firestore dokumentum ID-t is kezelni akarod
  // az objektumon belül (pl. törléshez vagy szerkesztéshez).
  // Ha addDoc-ot használtál feltöltéskor, a dokumentum ID automatikusan generálódott.
  // Ha a collectionData-t idField: 'id' opcióval hívod meg, ez a mező feltöltődik.
  id?: string;
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
    MatInputModule,
    // Nincs MatButtonModule import, ha nincs gomb
    // MatButtonModule
  ],
  templateUrl: './jatekoslistazas.component.html',
  styleUrls: ['./jatekoslistazas.component.scss']
})
export class JatekoslistazasComponent implements OnInit { // Implementáld az OnInit interfészt
  displayedColumns: string[] = ['name', 'team', 'position', 'height', 'birthYear', 'nationality'];

  players: Player[] = [];

  // Hivatkozás a Firestore kollekcióra
  private playersCollection: CollectionReference;
  // Observable a játékos adatoknak
  private players$!: Observable<Player[]>;


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

  constructor(private firestore: Firestore) {
     // Hivatkozás a Firestore kollekcióra a konstruktorban
     this.playersCollection = collection(this.firestore, 'players');
     // Készítsünk egy observable-t a kollekció adatokból
     // Az idField: 'id' beállítás hozzáadja a Firestore dokumentum ID-jét az objektumhoz
     this.players$ = collectionData(this.playersCollection, { idField: 'id' }) as Observable<Player[]>;
   }

   ngOnInit(): void {
     this.players$.subscribe(firestorePlayers => {
       // Amikor új adatok érkeznek (pl. betöltéskor vagy változáskor), frissítjük a komponens 'players' tömbjét
       this.players = firestorePlayers;
       console.log('Játékosok beolvasva Firestore-ból:', this.players);
     });
   }


  // A get filteredPlayers getter most már a Firestore-ból beolvasott this.players tömböt szűri és rendezi
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
        // Ha az id-t is megjeleníted vagy rendezed, ide vedd fel:
        // case 'id': return compare(a.id!, b.id!, isAsc); // Feltételezi, hogy az id string
        default: return 0;
      }
    });
  }

  onSortChange(sortState: Sort) {
    this.sort = sortState;
  }

  // A feltöltő metódus és az eredeti players adat már nincs itt
  // async uploadPlayersToFirestore() { ... }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}