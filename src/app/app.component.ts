import { Component, OnInit } from '@angular/core';
import { Movie, MovieIndexDbService } from './shared/services/movie.indexdb.service';
import { NetworkStatusService } from './shared/services/networkStatus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private networkService: NetworkStatusService) {

  }

  ngOnInit() {
    this.networkService.status.subscribe(status => {
      console.log('IS online', status);
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

  /*searchByTitle() {
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

  editMovie(movie){
    console.log('edit', movie);
  }

  deleteMovie(movie){
    console.log('delete', movie);
    this.ms.add({
      actors: "prabhas",
      director: "SSR",
      duration: 60,
      genre: "Drama",
      id: 99999,
      imdb_title_id: "tt101",
      title: "Bahubali 1",
      writer: "SSR",
      year: 2016
    }).then((d => console.log('movie added :::', d)),(error => console.log('error',error)));
    console.log(movie.id);
    // this.ms.remove(99999).then(r => console.log('deleted :: ', r));
  }*/
}
