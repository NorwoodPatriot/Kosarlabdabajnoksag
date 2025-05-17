import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ujfelhasznalo.component.html',
  styleUrls: ['./ujfelhasznalo.component.scss']
})
export class UjfelhasznaloComponent {
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);
  successMessage = signal<string | null>(null);

  constructor(private auth: Auth, private router: Router) {}

  async register() {
    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set('A jelszavak nem egyeznek!');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      await createUserWithEmailAndPassword(
        this.auth,
        this.email(),
        this.password()
      );
      
      this.successMessage.set('Sikeres regisztráció! Átirányítás...');
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    } catch (error: any) {
      this.errorMessage.set(this.getFirebaseErrorMessage(error));
    } finally {
      this.isLoading.set(false);
    }
  }

  private getFirebaseErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Ez az email cím már használatban van.';
      case 'auth/invalid-email':
        return 'Érvénytelen email cím.';
      case 'auth/weak-password':
        return 'A jelszó túl gyenge. Legalább 6 karakter hosszú legyen.';
      case 'auth/operation-not-allowed':
        return 'A regisztráció jelenleg nem engedélyezett.';
      default:
        return 'Hiba történt a regisztráció során.';
    }
  }
}