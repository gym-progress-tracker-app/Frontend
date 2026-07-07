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



  ngOnInit() {
  this.userForm = this.builder.group({
      email : [''],
      name : [''],
      password : [''],
      password_confirmation : ['']
    })
    this.errorMessage = ''
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

        if (!token) {
          this.errorMessage = 'Nem erkezett token a valaszban.'
          return
        }

        this.api.isLoggedIn.set(true)
        localStorage.setItem('token', token)
        this.registerMode = false
        this.userForm.reset()
        this.errorMessage = ''
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
        this.registerMode = false
        this.userForm.reset()
        this.errorMessage = ''
      },
      error : (err) => {
        console.log(err)
      }
    })
  }
}
