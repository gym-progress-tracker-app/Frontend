import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { AboutExerciseComponent } from './about-exercise.component';

describe('AboutExerciseComponent', () => {
  let component: AboutExerciseComponent;
  let fixture: ComponentFixture<AboutExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutExerciseComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
