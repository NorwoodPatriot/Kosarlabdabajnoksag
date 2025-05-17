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
import { Auth, User, IdTokenResult, authState, signOut } from '@angular/fire/auth'; // authState is importálva
import { Subscription } from 'rxjs'; // Subscription importálva a leiratkozáshoz


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    CommonModule, 
    //NgIf,
    // RouterOutlet, 
    HomeComponent,
    CsapatlistazasComponent,
    JatekoslistazasComponent,
    MeccsnaptarComponent,
    TabellaComponent,
    HeaderComponent,
    LoginComponent,
    AdminComponent,
    UjfelhasznaloComponent, 
  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss' 
})
export class AppComponent {
  title = 'Kosarlabda-bajnoksag';

  
  page: string = "home"; 

  
  isLoggedIn: boolean = false;

  private auth: Auth = inject(Auth);

  private authStateSubscription: Subscription;


  constructor() {
   
     this.authStateSubscription = authState(this.auth).subscribe(user => {
       this.isLoggedIn = !!user; 
       console.log('Auth állapot változott. Bejelentkezve:', this.isLoggedIn);

       
     });
  }


  ngOnDestroy(): void {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }
  changePage(selectedPage: string) {
    console.log('Lapváltási kérés:', selectedPage);

    const protectedPages = ['admin', 'ujfelhasznalo'];

 
    if (protectedPages.includes(selectedPage) && !this.isLoggedIn) {
       console.log('User nincs bejelentkezve, átirányítás loginra.');
       this.page = 'login'; 
    } else {

      console.log('Lapváltás engedélyezve:', selectedPage);
      this.page = selectedPage; // Engedélyezzük a lapváltást a kért oldalra
    }
    
  }

  setPageToHome() {
    console.log('Sikeres bejelentkezés, átirányítás home-ra a manuális rendszerben.');
    this.page = 'home'; 
  }

   async onLogout() {
     console.log('Kijelentkezés folyamatban...');
     try {
       await signOut(this.auth); 
       console.log('Sikeres kijelentkezés.');
       this.page = 'login';
     } catch (error: any) {
       console.error('Hiba a kijelentkezés során:', error);
  
     }
   }
}