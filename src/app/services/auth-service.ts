import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from 'app/Models/iuser';
import { environment } from 'environments/environment.development';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private base = environment.baseUrl;
  private nextId!: number;
  private isUserLoggedInSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
    this.http.get<any>(`${this.base}/users?_sort=id&_order=desc&_limit=1`).subscribe((users) => {
      this.nextId = users.length > 0 ? users[0].id + 1 : 1;
      console.log('Next User ID:', this.nextId);
    });
  }
  signUp(user: Iuser) {
    return this.http.post<Iuser>(`${this.base}/users`, { ...user, id: this.nextId++ });
  }
  login() {
    this.isUserLoggedInSubject.next(true);
  }
  logout() {
    this.isUserLoggedInSubject.next(false);
  }
  isEmailUnique(email: string): Observable<boolean> {
    {
      return this.http
        .get<Iuser[]>(`${this.base}/users?email=${email}`)
        .pipe(map((users) => users.length === 0));
    }
  }

  getIsUserLogged(): Observable<boolean> {
    return this.isUserLoggedInSubject.asObservable();
  }
}
