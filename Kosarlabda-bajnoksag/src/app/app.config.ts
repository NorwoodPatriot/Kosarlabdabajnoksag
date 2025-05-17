import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { initializeApp } from 'firebase/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBZyuvVxwS_GfaEpnJjarDId0p4x0DVOyM",
  authDomain: "kosarlabdabajnoksag.firebaseapp.com",
  projectId: "kosarlabdabajnoksag",
  storageBucket: "kosarlabdabajnoksag.firebasestorage.app",
  messagingSenderId: "1077140343211",
  appId: "1:1077140343211:web:26b89f3966fd0bf1f8aaee",
  measurementId: "G-NFLFBQZH83"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth(initializeApp(firebaseConfig))),
    provideFirestore(() => getFirestore()),
    ]

};
