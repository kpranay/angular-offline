import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DexieService } from './shared/services/dexie.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MoviesComponent } from './movies/movies.component';
import { NetworkStatusService } from './shared/services/networkStatus.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieCreateComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [NetworkStatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
