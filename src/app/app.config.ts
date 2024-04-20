import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ringoffire-de23d","appId":"1:750757064492:web:e2c67c8bc4459547a48689","storageBucket":"ringoffire-de23d.appspot.com","apiKey":"AIzaSyC1SXqhcl2ouR37pdNGbUU3tD8YQWem4EU","authDomain":"ringoffire-de23d.firebaseapp.com","messagingSenderId":"750757064492","measurementId":"G-Q7V30YRKF1"}))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase()))]
};
