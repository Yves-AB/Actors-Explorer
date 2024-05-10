import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private cookieService: CookieService) {}

  initializeFavorites(): number[] {
    return JSON.parse(this.cookieService.get('favorites') || '[]');
  }

  addFavorite(actorId: number): void {
    let favorites = this.initializeFavorites();
    if (!favorites.includes(actorId)) {
      favorites.push(actorId);
      this.updateFavorites(favorites);
    }
  }

  removeFavorite(actorId: number): void {
    let favorites = this.initializeFavorites();
    const index = favorites.indexOf(actorId);
    if (index > -1) {
      favorites.splice(index, 1);
      this.updateFavorites(favorites);
    }
  }

  updateFavorites(favorites: number[]): void {
    const expires = new Date(Date.now() + 86400 * 1000);  // 1 day from now
    this.cookieService.set('favorites', JSON.stringify(favorites), expires, '/');
  }
}
