import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHandlerService } from './http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  constructor(private http: HttpClient, private sh: HttpHandlerService) { }

  helloWorld(){
    // return this.http.get('http://localhost:3000/', { ...this.requestOptions});
    return this.sh.get('http://localhost:3000/');
  }

  helloWorldMovies(){
    // return this.http.get('http://localhost:3000/movies', { ...this.requestOptions});
    return this.sh.get('http://localhost:3000/movies');
  }

  get requestOptions() {
    return {
      headers: this.generateHeader({
        'Content-Type': 'application/json;charset=UTF-8',
      }),
    };
  }

  generateHeader(params) {
    return new HttpHeaders({
      ...params
    });
  }
}
