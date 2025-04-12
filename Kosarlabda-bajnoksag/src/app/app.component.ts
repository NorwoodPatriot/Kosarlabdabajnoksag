import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CsapatAdatokComponent } from './pages/csapat-adatok/csapat-adatok.component';
import { CsapatlistazasComponent } from './pages/csapatlistazas/csapatlistazas.component';
import { JatekosAdatokComponent } from './pages/jatekos-adatok/jatekos-adatok.component';
import { JatekoslistazasComponent } from './pages/jatekoslistazas/jatekoslistazas.component';
import { MatchAdatokComponent } from './pages/match-adatok/match-adatok.component';
import { MeccsnaptarComponent } from './pages/meccsnaptar/meccsnaptar.component';
import { TabellaComponent } from './pages/tabella/tabella.component';
import { HeaderComponent } from './shared/header/header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    HomeComponent,
    CsapatAdatokComponent,
    CsapatlistazasComponent,
    JatekosAdatokComponent,
    JatekoslistazasComponent,
    MatchAdatokComponent,
    MeccsnaptarComponent,
    TabellaComponent,
    HeaderComponent,
    NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Kosarlabda-bajnoksag';

  page = "home"

  changePage(selectedPage: string){
    this.page = selectedPage;
  }
}
