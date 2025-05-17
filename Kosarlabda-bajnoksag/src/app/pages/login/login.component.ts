import { Component, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importáljuk a FormsModule-ot a two-way bindinghoz
import { CommonModule } from '@angular/common'; // Szükség lehet rá a *ngIf vagy más common direktívákhoz
import { Router } from '@angular/router'; // Ha át szeretnél irányítani sikeres bejelentkezés után

// Importáld a Firebase Auth SDK szükséges részeit
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  standalone: true, // Mivel standalone komponens
  imports: [
    CommonModule, // Ha használsz common direktívákat
    FormsModule // Fontos a form bindinghoz [(ngModel)]
  ],
  templateUrl: './login.component.html', // A HTML template fájlod
  styleUrls: ['./login.component.scss'] // A CSS fájlod
})
export class LoginComponent {

  // Tulajdonságok a beviteli mezők értékeinek tárolásához
  email: string = '';
  password: string = '';
  errorMessage: string | null = null; // Hibaüzenetek megjelenítéséhez

  // Befecskendezzük a Firebase Auth szolgáltatást és a Router-t
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router); // A navigációhoz
  selectedPage: any;

  constructor() { }

  // Metódus a bejelentkezés kezelésére a gomb kattintásra
  async onLogin() {
    this.errorMessage = null; // Töröljük az előző hibaüzenetet

    try {
      // Firebase Auth bejelentkezés email címmel és jelszóval
      const userCredential = await signInWithEmailAndPassword(
        this.auth, // Az injektált Auth példány
        this.email,
        this.password
      );

      
      console.log('Sikeres bejelentkezés:', userCredential.user);

    
      @Output() const selectedPage = new EventEmitter<string>();
      this.selectedPage.emit('home');
    
    
  }

    } catch (error: any) {
      console.error('Hiba a bejelentkezés során:', error.message);
      this.errorMessage = error.message; // Tároljuk a hibaüzenetet a megjelenítéshez
    }
  }
}