import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CsapatlistazasComponent } from './pages/csapatlistazas/csapatlistazas.component';
import { JatekoslistazasComponent } from './pages/jatekoslistazas/jatekoslistazas.component';
import { MeccsnaptarComponent } from './pages/meccsnaptar/meccsnaptar.component';
import { TabellaComponent } from './pages/tabella/tabella.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    //RouterOutlet,
    HomeComponent,
    CsapatlistazasComponent,
    JatekoslistazasComponent,
    MeccsnaptarComponent,
    TabellaComponent,
    HeaderComponent,
    LoginComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Kosarlabda-bajnoksag';

  page = "home"

  changePage(selectedPage: string){
    this.page = selectedPage;
  }

   setPageToHome() {
    this.page = 'home';
   }
}
