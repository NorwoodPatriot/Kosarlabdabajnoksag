import { Component, EventEmitter, Output, Input } from '@angular/core'; // Input importálva
import { CommonModule, NgIf } from '@angular/common'; // NgIf importálva a *ngIf miatt
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NgIf, 
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html', 
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  @Input() isLoggedIn: boolean = false;

  @Output() selectedPage = new EventEmitter<string>();

  @Input() activePage: string = 'home';

  menuSwitch(pageValue: string) {
  
    this.selectedPage.emit(pageValue);
  }


}
