import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from './shared/services/movie.service';
import { NetworkStatusService } from './shared/services/networkStatus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test';
  searchText = '';
  allMoviesData = [];
  moviesData = [];
  constructor(private ms: MovieService, private networkService: NetworkStatusService) {
  }

  ngOnInit() {
    this.networkService.status.subscribe(status => {
      console.log('IS online', status);
    });
    // console.log('internet Connection>>> ', this.noInternetConnection);
    this.ms.get100().then((movies: Array<Movie>) => {
      this.moviesData = movies;
    });
    // setTimeout(() => this.ms.getAll().then((movies: Array<Movie>) => {
    //   this.allMoviesData = movies;
    // }), 100);
    // this.ms.getMoviesByTitle('Miss').then((movies: Array<Movie>) => {
    //   console.log('Miss movies>>', movies);
    // }, (error) => {
    //   console.log('error>>', error);
    // });
    // const request = window.indexedDB.open('imdbmovies', 20);
    // request.onerror = (event: any) => {
    //   // Do something with request.errorCode!
    //   console.error('Database error: ' + event.target.errorCode);
    // };
    // request.onsuccess = (event: any) => {
    //   // Do something with request.result!
    //   const db = event.target.result;
    //   const transaction = db.transaction(['movie']);
    //   const objectStore = transaction.objectStore('movie');
    //   const movieRequest = objectStore.getAll();
    //   movieRequest.onerror = (event) => {
    //     // Handle errors!
    //   };
    //   movieRequest.onsuccess = (event) => {
    //     // Do something with the request.result!
    //     console.log('Data is >> ', movieRequest.result[0]);
    //     this.moviesData = movieRequest.result.slice(0,100);
    //   };
    // };
  }

  searchByTitle() {
    this.ms.getMoviesByTitle(this.searchText).then((movies: Array<Movie>) => {
      console.log('movies response>>', movies.length);
      this.moviesData = movies;
    }, (error) => {
      console.log('error>>', error);
    });
    // if (!this.searchText) {
    //   this.moviesData = this.allMoviesData.slice(0, 100);
    // } else {
    //   const filteredMovies = [];
    //   for (const m of this.allMoviesData) {
    //     if (('' + m.title).toLowerCase().includes(this.searchText.toLowerCase())) {
    //       filteredMovies.push(m);
    //     }
    //     if (filteredMovies.length === 100) {
    //       break;
    //     }
    //   }
    //   this.moviesData = filteredMovies;
    // }
    // this.ms.getAll().then((movies: Array<Movie>) => {
    //   if (!this.searchText) {
    //     this.moviesData = movies.slice(0, 100);
    //   } else {
    //     const filteredMovies = [];
    //     for (const m of movies) {
    //       if (('' + m.title).toLowerCase().includes(this.searchText.toLowerCase())) {
    //         filteredMovies.push(m);
    //       }
    //       if (filteredMovies.length === 100) {
    //         break;
    //       }
    //     }
    //     this.moviesData = filteredMovies;
    //   }
    // });
  }
}
