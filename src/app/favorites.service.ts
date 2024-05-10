import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(private cookieService: CookieService) {}

  // Fetch the list of favorite actor IDs from cookies
  initializeFavorites(): number[] {
    return JSON.parse(this.cookieService.get('favorites') || '[]');
  }

  // Add an actor to the favorites list
  addFavorite(actorId: number): void {
    let favorites = this.initializeFavorites();
    if (!favorites.includes(actorId)) {
      favorites.push(actorId);
      this.updateFavorites(favorites);  // Update the cookie with the new list
    }
  }

  // Remove an actor from the favorites list
  removeFavorite(actorId: number): void {
    let favorites = this.initializeFavorites();
    const index = favorites.indexOf(actorId);
    if (index > -1) {
      favorites.splice(index, 1);
      this.updateFavorites(favorites);  // Update the cookie with the new list
    }
  }

  // Update the favorites in the cookie
  updateFavorites(favorites: number[]): void {
    const expires = new Date(Date.now() + 86400 * 1000);  // Set cookie to expire in 1 day
    this.cookieService.set('favorites', JSON.stringify(favorites), expires, '/');
  }

  // Optional: Check if an actor is already favorited
  isFavorite(actorId: number): boolean {
    const favorites = this.initializeFavorites();
    return favorites.includes(actorId);
  }
}
