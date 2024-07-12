import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ExamService {

  private apiUrl = 'http://localhost/api/subject_exam.php';

  constructor(private http: HttpClient) { }

  getExam(subjectId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?subject_id=${subjectId}`, { withCredentials: true });
  }

  addExam(examData: any): Observable<any> {
    return this.http.post(this.apiUrl, examData, { withCredentials: true });
  }

  updateExam(id: number, examData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}?id=${id}`, examData, { withCredentials: true });
  }

  deleteExam(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`, { withCredentials: true });
  }
}
