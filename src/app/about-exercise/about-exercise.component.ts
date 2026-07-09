import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-about-exercise',
  imports: [RouterLink],
  templateUrl: './about-exercise.component.html',
  styleUrl: './about-exercise.component.css',
})
export class AboutExerciseComponent {
  constructor(
    public api : ApiService
  ) {}
  private readonly route = inject(ActivatedRoute, { optional: true });

  exerciseId: number | null = null;
  progressLogs: any[] = [];

  ngOnInit() {
    const id = this.route?.snapshot.paramMap.get('id');
    this.exerciseId = id ? Number(id) : null;
    if (this.exerciseId !== null) {
      this.getProgressLogByExerciseId(this.exerciseId);
    }
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


}
