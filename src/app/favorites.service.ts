import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private cookieService: CookieService){}

  initializeFavorites(): number[]{
    return JSON.parse(this.cookieService.get('favorites') || '[]');
  }
  updateFavorites(favorites: number[]): void {
    const expires = new Date(Date.now() + 86400 * 1000);
    this.cookieService.set('favorites', JSON.stringify(favorites), expires, '/');
  }

}
