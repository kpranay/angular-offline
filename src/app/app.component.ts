import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test';
  moviesData = [];
  
  ngOnInit() {
    const request = window.indexedDB.open('imdbmovies', 13);

    request.onerror = (event: any) => {
      // Do something with request.errorCode!
      console.error('Database error: ' + event.target.errorCode);
    };
    request.onsuccess = (event: any) => {
      // Do something with request.result!
      const db = event.target.result;
      const transaction = db.transaction(['movie']);
      const objectStore = transaction.objectStore('movie');
      const movieRequest = objectStore.getAll();
      movieRequest.onerror = (event) => {
        // Handle errors!
      };
      movieRequest.onsuccess = (event) => {
        // Do something with the request.result!
        console.log('Data is >> ', movieRequest.result.length);
        this.moviesData = movieRequest.result.slice(0,100);
      };
    };
  }
}
