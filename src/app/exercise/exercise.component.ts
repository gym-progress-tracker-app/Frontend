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
  ownExerciseIds: number[] = [];
  categories: any[] = [];
  exerciseForm : any;
  addModeBool = false;
  ownExercises = false;


  ngOnInit() { 
    if (this.api.isLoggedIn()) {
      this.loadOwnExerciseIds();
      if(this.ownExercises){
        this.getOwnExercises();
      }else{
        this.getExercises();
      }
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

  onExerciseFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.ownExercises = selectElement.value === 'own';

    if (this.ownExercises) {
      this.getOwnExercises();
      return;
    }

    this.getExercises();
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

  loadOwnExerciseIds() {
    this.api.getOwnExercises$().subscribe({
      next : (res : any) => {
        this.ownExerciseIds = res.data.map((item: any) => item.exercise_id)
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
        this.ownExercises ? this.getOwnExercises() : this.getExercises();
        if (this.addModeBool) {
          this.addExerciseToggle?.nativeElement.click();
        }
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

  getOwnExercises() {
    this.api.getOwnExercises$().subscribe({
      next : (res : any) => {
        this.ownExerciseIds = res.data.map((item: any) => item.exercise_id)
        this.exercises = res.data.map((item: any) => item.exercise)
        // console.log(this.exercises)
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

  addOwnExercise(data : any) {
    this.api.addOwnExercise$(data).subscribe({
      next : (res : any) => {
        console.log(res)
        this.loadOwnExerciseIds();
        this.ownExercises ? this.getOwnExercises() : this.getExercises();
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

  isOwnExercise(exerciseId: number) {
    return this.ownExerciseIds.includes(exerciseId);
  }



}
