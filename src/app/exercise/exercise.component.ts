import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ExerciseFilterPipe } from '../shared/pipes/exercise-filter-pipe';

@Component({
  selector: 'app-exercise',
  imports: [RouterLink, ReactiveFormsModule, ExerciseFilterPipe],
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
  errorMessage = '';
  exerciseNameFilter = '';
  exerciseCategoryFilter = '';
  availableExerciseCategories: string[] = [];


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
    this.errorMessage = '';
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

  onExerciseNameFilterChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.exerciseNameFilter = inputElement.value;
  }

  onExerciseCategoryFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.exerciseCategoryFilter = selectElement.value;
  }

  getExercises() {
    this.api.getExercises$().subscribe({
      next : (res : any) => {
        this.exercises = res.data
        this.updateAvailableExerciseCategories(this.exercises)
        console.log(this.exercises)
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
        this.updateAvailableExerciseCategories(this.exercises)
        console.log(this.exercises)
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
    this.errorMessage = '';
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
        this.errorMessage = err.error?.errors
          ? Object.values(err.error.errors).flat().join(' ')
          : 'Hiba történt.'
      }
    })
  }

  getOwnExercises() {
    this.api.getOwnExercises$().subscribe({
      next : (res : any) => {
        this.ownExerciseIds = res.data.map((item: any) => item.exercise_id)
        this.exercises = res.data.map((item: any) => item.exercise)
        this.updateAvailableExerciseCategories(this.exercises)
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

  removeOwnExercise(exerciseId: number) {
    this.api.removeOwnExercise$(exerciseId).subscribe({
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

  updateAvailableExerciseCategories(exercises: any[]) {
    this.availableExerciseCategories = [...new Set(
      exercises
        .map((exercise: any) => exercise?.category?.name ?? exercise?.category)
        .filter((categoryName: string | null | undefined) => !!categoryName)
    )];

    if (this.exerciseCategoryFilter && !this.availableExerciseCategories.includes(this.exerciseCategoryFilter)) {
      this.exerciseCategoryFilter = '';
    }
  }
}
