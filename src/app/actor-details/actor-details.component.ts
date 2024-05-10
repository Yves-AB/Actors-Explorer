import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-actor-movies',
  standalone: true,
  imports: [CommonModule],
templateUrl: './actor-details.component.html',
styleUrl: './actor-details.component.css'
})

export class ActorDetailsComponent implements OnInit {
  movies: any[] = [];
  actorId!: number;
  currentPage: number = 1;

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.actorId = params['id'];
      this.loadMovies(this.actorId, this.currentPage);
    });
  }

  loadMovies(actorId: number, page: number): void {
    this.tmdbService.getActorMovies(actorId).subscribe({
      next: (response) => {
        console.log('Movies found: ', response);
        this.movies = response.cast;
        // Implement pagination logic here based on response and the required 3x3 format
      },
      error: (error) => console.error('Error fetching movies: ', error)
    });
  }

  // Pagination methods
  nextPage() {
    this.currentPage++;
    this.loadMovies(this.actorId, this.currentPage);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMovies(this.actorId, this.currentPage);
    }
  }
}


