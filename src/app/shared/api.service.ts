import { Injectable, signal } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {} 

  isLoggedIn = signal(!!localStorage.getItem('token'))

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

  // ownexercises
  getOwnExercises$() {
    return this.http.get(environments.apiUrl + 'own-exercises', {  
    headers : {
        Authorization : 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  addOwnExercise$(data : any) {
    return this.http.post(environments.apiUrl + 'own-exercises', data, {
      headers : { 
        Authorization : 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  removeOwnExercise$(exerciseId : number) {
    return this.http.delete(environments.apiUrl + 'own-exercises/' + exerciseId, {
      headers : {
        Authorization : 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  countOwnExercises$() {
    return this.http.get(environments.apiUrl + 'own-exercises/count', {
      headers : {
        Authorization : 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  favoriteExercise$() {
    return this.http.get(environments.apiUrl + 'progresslogs/favorite/exercise', {
      headers : {
        Authorization : 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  countLoggedExercises$() {
    return this.http.get(environments.apiUrl + 'progresslogs/count', {
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

  addProgressLog$(data : any) {
    return this.http.post(environments.apiUrl + 'progresslogs', data, {
      headers : {
        Authorization : 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  deleteProgressLog$(id : number) {
    return this.http.delete(environments.apiUrl + 'progresslogs/' + id, {
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
