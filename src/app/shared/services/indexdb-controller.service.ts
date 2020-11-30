import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieIndexDbService } from './movie.indexdb.service';
import { pathToRegexp, match, parse, compile } from 'path-to-regexp';

@Injectable({
  providedIn: 'root'
})
export class IndexdbControllerService {

  routes = {
    get: [],
    put: [],
    post: [],
    delete: []
  };

  constructor(
    private mis: MovieIndexDbService
  ) {
    this.routes.get.push({
      path: '/movie', fn: async (observer) => {
        try {
          const movies = await this.mis.get100();
          observer.next(movies);
        } catch (e) {
          observer.error(e);
          observer.complete();
        }
      }
    });
    this.routes.get.push({
      path: '/movie/:id', fn: async (observer, req) => {
        try {
          const movies = this.mis.getMoviesById(1); // TODO: extract id
          observer.next(movies);
        } catch (e) {
          observer.error(e);
          observer.complete();
        }
      }
    });
    this.routes.get.push({
      path: '/movie/:id/test/:id2', fn: async (observer, req) => {
        try {
          const movies = this.mis.getMoviesById(1); // TODO: extract id
          observer.next(movies);
        } catch (e) {
          observer.error(e);
          observer.complete();
        }
      }
    });
  }

  get baseUrl() {
    return environment.api;
  }

  handleRequest(req: HttpRequest<any>) {
    const obs = new Observable((observer) => {
      const urlWithoutHost = req.url.split('${environment.api}')[1];
      if (req.method === 'GET') {
        for (let i = 0; i < this.routes.get.length; i++) {
          const regexp = pathToRegexp(this.routes.get[i].path);
          const regexResult = regexp.exec(urlWithoutHost);
          console.log('regexReult>>', regexResult);
          this.routes.get[i].fn(observer);
        }
      }
      // if (req.url === `${environment.api}/movie` && req.method === 'GET') {
      //   (async () => {
      //     try {
      //       const movies = await this.mis.get100();
      //       observer.next(movies);
      //     } catch (e) {
      //       observer.error(e);
      //       observer.complete();
      //     }
      //   })();
      // } else if (req.url === `${environment.api}/movie/:id` && req.method === 'GET') {// TODO: matching url
      //   (async () => {
      //     try {
      //       const movies = this.mis.getMoviesById(1); // TODO: extract id
      //       observer.next(movies);
      //     } catch (e) {
      //       observer.error(e);
      //       observer.complete();
      //     }
      //   })();
      // } else if (req.url === `${environment.api}/movie/:id/test/:id2` && req.method === 'GET') {// TODO: matching
      //   console.log('inside '); // TODO: extract id and id2
      // }
    });
    return obs;
  }
}
