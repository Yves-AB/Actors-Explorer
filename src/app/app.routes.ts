import { Routes } from '@angular/router';
import { ActorSearchComponent } from './actor-search/actor-search.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { FavoritesComponent } from './favorites/favorites.component';

export const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: ActorSearchComponent },
  { path: 'actor/:id', component: ActorDetailsComponent },
  { path: 'favorites', component: FavoritesComponent }
];
