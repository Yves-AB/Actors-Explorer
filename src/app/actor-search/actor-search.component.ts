import { Component, OnInit } from '@angular/core';
import { ActorService } from '../services/tmdb.service';
@Component({
  selector: 'app-actor-search',
  templateUrl: './actor-search.component.html',
  styleUrls: ['./actor-search.component.css']
})
export class ActorSearchComponent implements OnInit {
  actors: any[] = [];
  searchTerm: string = '';

  constructor(private actorService: ActorService) {}

  ngOnInit(): void {
  }

  search(): void {
    if (this.searchTerm) {
      this.actorService.searchActors(this.searchTerm).subscribe({
        next: (response: any) => {
          this.actors = response.results;
        },
        error: (err) => console.error('Error fetching actors:', err)
      });
    }
  }
}
