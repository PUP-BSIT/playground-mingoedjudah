import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoginService {
  private loginUrl = 'http://localhost/php-project/login.php';
  //private loginUrl = 'https://grademate.tech/api/login.php';
  
  constructor(private http: HttpClient) {}
  
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token); // Store token in localStorage
        }
      })
    );
  }
}
