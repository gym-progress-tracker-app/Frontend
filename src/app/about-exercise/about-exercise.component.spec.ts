import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutExerciseComponent } from './about-exercise.component';

describe('AboutExerciseComponent', () => {
  let component: AboutExerciseComponent;
  let fixture: ComponentFixture<AboutExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutExerciseComponent]
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
