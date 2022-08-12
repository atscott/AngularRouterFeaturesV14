import {Component, Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

@Injectable({providedIn: 'root'})
export class LoginService {
  isLoggedIn = false;
}

@Injectable({providedIn: 'root'})
export class IsLoggedInGuard {
  constructor(private loginService: LoginService) {}

  canMatch() {
    return this.loginService.isLoggedIn;
  }
}

@Component({template: 'home'})
export class HomeComponent {
}

@Component({template: 'not found'})
export class NotFoundComponent {
}

@Component({
  selector: 'app-root',
  template: `
  <div><button (click)="loginService.isLoggedIn = true">log in</button></div>
  <div><button (click)="loginService.isLoggedIn = false">log out</button></div>
  <div>loged in: {{loginService.isLoggedIn}}</div>
  <div><a routerLink="user/1">go to /user/1</a></div>
  <div><a routerLink="home">go to home</a></div>
  <router-outlet></router-outlet>
  `})
export class AppComponent {
  constructor(readonly loginService: LoginService) {}
}

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {
    path: 'user',
    // new feature since 14.1 that allows ignoring this route if the guard returns false
    canMatch: [IsLoggedInGuard],
    loadChildren: () => import('./user.module').then(m => m.UserModule),
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    BrowserModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
