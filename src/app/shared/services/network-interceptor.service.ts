import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IndexdbControllerService } from './indexdb-controller.service';
import { NetworkStatusService } from './networkStatus.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkInterceptorService implements HttpInterceptor {

  constructor(
    private ns: NetworkStatusService,
    private ic: IndexdbControllerService
  ) { }

  
  get baseUrl() {
    return environment.api;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isOnline = this.ns.isOnline();
    if (isOnline) {
      return next.handle(req);
    } else {
      return this.ic.handleRequest(req)
      .pipe(
        switchMap((data: any) => {
          return of(new HttpResponse({ status: 200, body: data }));
        })
      );
    }
  }

}
