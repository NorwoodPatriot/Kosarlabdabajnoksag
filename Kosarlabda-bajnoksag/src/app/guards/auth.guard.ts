import { Injectable, inject } from '@angular/core'; // inject hozzáadva
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'; // Router hozzáadva
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // map operátor hozzáadva
import { Auth, authState } from '@angular/fire/auth'; // Firebase Auth importálása és authState


@Injectable({
  providedIn: 'root' // A Guard az alkalmazás gyökerében lesz elérhető
})
export class AuthGuard implements CanActivate {

  // Injektáljuk a Firebase Auth szolgáltatást és a Router-t
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router); // Router az átirányításhoz, ha a felhasználó nincs bejelentkezve

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Az authState Observable-t használjuk, ami kibocsátja a jelenlegi felhasználót (vagy null, ha nincs bejelentkezve)
    return authState(this.auth).pipe(
      // A map operátorral átalakítjuk a felhasználó objektumot egy boolean vagy UrlTree értékre
      map(user => {
        // Ha van bejelentkezett felhasználó objektum (tehát user nem null)
        if (user) {
          console.log('AuthGuard: User is logged in. Access granted.'); // Konzol debug üzenet
          return true; // Engedélyezzük a hozzáférést az útvonalhoz
        } else {
          // Ha nincs bejelentkezett felhasználó (user null)
          console.log('AuthGuard: No user logged in. Redirecting to login.'); // Konzol debug üzenet
          // Létrehozunk egy UrlTree-t, ami a '/login' útvonalra mutat
          // A Router fogja ezt az UrlTree-t felhasználni az átirányításhoz
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}