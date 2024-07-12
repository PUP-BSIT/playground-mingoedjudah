import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class QuizService {
  private apiUrl = 'http://localhost/api/subject_quiz.php';

  constructor(private http: HttpClient) { }

  getQuizzes(subjectId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?subject_id=${subjectId}`, { withCredentials: true });
  }

  addQuiz(quizData: any): Observable<any> {
    const { score, total, ...payload } = quizData; // Destructure score and total
    return this.http.post(this.apiUrl, { ...payload, score, total }, { withCredentials: true });
  }

  updateQuiz(id: number, quizData: any): Observable<any> {
    const { score, total, ...payload } = quizData; // Destructure score and total
    return this.http.put(`${this.apiUrl}?id=${id}`, { ...payload, score, total }, { withCredentials: true });
  }

  deleteQuiz(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`, { withCredentials: true });
  }
}
