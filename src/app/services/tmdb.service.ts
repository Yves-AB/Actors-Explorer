import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTkyYjk3ZDM4NmIzOTA1ODkwNmQ0ZjlmZmQwMmNjNCIsInN1YiI6IjY2Mjk4M2I2MjU4ODIzMDE2NDkyOTBjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6dKMTiKqZ0lDIocJsqUKww9vo6n8H6Ep8I2NTRH_vC0';

  constructor(private http: HttpClient) {}

  searchActors(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`
    });

    const url = 'https://api.themoviedb.org/3/search/person?query='+query+'&include_adult=false&language=en-US&page=1';
    return this.http.get(url, { headers });
  }

  getActorMovies(actorId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`
    });
    const url = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?language=en-US`;
    return this.http.get(url, { headers });
  }

  getActorDetails(actorId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`
    });
    const url = `https://api.themoviedb.org/3/person/${actorId}?api_key=${this.apiKey}&append_to_response=credits`;
    return this.http.get(url, { headers });
  }
  


  
}

