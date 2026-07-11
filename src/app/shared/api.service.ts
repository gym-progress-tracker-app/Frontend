import { Injectable, signal } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {} 

  isLoggedIn = signal(false)

  // user
  register$(data : any) {
    return this.http.post(environments.apiUrl + 'register', data)
  }

  login$(data : any) {
    return this.http.post(environments.apiUrl + 'login', data)
  }

  logout$() {
    return this.http.post(environments.apiUrl + 'logout', {}, {
      headers : {
        Authorization : 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  // exercises
  getExercises$() {
    return this.http.get(environments.apiUrl + 'exercises', {
      headers : {
        Authorization : 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  getExerciseWithoutLoggedIn$(){
    return this.http.get(environments.apiUrl + 'exercises-without-logged-in')
  }

  addExercise$(data : any) {
    return this.http.post(environments.apiUrl + 'exercises', data, {
      headers : {
        Authorization : 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  //progressLogs
  getProgressLogByExerciseId$(id : number) {
    return this.http.get(environments.apiUrl + 'progresslogs/' + id, {
      headers : {
        Authorization : 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  // categories
  getCategories$() {
    return this.http.get(environments.apiUrl + 'categories')
  }

}
