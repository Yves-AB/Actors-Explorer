import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private baseUrl = `${environment.tmdbBaseUrl}/search/person`;
  private apiKey = `?api_key=${environment.tmdbApiKey}`;

  constructor(private http: HttpClient) {}

  searchActors(query: string) {
    return this.http.get(`${this.baseUrl}${this.apiKey}&query=${query}&include_adult=false&language=en-US&page=1`);
  }

  getActorMovies(actorId: number) {
    return this.http.get(`${environment.tmdbBaseUrl}/person/${actorId}/movie_credits${this.apiKey}&language=en-US`);
  }
}
