import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieIndexDbService } from './movie.indexdb.service';

@Injectable({
  providedIn: 'root'
})
export class IndexdbControllerService {

  constructor(
    private mis: MovieIndexDbService
  ) { }

  handleRequest(req: HttpRequest<any>) {
    const obs = new Observable((observer) => {
      (async () => {
        try {
          const movies = await this.mis.get100();
          observer.next(movies);
        } catch (e) {
          observer.error(e);
          observer.complete();
        }
      })();
    });
    return obs;
  }
}
