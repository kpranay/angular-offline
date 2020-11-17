import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { uuid } from 'uuidv4';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {


  constructor(private httpClient: HttpClient, private router: Router) {
    this.redirectExpiredSessionOnly = this.redirectExpiredSessionOnly.bind(this);
  }

  // get baseUrl() {
  //   return environment.api;
  // }

  // get urlVersion() {
  //   return environment.apiVersion;
  // }

  // get nonSsoUrl() {
  //   return environment.nonSsoApi;
  // }

  get requestOptions() {
    return {
      headers: this.generateHeader({
        'Content-Type': 'application/json;charset=UTF-8',
      }),
    };
  }

  get requestOptionsNoType() {
    return {
      headers: this.generateHeader({}),
    };
  }

  generateHeader(params) {
    return new HttpHeaders({
      ...params
    });
  }

  // delete<T>(url, params?: HttpParams): Observable<T> {
  //   console.log('DELETE ' + url);
  //   return this.httpClient.delete<T>(`${this.baseUrl}/${this.urlVersion}${url}`, { ...this.requestOptions, params })
  //     .pipe(
  //       catchError(this.redirectExpiredSessionOnly),
  //     );
  // }

  // /**
  //  * @param url - relative path of the resourse
  //  * @param body - http request body for the POST request.
  //  */

  // post<T>(url, body, params?: HttpParams, emptyType?: boolean): Observable<T> {
  //   console.log('POST ' + url);
  //   return this.httpClient.post<T>(`${this.baseUrl}/${this.urlVersion}${url}`,
  //     body || {},
  //     { ...(emptyType ? this.requestOptionsNoType : this.requestOptions), params }
  //   )
  //     .pipe(
  //       catchError(this.redirectExpiredSessionOnly),
  //     );
  // }

  // nonssopost<T>(url, body, params?: HttpParams, emptyType?: boolean): Observable<T> {
  //   console.log('POST ' + url);
  //   return this.httpClient.post<T>(`${this.nonSsoUrl}/${this.urlVersion}${url}`,
  //     body || {},
  //     { ...(emptyType ? this.requestOptionsNoType : this.requestOptions), params }
  //   )
  //     .pipe(
  //       catchError(this.redirectExpiredSessionOnly),
  //     );
  // }

  // /**
  //  * @param url - relative path of the resourse
  //  * @param body - http request body for the PUT request.
  //  */

  // put<T>(url, body, params?: HttpParams): Observable<T> {
  //   console.log('PUT ' + url);
  //   return this.httpClient.put<T>(`${this.baseUrl}/${this.urlVersion}${url}`, body || {}, { ...this.requestOptions, params })
  //     .pipe(
  //       catchError(this.redirectExpiredSessionOnly),
  //     );
  // }

  /**
   * @param url - relative path of the resourse
   * @param errorHandlingOption - Consumer decides how errors are handled. See HttpErrorHandlingOptions enumeration for the options.
   */

  get<T>(url, params?: HttpParams): Observable<T> {
    console.log('GET ' + url);
    return this.httpClient.get<T>(`${url}`, { ...this.requestOptions, params })
      .pipe(
        catchError(this.redirectExpiredSessionOnly),
      );
  }

  /**
   * @param url - relative path of the resourse
   * @param errorHandlingOption - Consumer decides how errors are handled. See HttpErrorHandlingOptions enumeration for the options.
   */
  // getAsBlob(url, params?: HttpParams): Observable<any> {
  //   console.log('GET AS BLOB' + url);
  //   const headers = this.generateHeader({
  //     Accept: '*/*',
  //   });

  //   return this.httpClient.get(`${this.baseUrl}/${this.urlVersion}${url}`,
  //     {
  //       ...{
  //         headers,
  //         responseType: 'blob',
  //       },
  //       params
  //     }).pipe(
  //       catchError(this.redirectExpiredSessionOnly),
  //     );
  // }

  /**
   * @param errror - error response received from the api request
   * @returns empty Observable
   * @description This error handler will navigate the user to the login page if 401 error occurs.
   * If the error response has status code 401, then login page will tell user that their session has expired.
   * If the error response has any other status code, then Observable will throw an error, to let the consumer decide how to handle.
   */

  private redirectExpiredSessionOnly(error: Response | any) {
    console.error(error);
    if (error.status && error.status === 401) {
      this.router.navigateByUrl('/login');
      return throwError(error);
    } else {
      return throwError(error);
    }
  }

  handleError(err, defaultErrorMessage) {
    let errorMessage = defaultErrorMessage;
    if (err.error && err.error.message) {
      errorMessage = err.error.message;
    }
    // this.toastrService.error(errorMessage);
    return throwError(err);
  }

}
