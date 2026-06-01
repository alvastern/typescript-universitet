import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Course } from '../../models/kurser-model';
import { KurserService } from '../../services/kurser-service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Ramschema } from '../../services/ramschema-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kurser',
  standalone: true,
  imports: [Header, CommonModule, FormsModule],
  templateUrl: './kurser.html',
  styleUrl: './kurser.scss'
})

export class Kurser {

  constructor(
  private courseService: KurserService,
  private ramschemaService: Ramschema,
  private cdr: ChangeDetectorRef
) {}

  courses: Course[] = [];

  searchTerm = '';
  selectedSubject = '';
  sortField = '';
  message = '';

  // Hämtar kurser när komponenten initieras
  ngOnInit() {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Funktion för att lägga till en kurs i ramschemat
  addCourse(course: Course) {
    this.ramschemaService.addCourse(course);

    // Meddelande som visas när en kurs läggs till
    this.message = `Kursen ${course.courseName} har lagts till i ditt ramschemat.`;
  }

  // Get för att filtrera kurser baserat på sökterm
  get filteredCourses() {
    return this.courses.filter(course => {
      const searchMatch =
        course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase());

      const subjectMatch =
        !this.selectedSubject ||
        course.subject === this.selectedSubject;

      return searchMatch && subjectMatch;
    });
  }

  // Get för att filtrera kurser baserat på ämne
  get subjects() {
    return [...new Set(
      this.courses.map(course => course.subject)
    )];
  }

  // Funktion för att sortera kurser baserat på valt fält
  sortCourses(field: string) {
    this.sortField = field;
    this.courses.sort((a: any, b: any) => {

      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;

      return 0;
    });
  }
}