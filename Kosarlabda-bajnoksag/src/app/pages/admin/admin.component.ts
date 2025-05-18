import { Component, NgZone } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Firestore,
  collection,
  addDoc,
  CollectionReference,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDocs,
  getDoc 
} from '@angular/fire/firestore';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


interface PlayerFormData {
  name: string;
  team: string;
  position: string;
  height: number | null;
  birthYear: number | null;
  nationality: string;
}

interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  height: number;
  birthYear: number;
  nationality: string;
}


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  player: PlayerFormData = {
    name: '', team: '', position: '', height: null, birthYear: null, nationality: ''
  };
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
  positions: string[] = [
    'Irányító',
    'Bedobó',
    'Center'
  ];


  searchName: string = '';
  searchResults: Player[] = [];

  private playersCollection: CollectionReference;


  constructor(private firestore: Firestore, private ngZone: NgZone) {
      this.playersCollection = collection(this.firestore, 'players');
  }

  // --- Új játékos hozzáadása metódus (CREATE) ---
  async onSubmitNewPlayer() {
    if (!this.player.name || !this.player.team || !this.player.position || this.player.height === null || this.player.birthYear === null || !this.player.nationality) {
      console.error('Kérlek töltsd ki az összes mezőt az új játékos hozzáadásához!');
      alert('Kérlek töltsd ki az összes mezőt!');
      return;
    }

    try {
      const docRef = await addDoc(this.playersCollection, {
        name: this.player.name,
        team: this.player.team,
        position: this.player.position,
        height: this.player.height,
        birthYear: this.player.birthYear,
        nationality: this.player.nationality
      });

      console.log('Új játékos hozzáadva a Firestore-hoz:', this.player.name, 'Dokumentum ID:', docRef.id);

      this.player = { name: '', team: '', position: '', height: null, birthYear: null, nationality: '' };

      alert('Új játékos sikeresen hozzáadva!');

    } catch (e) {
      console.error('Hiba az új játékos hozzáadásakor:', e);
      alert('Hiba történt az új játékos hozzáadása során.');
    }
  }

  // --- Játékos keresése metódus (READ) ---
  async onSearch() {
    if (!this.searchName) {
      this.searchResults = [];
      return;
    }

    const playersQuery = query(
      this.playersCollection,
      where('name', '>=', this.searchName),
      where('name', '<=', this.searchName + '\uf8ff') 
    );

    try {
      const querySnapshot = await getDocs(playersQuery);
      this.searchResults = []; 

      querySnapshot.forEach((doc) => {
    
        const playerData = { id: doc.id, ...doc.data() as Omit<Player, 'id'> };
        this.searchResults.push(JSON.parse(JSON.stringify(playerData)));
      });

      console.log('Keresési eredmények:', this.searchResults);

      if (this.searchResults.length === 0 && this.searchName.length > 0) {
        alert('Nincs a keresési feltételnek megfelelő játékos.');
      }

    } catch (e) {
      console.error('Hiba a keresés során:', e);
      alert('Hiba történt a keresés során.');
    }
  }


  // --- Játékos törlése metódus (DELETE) ---
  async deletePlayer(playerId: string, playerName: string) {
    if (!playerId) {
        console.error('Nincs játékos ID a törléshez.');
        alert('Hiba: Nincs játékos ID a törléshez.');
        return;
    }

    const confirmDelete = confirm(`Biztosan törölni szeretnéd a(z) ${playerName} nevű játékost?`);
    if (!confirmDelete) {
      return; 
    }

    try {
        console.log('deletePlayer - playerId típusa:', typeof playerId, 'értéke:', playerId); // DEBUG SOR

        const playerDocRef = doc(this.firestore, 'players', playerId);

        const docSnap = await getDoc(playerDocRef);
        if (!docSnap.exists()) {
            console.error(`A dokumentum ${playerId} ID-vel nem létezik, nem lehet törölni.`);
            alert(`Hiba: A(z) ${playerName} játékos dokumentuma nem található, nem lehet törölni.`);
            return;
        }

        await deleteDoc(playerDocRef);

        this.ngZone.run(() => {
          this.searchResults = this.searchResults.filter(player => player.id !== playerId);
        });

        alert(`${playerName} sikeresen törölve!`);

    } catch (e) {
      console.error('Hiba a játékos törlésekor:', playerName, 'ID:', playerId, e);
      alert(`Hiba történt a(z) ${playerName} törlése során: ${e instanceof Error ? e.message : 'Ismeretlen hiba'}`);
    }
  }

  // --- Játékos frissítése metódus (UPDATE) ---
  async updatePlayer(player: Player) {
      if (!player || !player.id) {
          console.error('Nincs játékos objektum vagy ID a frissítéshez.');
          alert('Hiba: Nincs játékos objektum vagy ID a frissítéshez.');
          return;
      }

      const originalPlayerName = player.name;
      const newName = prompt(`Kérlek add meg az új nevet a(z) ${originalPlayerName} játékosnak:`, originalPlayerName);

      if (newName === null || newName.trim() === '') {
          if (newName === null) {
              console.log('Név frissítés megszakítva.');
          } else {
              alert('A név nem lehet üres.');
          }
          return;
      }

      if (newName.trim() === originalPlayerName.trim()) {
          console.log('A név nem változott, nincs szükség frissítésre.');
          return;
      }

      try {
          console.log('updatePlayer - player.id típusa:', typeof player.id, 'értéke:', player.id); // DEBUG SOR

          const playerDocRef = doc(this.firestore, 'players', player.id);

           const docSnap = await getDoc(playerDocRef);
           if (!docSnap.exists()) {
               console.error(`A dokumentum ${player.id} ID-vel nem létezik, nem lehet frissíteni.`);
               alert(`Hiba: A(z) ${originalPlayerName} játékos dokumentuma nem található, nem lehet frissíteni.`);
               return;
           }


          await updateDoc(playerDocRef, { name: newName });

          this.ngZone.run(() => {
            const index = this.searchResults.findIndex(p => p.id === player.id);
            if (index !== -1) {
              this.searchResults[index].name = newName;
              this.searchResults = [...this.searchResults];
            }
          });

          alert(`${originalPlayerName} adatai sikeresen frissítve új névre: ${newName}!`);

      } catch (e) {
          console.error('Hiba a játékos frissítésekor:', originalPlayerName, 'ID:', player.id, e);
          alert(`Hiba történt a(z) ${originalPlayerName} adatok frissítése során: ${e instanceof Error ? e.message : 'Ismeretlen hiba'}`);
      }
    }
}
