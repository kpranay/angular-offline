import { Injectable } from '@angular/core';
import { DexieService } from './dexie.service';

export interface Movie {
  imdb_title_id: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  table: Dexie.Table<Movie, string>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('movie');
  }

  getMoviesByTitle(movieName) {
    return this.table.where('title').startsWithIgnoreCase(movieName).toArray();
  }

  get100() {
    return this.table.limit(100).toArray();
  }
  getAll() {
    return this.table.toArray();
  }

  add(data) {
    return this.table.add(data);
  }

  update(id, data) {
    return this.table.update(id, data);
  }

  remove(id) {
    return this.table.delete(id);
  }
}
