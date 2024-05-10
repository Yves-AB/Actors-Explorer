import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private baseUrl = `$https://api.themoviedb.org/3/search/person`;
  private apiKey = `?api_key=${'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTkyYjk3ZDM4NmIzOTA1ODkwNmQ0ZjlmZmQwMmNjNCIsInN1YiI6IjY2Mjk4M2I2MjU4ODIzMDE2NDkyOTBjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6dKMTiKqZ0lDIocJsqUKww9vo6n8H6Ep8I2NTRH_vC0'}`;

  constructor(private http: HttpClient) {}

  searchActors(query: string) {
    return this.http.get(`${this.baseUrl}${this.apiKey}&query=${query}&include_adult=false&language=en-US&page=1`);
  }

  getActorMovies(actorId: number) {
    return this.http.get(`$https://api.themoviedb.org/3/person/${actorId}/movie_credits${this.apiKey}&language=en-US`);
  }
}
