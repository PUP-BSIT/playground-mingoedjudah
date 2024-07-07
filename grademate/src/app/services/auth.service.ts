import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private userId: number | null = null;
  private token: string | null = null;
  private userSubject = new BehaviorSubject<number | null>(this.userId);

  user$ = this.userSubject.asObservable();

  constructor() {
    this.initializeUserId();
    this.initializeToken();
  }

  private initializeUserId(): void {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
      this.userSubject.next(this.userId);
    }
  }

  private initializeToken(): void {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.token = storedToken;
    }
  }

  setUserId(userId: number): void {
    this.userId = userId;
    localStorage.setItem('user_id', userId.toString());
    this.userSubject.next(userId);
  }

  getUserId(): number | null {
    return this.userId;
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  clearUserId(): void {
    this.userId = null;
    localStorage.removeItem('user_id');
    this.userSubject.next(null);
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  logout() {
    this.clearUserId();
    this.clearToken();
  }
}
