import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(
    private builder : FormBuilder,
    private api : ApiService
  ) {}

  registerMode = false;
  userForm : any;
  errorMessage :any;

  ownExercisesCount : any;
  favoriteExerciseName : any;
  logCount : any;
  username : any;




  ngOnInit() {
  this.userForm = this.builder.group({
      email : [''],
      name : [''],
      password : [''],
      password_confirmation : ['']
    })
    this.errorMessage = ''

    if (this.isLoggedIn()) {
      this.username = this.getStoredUsername();
      this.loadDashboard();
    }


  }

  isLoggedIn() {
    return this.api.isLoggedIn();
  }

  submit(){
    if (this.registerMode) {
      this.register();
    } else {
      this.login();
    }
  }

  register() {
    this.api.register$(this.userForm.value).subscribe({
      next : (res :any) => {
        console.log(res)
        this.registerMode = false
        this.userForm.reset()
        this.errorMessage = ''
      },
      error : (err) => {
        this.errorMessage = err.error?.errors
          ? Object.values(err.error.errors).flat().join(' ')
          : 'Hiba történt.'
      }
    })
  }

  login() {
    this.api.login$(this.userForm.value).subscribe({
      next : (res :any) => {
        console.log(res)
        const token = res?.data?.token
        const user = res?.data?.user

        if (!token) {
          this.errorMessage = 'Nem erkezett token a valaszban.'
          return
        }

        this.api.isLoggedIn.set(true)
        localStorage.setItem('token', token)
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.username = user.name || ''
        }
        this.registerMode = false
        this.userForm.reset()
        this.errorMessage = ''
        this.loadDashboard()
      },
      error : (err) => {
        console.log(err)
        this.errorMessage = err.error?.errors          
        ? Object.values(err.error.errors).flat().join(' ')
          : 'Invalid email or password!'
      }
    })
  }

  logout() {
    this.api.logout$().subscribe({
      next : (res :any) => {
        console.log(res)
        this.api.isLoggedIn.set(false)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.registerMode = false
        this.userForm.reset()
        this.errorMessage = ''
        this.username = ''
        this.ownExercisesCount = undefined
        this.favoriteExerciseName = undefined
        this.logCount = undefined
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

  // dashboard

  countOwnExercises() {
    this.api.countOwnExercises$().subscribe({
      next : (res :any) => {
        this.ownExercisesCount = res?.data?.count
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

  favoriteExercise() {
    this.api.favoriteExercise$().subscribe({
      next : (res :any) => {
        this.favoriteExerciseName = res?.data
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

  countLoggedExercises() {
    this.api.countLoggedExercises$().subscribe({
      next : (res :any) => {
        this.logCount = res?.data?.count
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

  loadDashboard() {
    this.countOwnExercises()
    this.favoriteExercise()
    this.countLoggedExercises()
  }

  getStoredUsername() {
    const storedUser = localStorage.getItem('user')

    if (!storedUser) {
      return ''
    }

    try {
      return JSON.parse(storedUser)?.name || ''
    } catch {
      return ''
    }
  }


}
