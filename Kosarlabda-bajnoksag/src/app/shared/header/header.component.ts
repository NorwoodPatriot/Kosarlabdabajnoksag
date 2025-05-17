import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isLoggedIn: boolean = false;
  @Output() logoutClicked = new EventEmitter<void>();

  constructor(private router: Router) {}

  get activePage(): string {
    return this.router.url.split('/')[1] || 'home';
  }

  onLogoutClick() {
    this.logoutClicked.emit();
  }
}