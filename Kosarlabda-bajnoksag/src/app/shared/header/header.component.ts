import { Component, EventEmitter, Output, Input } from '@angular/core'; // Input importálva
import { CommonModule, NgIf } from '@angular/common'; // NgIf importálva a *ngIf miatt
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NgIf, // Szükséges a *ngIf használatához a HTML sablonban
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html', // Itt van a HTML sablon
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isLoggedIn: boolean = false;

  @Output() selectedPage = new EventEmitter<string>();
  @Output() logoutClicked = new EventEmitter<void>();


  @Input() activePage: string = 'home';

  menuSwitch(pageValue: string) {
   
    this.selectedPage.emit(pageValue);
  }

  // <-- ÚJ: Metódus a kijelentkezés gomb kattintásának kezelésére
  // Ez a metódus hívódik meg a gomb kattintásakor
  onLogoutClick() {
    console.log('Kijelentkezés gomb kattintva a fejlécben.');
    // Itt hívjuk meg a logoutClicked eseménykibocsátó emit() metódusát
    this.logoutClicked.emit();
  }

}
