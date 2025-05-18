import { Component, NgZone } from '@angular/core'; // <-- Importáld a NgZone-t
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
  getDoc // <-- Importáld a getDoc-ot is
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


  constructor(private firestore: Firestore, private ngZone: NgZone) { // <-- Injektáld a NgZone-t
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

      // Űrlap ürítése
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

    // Firestore lekérdezés a név alapján (prefix matching)
    const playersQuery = query(
      this.playersCollection,
      where('name', '>=', this.searchName),
      where('name', '<=', this.searchName + '\uf8ff') // Unicode karakter a prefix illesztéshez
    );

    try {
      const querySnapshot = await getDocs(playersQuery);
      this.searchResults = []; // Eredmények törlése minden keresés előtt

      // Iterálás a találatokon és hozzáadás a searchResults tömbhöz
      querySnapshot.forEach((doc) => {
        // doc.data() egy objektum, ami a dokumentum adatait tartalmazza
        // doc.id a dokumentum egyedi azonosítója
        const playerData = { id: doc.id, ...doc.data() as Omit<Player, 'id'> };
        // JSON.parse(JSON.stringify()) egy egyszerű módja a mély másolásnak,
        // hogy elkerüljük a referencia problémákat, ha később módosítjuk az objektumot
        this.searchResults.push(JSON.parse(JSON.stringify(playerData)));
      });

      console.log('Keresési eredmények:', this.searchResults);

      // Üzenet, ha nincs találat
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
      return; // Megszakítja a törlést, ha a felhasználó nem erősíti meg
    }

    try {
        // Ellenőrizzük, hogy az ID sztring típusú-e
        console.log('deletePlayer - playerId típusa:', typeof playerId, 'értéke:', playerId); // DEBUG SOR

        // Hivatkozás a törlendő dokumentumra
        const playerDocRef = doc(this.firestore, 'players', playerId);

        // Ellenőrizzük, hogy a dokumentum létezik-e a törlés előtt (opcionális, de hasznos lehet)
        const docSnap = await getDoc(playerDocRef);
        if (!docSnap.exists()) {
            console.error(`A dokumentum ${playerId} ID-vel nem létezik, nem lehet törölni.`);
            alert(`Hiba: A(z) ${playerName} játékos dokumentuma nem található, nem lehet törölni.`);
            return;
        }


        // Dokumentum törlése
        await deleteDoc(playerDocRef);

        // searchResults tömb frissítése a törölt játékos nélkül
        // ngZone.run() használata, hogy az Angular érzékelje a változást
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

      // Ellenőrizzük, hogy a felhasználó nem nyomta-e meg a Mégsem gombot, vagy nem adott-e meg üres nevet
      if (newName === null || newName.trim() === '') {
          if (newName === null) {
              console.log('Név frissítés megszakítva.');
          } else {
              alert('A név nem lehet üres.');
          }
          return;
      }

      // Ellenőrizzük, hogy a név tényleg megváltozott-e
      if (newName.trim() === originalPlayerName.trim()) {
          console.log('A név nem változott, nincs szükség frissítésre.');
          return;
      }

      try {
          // Ellenőrizzük, hogy az ID sztring típusú-e
          console.log('updatePlayer - player.id típusa:', typeof player.id, 'értéke:', player.id); // DEBUG SOR

          // Hivatkozás a frissítendő dokumentumra
          // Itt használjuk a player.id-t, ami a searchResults-ból jön
          const playerDocRef = doc(this.firestore, 'players', player.id);

          // Ellenőrizzük, hogy a dokumentum létezik-e a frissítés előtt (opcionális, de hasznos lehet)
           const docSnap = await getDoc(playerDocRef);
           if (!docSnap.exists()) {
               console.error(`A dokumentum ${player.id} ID-vel nem létezik, nem lehet frissíteni.`);
               alert(`Hiba: A(z) ${originalPlayerName} játékos dokumentuma nem található, nem lehet frissíteni.`);
               return;
           }


          // Dokumentum frissítése (csak a nevet frissítjük példaként)
          await updateDoc(playerDocRef, { name: newName });

          // searchResults tömb frissítése a frissített játékossal
          // ngZone.run() használata, hogy az Angular érzékelje a változást
          this.ngZone.run(() => {
            const index = this.searchResults.findIndex(p => p.id === player.id);
            if (index !== -1) {
              // Frissítsük a nevet a searchResults tömbben lévő objektumon
              this.searchResults[index].name = newName;
              // Készítsünk egy új tömböt, hogy az Angular érzékelje a változást (immutable update)
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
