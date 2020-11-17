import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DexieService } from './shared/services/dexie.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MoviesComponent } from './movies/movies.component';
import { NetworkStatusService } from './shared/services/networkStatus.service';
import { NetworkInterceptorService } from './shared/services/network-interceptor.service';

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
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptorService, multi: true },
    NetworkStatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
