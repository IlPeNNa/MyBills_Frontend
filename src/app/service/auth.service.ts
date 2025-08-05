import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private usernameSubject = new BehaviorSubject<string>(this.getStoredUsername());

  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  public username$ = this.usernameSubject.asObservable();

  constructor() {}

  private hasToken(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private getStoredUsername(): string {
    return localStorage.getItem('username') || '';
  }

  login(username: string, password: string): boolean {
    // Simulazione login - in produzione faresti una chiamata HTTP al backend
    if (username && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      
      this.isLoggedInSubject.next(true);
      this.usernameSubject.next(username);
      
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    
    this.isLoggedInSubject.next(false);
    this.usernameSubject.next('');
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getUsername(): string {
    return this.getStoredUsername();
  }
}
