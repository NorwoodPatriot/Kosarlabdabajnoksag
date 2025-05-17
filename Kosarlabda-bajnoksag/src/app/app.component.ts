import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Kosarlabda-bajnoksag';
  isLoggedIn: boolean = false;
  private auth: Auth = inject(Auth);
  private router = inject(Router);
  private authStateSubscription: Subscription;

  constructor() {
    this.authStateSubscription = authState(this.auth).subscribe(user => {
      this.isLoggedIn = !!user;
      console.log('Auth state changed. Logged in:', this.isLoggedIn);
      
      // If user logs out and we're on a protected page, redirect to login
      if (!user && this.isProtectedPage()) {
        this.router.navigate(['/login']);
      }
    });
  }

  private isProtectedPage(): boolean {
    const protectedPages = ['admin', 'ujfelhasznalo'];
    return protectedPages.some(page => this.router.url.includes(page));
  }

  async onLogout() {
    try {
      await signOut(this.auth);
      // No need to navigate here - the authState subscription will handle it
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  ngOnDestroy() {
    this.authStateSubscription?.unsubscribe();
  }
}