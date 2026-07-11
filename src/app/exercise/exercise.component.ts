import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-exercise',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css',
})
export class ExerciseComponent {
  @ViewChild('addExerciseToggle') addExerciseToggle?: ElementRef<HTMLButtonElement>;

  constructor(
    public api : ApiService,
    public builder : FormBuilder
  ) {}

  exercises: any[] = [];
  categories: any[] = [];
  exerciseForm : any;
  addModeBool = false;


  ngOnInit() { 
    if (this.api.isLoggedIn()) {
      this.getExercises();
    }else {
      this.getExerciseWithoutLoggedIn();
    }
    this.exerciseForm = this.builder.group({
      name : [''],
      category : [''],
      description : ['']
      
    });

    this.getCategories();
   }
   
   addMode() {
    this.addModeBool = !this.addModeBool;
    this.exerciseForm.reset();
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

  getCategories() {
    this.api.getCategories$().subscribe({
      next : (res : any) => {
        this.categories = res.data
        // console.log(this.categories)
      },
      error : (err) => {
        console.log(err)
      }
    })
  }


  addExercise(data : any) {
    this.api.addExercise$(data).subscribe({
      next : (res : any) => {
        console.log(res)
        this.getExercises();
        if (this.addModeBool) {
          this.addExerciseToggle?.nativeElement.click();
        }
      },
      error : (err) => {
        console.log(err)
      }
    })
  }



}
