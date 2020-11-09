import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss']
})
export class MovieCreateComponent implements OnInit {

  constructor(private fb: FormBuilder, private ms: MovieService, private router: Router, private route: ActivatedRoute) { }
  movieFG: FormGroup;
  isEdit = false;
  movieId: number;
  ngOnInit(): void {
    this.populateForm();
    this.route.data.subscribe(val => {
      console.log('route data :', val);
      if (val.type === 'edit') {
        this.isEdit = true;
        this.movieId = +this.route.snapshot.paramMap.get('id');
        this.ms.getMoviesById(this.movieId).then(
          (movieVal) => {
            if (movieVal) {
              this.populateFormWithMovie(movieVal);
            } else {
              alert('not able to find');
            }
          }, (error) => {
            console.log('Something went wrong when searching for  ' + movieId);
          }
        );
      }
    });
  }

  populateFormWithMovie(movieVal){
    this.movieFG.patchValue({
      actors: movieVal.actors,
      avg_vote: movieVal.avg_vote,
      budget: movieVal.budget,
      country: movieVal.country,
      date_published: movieVal.date_published,
      description: movieVal.description,
      director: movieVal.director,
      duration: movieVal.duration,
      genre: movieVal.genre,

      imdb_title_id: movieVal.imdb_title_id,
      language: movieVal.language,
      metascore: movieVal.metascore,
      original_title: movieVal.original_title,
      production_company: movieVal.production_company,
      reviews_from_critics: movieVal.reviews_from_critics,
      reviews_from_users: movieVal.reviews_from_users,
      title: movieVal.title,
      usa_gross_income: movieVal.usa_gross_income,
      votes: movieVal.votes,
      worlwide_gross_income: movieVal.worlwide_gross_income,
      writer: movieVal.writer,
      year: movieVal.year
    });
  }

  populateForm(){
      this.movieFG = this.fb.group({
        actors: ['', [Validators.required]],
        avg_vote: ['', [Validators.required]],
        budget: ['', [Validators.required]],
        country: ['', [Validators.required]],
        date_published: [],
        description: ['', [Validators.required]],
        director: ['', [Validators.required]],
        duration: ['', [Validators.required]],
        genre: [],

        imdb_title_id: [],
        language: ['', [Validators.required]],
        metascore: [],
        original_title: [],
        production_company: [],
        reviews_from_critics: [],
        reviews_from_users: [],
        title: ['', [Validators.required]],
        usa_gross_income: [],
        votes: [],
        worlwide_gross_income: [],
        writer: [],
        year: []
    });
  }
  createMovie(){
    if (this.movieFG.valid) {
      console.log(this.movieFG.value);
      this.ms.add(this.movieFG.value).then( (val) => {
        alert(this.movieFG.value.title + ' added successfully');
        this.router.navigate(['']);
      }, (error) => {
        alert(error);
      });
    } else {
      alert('fill all the fields');
    }
  }

  updateMovie() {
    this.ms.update(this.movieId, this.movieFG.value);
    this.router.navigate(['']);
  }
}
