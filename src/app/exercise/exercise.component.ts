import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exercise',
  imports: [RouterLink],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css',
})
export class ExerciseComponent {

  constructor(
    public api : ApiService
  ) {}

  exercises: any[] = [];

  ngOnInit() { 
    if (this.api.isLoggedIn()) {
      this.getExercises();
    }else {
      this.getExerciseWithoutLoggedIn();
    }
   }

  getExercises() {
    this.api.getExercises$().subscribe({
      next : (res : any) => {
        this.exercises = res.data
        // console.log(this.exercises)
      },
      error : (err) => {
        console.log(err)
        
      }
    })
  }


  getExerciseWithoutLoggedIn() {
    this.api.getExerciseWithoutLoggedIn$().subscribe({
      next : (res : any) => {
        this.exercises = res.data
        // console.log(this.exercises)
      },
      error : (err) => {
        console.log(err)
      }
    });
  }



}
