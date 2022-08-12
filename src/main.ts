import {enableProdMode} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, withRouterConfig} from '@angular/router';

import {AppComponent, routes} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // New feature in 14.2 - using Router without RouterModule
    provideRouter(routes, withRouterConfig({onSameUrlNavigation: 'reload'})),
  ]
})
