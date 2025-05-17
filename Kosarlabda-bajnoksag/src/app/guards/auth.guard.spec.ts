import { TestBed } from '@angular/core/testing';


import { AuthGuard } from './auth.guard'; 
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

const mockAuth = {};
const mockRouter = { createUrlTree: jasmine.createSpy('createUrlTree') }; 

describe('AuthGuard', () => { 

  let authGuard: AuthGuard; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard, 
        { provide: Auth, useValue: mockAuth }, 
        { provide: Router, useValue: mockRouter } 
      ]
     
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  // TODO: Ide jönnének a további tesztek a canActivate logikájára
  // Például:
  // it('should return true for a logged in user', (done) => { ... });
  // it('should redirect to login for a logged out user', (done) => { ... });
  // Ezek a tesztek megkövetelnék a mockAuth finomítását, hogy szimulálni tudja a bejelentkezett/kijelentkezett állapotot.
});