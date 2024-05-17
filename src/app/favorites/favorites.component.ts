import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FavoritesService } from '../favorites.service';
import { forkJoin } from 'rxjs';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-fav',
    standalone: true,
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css',
    imports: [CommonModule, NavbarComponent]
})
export class FavComponent implements OnInit{
  actors: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: TmdbService, private router: Router, private favoritesService: FavoritesService) {}

  ngOnInit() {
    const favorites = this.favoritesService.initializeFavorites();
    console.log('Favorites: ', favorites);

    // Create an array of observables for each API call
    const apiRequests = favorites.map((favorite) => this.apiService.getActorDetails(favorite));

    // Use forkJoin to execute all API calls in parallel
    forkJoin(apiRequests).subscribe({
      next: (responses) => {
        console.log('Responses: ', responses);
        
        // Handle responses as needed, e.g., merging into a single array
        this.actors = responses;
      },
      error: (error) => {
        console.error('Error fetching actors: ', error);
      },
      complete: () => {
        console.log('Actor fetch complete');
      }
    });

  }
  goToActorDetails(id: Number) {
    console.log('Go to actor details: ', id);
    this.router.navigate(['actor', id]).then(() => {
      window.location.reload();
  });
}
}
