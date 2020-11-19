import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieIndexDbService } from './movie.indexdb.service';

@Injectable({
  providedIn: 'root'
})
export class IndexdbControllerService {

  constructor(
    private mis: MovieIndexDbService
  ) { }

  get baseUrl() {
    return environment.api;
  }

  handleRequest(req: HttpRequest<any>) {
    const obs = new Observable((observer) => {
      if (req.url === `${environment.api}/movie` && req.method === 'GET') {
        (async () => {
          try {
            const movies = await this.mis.get100();
            observer.next(movies);
          } catch (e) {
            observer.error(e);
            observer.complete();
          }
        })();
      } else if (req.url === `${environment.api}/movie/:id` && req.method === 'GET') {// TODO: matching url
        (async () => {
          try {
            const movies = this.mis.getMoviesById(1); // TODO: extract id
            observer.next(movies);
          } catch (e) {
            observer.error(e);
            observer.complete();
          }
        })();
      } else if (req.url === `${environment.api}/movie/:id/test/:id2` && req.method === 'GET') {// TODO: matching
        console.log('inside '); // TODO: extract id and id2
      }
    });
    return obs;
  }
}
