import {Component, inject, Injectable, NgModule} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterModule, Routes} from '@angular/router';

@Component({
  template: 'userId: {{userId}}',
})
export class UserComponent {
  userId = inject(ActivatedRoute).snapshot.data['userId'];
}

@Injectable({providedIn: 'root'})
export class UserIdResolver {
  resolve(route: ActivatedRouteSnapshot) {
    return route.params['userId'];
  }
}

const userRoutes: Routes = [{
  path: ':userId',
  component: UserComponent,
  resolve: {'userId': UserIdResolver},
}];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  declarations: [UserComponent],
})
export class UserModule {
}