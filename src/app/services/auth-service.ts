import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from 'app/Models/iuser';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private base = environment.baseUrl;
  private external = environment.externalUrl;
  private readonly TOKEN_KEY = 'accessToken';

  private isUserLoggedInSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isUserLoggedInSubject = new BehaviorSubject<boolean>(!!this.getToken());
  }
  async signUp(user: Iuser): Promise<AuthResult> {
    try {
      let uniqueEmail, uniqueUsername;
      uniqueEmail = await firstValueFrom(this.isEmailUnique(user.email));
      uniqueUsername = await firstValueFrom(this.isUsernameUnique(user.username));
      if (!uniqueEmail || !uniqueUsername) {
        throw new Error('Username or Email is duplicate');
      }
      await firstValueFrom(this.http.post<Iuser>(`${this.base}/users`, user));
      let loginRequest = { username: user.username, password: user.password };
      await this.login(loginRequest);
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  async login(user: LoginRequest): Promise<AuthResult> {
    try {
      const users = await firstValueFrom(
        this.http.get<Iuser[]>(
          `${this.base}/users?username=${user.username}&password=${user.password}`
        )
      );

      if (users.length === 0) {
        throw new Error('Invalid username or password');
      }

      const loginRes = await firstValueFrom(
        this.http.post<{ accessToken: string }>(`${this.external}/auth/login`, {
          username: 'emilys', // <-- use actual user credentials
          password: 'emilyspass',
        })
      );

      localStorage.setItem(this.TOKEN_KEY, loginRes.accessToken);
      this.isUserLoggedInSubject.next(true);

      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);

    this.isUserLoggedInSubject.next(false);
  }
  isEmailUnique(email: string): Observable<boolean> {
    {
      return this.http
        .get<Iuser[]>(`${this.base}/users?email=${email}`)
        .pipe(map((users) => users.length === 0));
    }
  }
  isUsernameUnique(username: string): Observable<boolean> {
    {
      return this.http
        .get<Iuser[]>(`${this.base}/users?username=${username}`)
        .pipe(map((users) => users.length === 0));
    }
  }

  getIsUserLogged(): Observable<boolean> {
    return this.isUserLoggedInSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
