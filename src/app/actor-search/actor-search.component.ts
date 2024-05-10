import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";

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

  constructor(private route: ActivatedRoute, private tmdbService: TmdbService, private router: Router) {}

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
        console.log('Actors found: ', response);
        this.actors = response.results;
      },
      error: (error) => {
        console.error('Error fetching actors: ', error);
      },
      complete: () => {
        console.log('Actor fetch complete');
      }
    });
  }

  goToActorDetails(id: number): void {
    console.log('Navigating to actor details: ', id);
    this.router.navigate(['actor', id]).then(() => {
      window.location.reload();
    });
  }
}
