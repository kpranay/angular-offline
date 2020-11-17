import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieIndexDbService } from '../shared/services/movie.indexdb.service';
import { MovieService } from '../shared/services/movie.service';

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
  constructor(
    private mis: MovieIndexDbService,
    private ms: MovieService,
    private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
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
