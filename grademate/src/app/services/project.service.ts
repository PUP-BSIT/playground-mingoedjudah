import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost/api/subject_project.php';

  constructor(private http: HttpClient) { }

  getProject(subjectId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?subject_id=${subjectId}`, { withCredentials: true });
  }

  addProject(projectData: any): Observable<any> {
    return this.http.post(this.apiUrl, projectData, { withCredentials: true });
  }

  updateProject(id: number, projectData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}?id=${id}`, projectData, { withCredentials: true });
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`, { withCredentials: true });
  }
}
