import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get(`${environment.api}/movie`);
  }
  getById() {
    return this.http.get(`${environment.api}/movie/1`);
  }
  getById2() {
    return this.http.get(`${environment.api}/movie/1/test/2`);
  }
}
