import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../services/tmdb.service';
import { Router } from '@angular/router';
import { FavoritesService } from '../favorites.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  actors: any[] = [];

  constructor(
    private tmdbService: TmdbService,
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    const favorites = this.favoritesService.initializeFavorites();

    const apiRequests = favorites.map(id => this.tmdbService.getActorDetails(id));

    forkJoin(apiRequests).subscribe({
      next: (responses) => {
        this.actors = responses; // Assuming the API returns actor details correctly
      },
      error: (error) => console.error('Error fetching actor details: ', error),
      complete: () => console.log('Actor fetch complete')
    });
  }

  goToActorDetails(id: number) {
    this.router.navigate(['actor', id]).then(() => {
      window.location.reload();
    });
  }
}
