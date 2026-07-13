import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-exercise',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './about-exercise.component.html',
  styleUrl: './about-exercise.component.css',
})
export class AboutExerciseComponent {
  @ViewChild('addProgressLogToggle') addProgressLogToggle?: ElementRef<HTMLButtonElement>;

  constructor(
    public api : ApiService,
    public builder : FormBuilder
  ) {}
  private readonly route = inject(ActivatedRoute, { optional: true });

  exerciseId: number | null = null;
  progressLogs: any[] = [];
  progressLogForm : any;
  addModeBool = false;
  errorMessage = '';

  ngOnInit() {
    const id = this.route?.snapshot.paramMap.get('id');
    this.exerciseId = id ? Number(id) : null;
    if (this.exerciseId !== null) {
      this.getProgressLogByExerciseId(this.exerciseId);
    }
    this.progressLogForm = this.builder.group({
      weight : [''],
      reps : [''],
      sets : [''],
      note : ['']
    });
  }

  addMode() {
    this.addModeBool = !this.addModeBool;
    this.progressLogForm.reset();
    this.errorMessage = '';
  }

  getProgressLogByExerciseId(id: number) {
    this.api.getProgressLogByExerciseId$(id).subscribe({
      next: (res: any) => {
        
        this.progressLogs = res.data;
        console.log(this.progressLogs);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  addProgressLog(data: any) {
    if (this.exerciseId === null) {
      return;
    }
    this.errorMessage = '';
    this.api.addProgressLog$({
      exercise_id: this.exerciseId,
      weight: data.weight,
      reps: data.reps,
      sets: data.sets,
      note: data.note,
    }).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getProgressLogByExerciseId(this.exerciseId!);
        if (this.addModeBool) {
          this.addProgressLogToggle?.nativeElement.click();
        }
        
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error?.errors
          ? Object.values(err.error.errors).flat().join(' ')
          : 'Hiba történt.';
      }
    })
  }

  deleteProgressLog(id: number) {
    this.api.deleteProgressLog$(id).subscribe({
      next: (res: any) => { 
        
        console.log(res);
        if (this.exerciseId !== null) {
          this.getProgressLogByExerciseId(this.exerciseId);
        } 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
