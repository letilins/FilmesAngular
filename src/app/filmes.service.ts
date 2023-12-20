import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filmes } from './Filmes';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class FilmesService {
  url = "http://localhost:5155/api/filmes"

  constructor(private http: HttpClient) {}

  PegarTodos(): Observable<Filmes[]> {
    return this.http.get<Filmes[]>(this.url);
  }

  PegarPeloId(FilmesId: number): Observable<Filmes> {
    const apiUrl = `${this.url}/${FilmesId}`;
    return this.http.get<Filmes>(apiUrl);
  }

  SalvarFilmes(filmes: Filmes): Observable<any> {
    return this.http.post<Filmes>(this.url, filmes, httpOptions);
  }

  AtualizarFilmes(filmes: Filmes): Observable<any> {
    return this.http.put<Filmes>(this.url, filmes, httpOptions);
  }

  ExcluirFilmes(FilmesId: number): Observable<any> {
    const apiUrl = `${this.url}/${FilmesId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
