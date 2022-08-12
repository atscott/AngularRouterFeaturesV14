import {Component, inject} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Routes} from '@angular/router';

@Component({
  template: 'userId: {{userId}}',
  standalone: true,
})
export class UserComponent {
  userId = inject(ActivatedRoute).snapshot.data['userId'];
}

export const userRoutes: Routes = [{
  path: ':userId',
  component: UserComponent,
  // New feature in v14.2 title resolver can now be a function
  title: (route: ActivatedRouteSnapshot) => `user ${route.params['userId']}`,
  resolve: {
    // New feature in 14.2 - guards and resolvers can be functions
    // Upcoming feature (not scoped or designed yet): This will bind directly to the userId input of UserComponent
    'userId': (route: ActivatedRouteSnapshot) => route.params['userId'],
  },
}];