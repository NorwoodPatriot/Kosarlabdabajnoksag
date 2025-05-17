import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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

  private auth: Auth = inject(Auth);
  private router = inject(Router);

  async onLogin() {
    this.errorMessage = null;

    try {
      await signInWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      
      // Navigate to home after successful login
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Login error:', error);
      this.errorMessage = this.getUserFriendlyError(error.code);
    }
  }

  private getUserFriendlyError(code: string): string {
    const errorMap: Record<string, string> = {
      'auth/invalid-email': 'Érvénytelen email cím',
      'auth/user-disabled': 'A felhasználó letiltva',
      'auth/user-not-found': 'Nem található ilyen felhasználó',
      'auth/wrong-password': 'Hibás jelszó',
      'auth/too-many-requests': 'Túl sok próbálkozás, próbáld újra később'
    };
    
    return errorMap[code] || 'Hiba történt a bejelentkezés során';
  }
}