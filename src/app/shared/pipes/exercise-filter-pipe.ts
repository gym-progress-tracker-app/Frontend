import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exerciseFilter',
  standalone: true
})
export class ExerciseFilterPipe implements PipeTransform {

  transform(exercises: any[] | null, searchTerm = '', selectedCategory = ''): any[] {
    if (!Array.isArray(exercises)) {
      return [];
    }

    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const normalizedCategory = selectedCategory.trim().toLowerCase();

    return exercises.filter((exercise) => {
      const exerciseName = exercise?.name?.toLowerCase?.() ?? '';
      const categoryName = exercise?.category?.name?.toLowerCase?.() ?? exercise?.category?.toLowerCase?.() ?? '';
      const matchesName = !normalizedSearchTerm || exerciseName.includes(normalizedSearchTerm);
      const matchesCategory = !normalizedCategory || categoryName === normalizedCategory;

      return matchesName && matchesCategory;
    });
  }

}
