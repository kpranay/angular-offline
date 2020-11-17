import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DummyService } from '../shared/services/dummy.service';
import { Movie, MovieService } from '../shared/services/movie.service';

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
  constructor(private ms: MovieService, private router: Router, private dummy: DummyService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(){
    this.ms.get100().then((movies: Array<Movie>) => {
      this.moviesData = movies;
    });
  }
  searchByTitle() {
    this.ms.getMoviesByTitle(this.searchText).then((movies: Array<Movie>) => {
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
    this.ms.remove(movie.id).then((val ) => {
      this.searchText = '';
      this.getMovies();
    }, (error) => {
      alert(error);
    });
  }

  addMovie(){
    // this.router.navigate(['/add']);
    console.log('Add movies');
    this.dummy.helloWorld()
      .subscribe(val => {
        console.log(val);
      }, err => {
        console.log('error');
        console.log(err);
      });
    this.dummy.helloWorldMovies()
      .subscribe(arg => console.log(arg));
  }
}
