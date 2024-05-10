import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-actor-movies',
    standalone: true,
    templateUrl: './actor-details.component.html',
    styleUrls: ['./actor-details.component.css'],
    imports: [CommonModule, NavbarComponent]
})
export class ActorDetailsComponent implements OnInit {
  allMovies: any[] = []; // Stores all fetched movies
  movies: any[] = []; // Stores movies for the current page
  actorId!: number;
  currentPage: number = 1;
  pageSize: number = 9; // Number of items per page

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.actorId = +params['id'];
      this.loadMovies(this.actorId);
    });
  }

  loadMovies(actorId: number): void {
    this.tmdbService.getActorMovies(actorId).subscribe({
      next: (response) => {
        this.allMovies = response.cast;
        this.updatePage(1); // Start from the first page
      },
      error: (error) => console.error('Error fetching movies: ', error)
    });
  }

  updatePage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.movies = this.allMovies.slice(startIndex, endIndex);
  }

  nextPage() {
    if ((this.currentPage * this.pageSize) < this.allMovies.length) {
      this.updatePage(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.updatePage(this.currentPage - 1);
    }
  }

  //to get the rating /5 we use a basic mathematic formula
  normalizeRating(popularity: number): number {
    const maxPopularity = 100; // Adjust based on your observations
    return (popularity / maxPopularity) * 5;
  }

}
