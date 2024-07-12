import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ExerciseService {

  private apiUrl = 'http://localhost/api/subject_exercise.php';

  constructor(private http: HttpClient) { }

  getExercise(subjectId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?subject_id=${subjectId}`, { withCredentials: true });
  }

  addExercise(exerciseData: any): Observable<any> {
    return this.http.post(this.apiUrl, exerciseData, { withCredentials: true });
  }

  updateExercise(id: number, exerciseData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}?id=${id}`, exerciseData, { withCredentials: true });
  }

  deleteExercise(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`, { withCredentials: true });
  }
}
