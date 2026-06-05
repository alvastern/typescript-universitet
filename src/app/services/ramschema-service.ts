import { Injectable } from '@angular/core';
import { Course } from '../models/kurser-model';

@Injectable({
  providedIn: 'root'
})

export class Ramschema {

  // Nyckel för local storage
  private key = 'ramschema';

  // Funktion för att hämta kurser från local storage
  getCourses(): Course[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  // Funktion för att spara kurser i local storage
  saveCourses(courses: Course[]) {
    localStorage.setItem(this.key, JSON.stringify(courses));
  }

  // Funktion för att lägga till kurser i local storage
  addCourse(course: Course): boolean {
    const courses = this.getCourses();

    if (courses.some(c => c.courseCode === course.courseCode)) {
      return false;
    }

    courses.push(course);
    this.saveCourses(courses);
    return true;
  }

  // Funktionn för att ta bort kurser från local storage
  removeCourse(courseCode: string) {
    const courses = this.getCourses()
      .filter(c => c.courseCode !== courseCode);

    this.saveCourses(courses);
  }
}