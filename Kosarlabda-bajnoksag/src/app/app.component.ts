import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

// Importáld az ÖSSZES komponenst, amit a @switch-ben használsz
// Győződj meg róla, hogy ezeknek a komponenseknek az importjai helyesek
import { RouterOutlet } from '@angular/router'; // RouterOutlet kommentben van, de importálva
import { HomeComponent } from './pages/home/home.component';
import { CsapatlistazasComponent } from './pages/csapatlistazas/csapatlistazas.component';
import { JatekoslistazasComponent } from './pages/jatekoslistazas/jatekoslistazas.component';
import { MeccsnaptarComponent } from './pages/meccsnaptar/meccsnaptar.component';
import { TabellaComponent } from './pages/tabella/tabella.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './shared/header/header.component'; // Feltételezve, hogy a fejléc komponens neve HeaderComponent

// Importáld azokat a komponenseket, amiket védeni akarsz
import { AdminComponent } from './pages/admin/admin.component'; // Feltételezett elérési út és név
import { UjfelhasznaloComponent } from './pages/ujfelhasznalo/ujfelhasznalo.component'; // Feltételezett elérési út és név

// Firebase Auth importálása
import { Auth, User, IdTokenResult, authState } from '@angular/fire/auth'; // authState is importálva
import { Subscription } from 'rxjs'; // Subscription importálva a leiratkozáshoz


@Component({
  selector: 'app-root',
  standalone: true, // Feltételezve, hogy standalone komponens
  imports: [
    CommonModule, // Szükséges a *ngIf, *ngFor, stb.
    NgIf, // Explicit import, ha használod a HTML-ben (habár a figyelmeztetés szerint most nem)
    // RouterOutlet, // Kommentben hagyva a manuális rendszer miatt
    HomeComponent,
    CsapatlistazasComponent,
    JatekoslistazasComponent,
    MeccsnaptarComponent,
    TabellaComponent,
    HeaderComponent,
    LoginComponent,
    AdminComponent, // Importáld az Admin komponenst
    UjfelhasznaloComponent, // Importáld az Ujfelhasznalo komponenst
    // ... győződj meg róla, hogy az ÖSSZES @switch case-ben használt komponens itt importálva van
  ],
  templateUrl: './app.component.html', // Itt van a @switch blokk
  styleUrl: './app.component.scss' // Vagy styleUrls, ha tömb
})
export class AppComponent {
  title = 'Kosarlabda-bajnoksag';

  // A page változó tárolja, hogy melyik oldalt jelenítsük meg a @switch-ben
  page: string = "home"; // Kezdetben a főoldal, vagy 'login' ha ott kezdesz

  // <-- ÚJ: Tulajdonság a bejelentkezési állapot tárolására
  isLoggedIn: boolean = false;

  // Injektáljuk a Firebase Auth szolgáltatást
  private auth: Auth = inject(Auth);

  // Tároljuk a feliratkozást, hogy le tudjunk iratkozni ngOnDestroy-ban
  private authStateSubscription: Subscription;


  constructor() {
     // <-- ÚJ: Feliratkozás a Firebase Auth állapotváltozására a konstruktorban
     this.authStateSubscription = authState(this.auth).subscribe(user => {
       // Ha van felhasználó (user nem null), akkor be van jelentkezve
       this.isLoggedIn = !!user; // !!user átalakítja a user objektumot true-ra, null-t false-ra
       console.log('Auth állapot változott. Bejelentkezve:', this.isLoggedIn);

       // Opcionális: Ha a felhasználó kijelentkezik, átirányíthatod a login oldalra
       // if (!user && this.page !== 'login' && protectedPages.includes(this.page)) {
       //    this.page = 'login';
       // }
     });
  }

  // <-- ÚJ: ngOnDestroy lifecycle hook a takarításhoz
  // Ez a 1. kritérium teljesítéséhez is hozzájárul
  ngOnDestroy(): void {
    // Leiratkozás az authState Observable-ről, hogy elkerüljük a memóriaszivárgást
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }


  // Ez a metódus kezeli a fejlécből érkező lapváltási kéréseket
  changePage(selectedPage: string) {
    console.log('Lapváltási kérés:', selectedPage);

    // Itt definiáljuk a védett oldalak listáját
    const protectedPages = ['admin', 'ujfelhasznalo'];

    // Ellenőrizzük, hogy a kért oldal védett-e ÉS a felhasználó NINCS bejelentkezve
    if (protectedPages.includes(selectedPage) && !this.isLoggedIn) {
       console.log('User nincs bejelentkezve, átirányítás loginra.');
       this.page = 'login'; // Átirányítjuk a login oldalra a manuális rendszerben
    } else {
      // Ha az oldal nem védett, VAGY az oldal védett DE a felhasználó be van jelentkezve
      console.log('Lapváltás engedélyezve:', selectedPage);
      this.page = selectedPage; // Engedélyezzük a lapváltást a kért oldalra
    }
    // Fontos: A bejelentkezési állapot ellenőrzéshez a this.isLoggedIn tulajdonságot használjuk,
    // amit a konstruktorban lévő feliratkozás frissít.
    // Így nincs szükség Promise kezelésre itt a changePage metódusban.
  }

  // Ezt a metódust hívja a login komponens a loginSuccess eseménynél
  setPageToHome() {
    console.log('Sikeres bejelentkezés, átirányítás home-ra a manuális rendszerben.');
    this.page = 'home'; // Átállítjuk a page-et a főoldal értékére
  }
}