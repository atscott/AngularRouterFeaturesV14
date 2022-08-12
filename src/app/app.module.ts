import {Component, inject, Injectable} from '@angular/core';
import {RouterLinkWithHref, RouterOutlet, Routes} from '@angular/router';

@Injectable({providedIn: 'root'})
export class LoginService {
  isLoggedIn = false;
}

@Component({template: 'home', standalone: true})
export class HomeComponent {
}

@Component({
  selector: 'app-root',
  standalone: true,
  // New feature in 14.1. Router directives are standalone. You can now explitily see what this component depends on
  imports: [RouterOutlet, RouterLinkWithHref],
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

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  // New feature in v14: defining browser title on routes
  {path: 'home', component: HomeComponent, title: 'home'},
  {
    path: 'user',
    // new feature since 14.1 that allows ignoring this route if the guard returns false
    // New feature in 14.2 - guards and resolvers can be functions
    canMatch: [()=> inject(LoginService).isLoggedIn],
    // new feature since 14.0 - You can import routes directly instead of needing an NgModule and RouterModule.forChild
    loadChildren: () => import('./user.module').then(m => m.userRoutes),
  },
  // New feature in 14.0 components themselves can be lazy loaded
  {path: '**', loadComponent: () => import('./not.found.component').then(c => c.NotFoundComponent), title: 'not found'}
];
