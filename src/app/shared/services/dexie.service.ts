import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DexieService extends Dexie {

  constructor() {
    super('imdbmovies');
    this.version(1.3).stores({
      movie: '++imdb_title_id,[title]',
    });

    this.version(2).stores({
      movie: '++imdb_title_id,[title]'
    }).upgrade(tx => {
        // Will only be executed if a version below 2 was installed.
        return (tx.table('movie') as any).modify(movie => {
          movie.imdb_title_id = +movie.imdb_title_id.split('tt')[1];
        });
    });
  //   this.version(3).stores({
  //     movie: '++imdb_title_id,[title]'
  // }).upgrade(tx => {
  //     // Will only be executed if a version below 2 was installed.
  //     return (tx.table('movie') as any).modify(movie => {
  //       // movie.imdb_title_id = +movie.imdb_title_id.split('tt')[1];
  //     });
  // });
  }
}
