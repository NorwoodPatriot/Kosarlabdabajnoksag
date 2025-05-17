import { Component, inject, Output, EventEmitter } from '@angular/core'; // Output és EventEmitter importálása
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// A Router importot elvileg itt hagyhatod, de a navigate sort majd töröljük vagy kikommentezzük, ha nem a routerrel navigálsz
import { Router } from '@angular/router';

import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  // Definiálunk egy kimeneti eseményt
  @Output() loginSuccess = new EventEmitter<void>(); // Esemény, ami sikeres bejelentkezéskor sül ki

  private auth: Auth = inject(Auth);
  // private router: Router = inject(Router); // Ha nem a routerrel navigálsz, ez már nem kell ide

  constructor() { }

  async onLogin() {
    this.errorMessage = null;

    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );

      console.log('Sikeres bejelentkezés:', userCredential.user);

      // Sikeres bejelentkezés esetén kibocsátjuk az eseményt
      this.loginSuccess.emit(); // <-- Esemény kibocsátása

   

    } catch (error: any) {
      console.error('Hiba a bejelentkezés során:', error.message);
      this.errorMessage = error.message;
    }
  }
}