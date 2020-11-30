import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieIndexDbService } from '../shared/services/movie.indexdb.service';
import { MovieService } from '../shared/services/movie.service';
import { pathToRegexp, match, parse, compile } from 'path-to-regexp';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  title = 'test';
  searchText = '';
  allMoviesData = [];
  moviesData = [];
  routes = {
    get: [],
    put: [],
    post: [],
    delete: []
  };

  constructor(
    private mis: MovieIndexDbService,
    private ms: MovieService,
    private router: Router) { }

  ngOnInit(): void {
    console.log('logs')
    // this.getMovies();
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
    for (let i = 0; i < this.routes.get.length; i++) {
      const url = '/movie';
      const regexp = pathToRegexp(this.routes.get[i].path);
      const regexResult = regexp.exec(url);
      if (regexResult != null) {
        const matchExp = match(this.routes.get[i].path, { decode: decodeURIComponent });
        console.log('params>>', matchExp(url));
        
      }
      console.log('regexReult>>', regexResult);
    }
  }
  
  get baseUrl() {
    return environment.api;
  }

  getMovies(){
    this.ms.getAll().subscribe((movies: Array<Movie>) => {
      this.moviesData = movies;
    }, (error) => {
      console.log('unable to get movies');
    });
  }
  searchByTitle() {
    this.mis.getMoviesByTitle(this.searchText).then((movies: Array<Movie>) => {
      console.log('movies response>>', movies.length);
      this.moviesData = movies;
    }, (error) => {
      console.log('error>>', error);
    });
  }

  editMovie(movie){
    this.router.navigate(['/edit', movie.id]);
  }

  deleteMovie(movie){
    console.log('delete', movie);
    this.mis.remove(movie.id).then((val ) => {
      this.searchText = '';
      this.getMovies();
    }, (error) => {
      alert(error);
    });
  }

  addMovie(){
    this.router.navigate(['/add']);
  }
}
