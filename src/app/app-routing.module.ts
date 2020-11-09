import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MoviesComponent } from './movies/movies.component';


const routes: Routes = [
  {path: '', component: MoviesComponent },
  {path: 'add', component: MovieCreateComponent, data: { type: 'add'} , pathMatch: 'full'},
  {path: 'edit/:id', component: MovieCreateComponent, data: { type: 'edit'} },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
