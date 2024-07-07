import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private baseUrl = 'http://localhost/php-project_3/subject.php';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching subjects:', error);
          throw error; // Rethrow or handle as needed
        })
      );
  }
  
  addSubject(subjectData: any): Observable<any> {
    console.log('Adding subject:', subjectData);
    return this.http.post(`${this.baseUrl}`, subjectData)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding subject:', error);
          return throwError(error);
        })
      );
  }
  

  updateSubject(id: number, subjectName: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, { subject_name: subjectName });
  }

  deleteSubject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteSelectedSubjects(ids: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/deleteSelected`, { ids });
  }
}
