import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CsapatlistazasComponent } from './pages/csapatlistazas/csapatlistazas.component';
import { JatekoslistazasComponent } from './pages/jatekoslistazas/jatekoslistazas.component';
import { MeccsnaptarComponent } from './pages/meccsnaptar/meccsnaptar.component';
import { TabellaComponent } from './pages/tabella/tabella.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UjfelhasznaloComponent } from './pages/ujfelhasznalo/ujfelhasznalo.component';
import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'tabella', component: TabellaComponent },
  { path: 'meccsnaptar', component: MeccsnaptarComponent },
  { path: 'jatekoslistazas', component: JatekoslistazasComponent },
  { path: 'csapatlistazas', component: CsapatlistazasComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [() => {
      const auth = inject(Auth);
      return authState(auth).pipe(
        map(user => {
          if (user) return true;
          return ['/login'];
        })
      );
    }]
  },
  { 
    path: 'ujfelhasznalo', 
    component: UjfelhasznaloComponent,
    canActivate: [() => {
      const auth = inject(Auth);
      return authState(auth).pipe(
        map(user => {
          if (user) return true;
          return ['/login'];
        })
      );
    }]
  },
  { path: '**', redirectTo: 'home' }
];