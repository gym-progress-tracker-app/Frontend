import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { AboutExerciseComponent } from './about-exercise/about-exercise.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'user', component: UserComponent},
    {path: 'exercise', component: ExerciseComponent},
    {path: 'aboutexercise/:id', component: AboutExerciseComponent},
    
];
