import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FavoritesService } from '../favorites.service';

@Component({
    selector: 'app-actor-search',
    standalone: true,
    templateUrl: './actor-search.component.html',
    styleUrls: ['./actor-search.component.css'],
    imports: [CommonModule, FormsModule, NavbarComponent]
})
export class ActorSearchComponent implements OnInit {
  actors: any[] = [];
  pagenum: number = 1;
  query: string = "";

  constructor(private route: ActivatedRoute, private tmdbService: TmdbService, private router: Router,  private favoritesService: FavoritesService) {}

  ngOnInit() {
    console.log("Actor Search component initialized.");

    // Subscribe to route parameters
    this.route.params.subscribe(params => {
      this.query = params['query'];
      this.pagenum = +params['page']; // The '+' converts string to number
      this.searchActors(this.query);
    });
  }

  searchActors(query: string): void {
    this.tmdbService.searchActors(query).subscribe({
      next: (response) => {
        const favorites = this.favoritesService.initializeFavorites();
        this.actors = response.results.map((actor: { id: number; }) => ({
          ...actor,
          isFavorite: favorites.includes(actor.id)  // Set isFavorite based on favorites
        }));
      },
      error: (error) => {
        console.error('Error fetching actors: ', error);
      },
      complete: () => {
        console.log('Actor fetch complete');
      }
    });
  }

  toggleFavorite(actor: any): void {
    actor.isFavorite = !actor.isFavorite;
    if (actor.isFavorite) {
      this.favoritesService.addFavorite(actor.id);
    } else {
      this.favoritesService.removeFavorite(actor.id);
    }
  }

  goToActorDetails(id: number): void {
    console.log('Navigating to actor details: ', id);
    this.router.navigate(['actor', id]).then(() => {
      window.location.reload();
    });
  }
}
