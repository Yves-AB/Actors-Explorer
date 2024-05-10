import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ActorSearchComponent } from './actor-search/actor-search.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { FavoritesComponent } from './favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'search', component: ActorSearchComponent },
  { path: 'actor/:id', component: ActorDetailsComponent },
  { path: 'favorites', component: FavoritesComponent }
];
