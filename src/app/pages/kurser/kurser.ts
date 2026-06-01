import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Course } from '../../models/kurser-model';
import { KurserService } from '../../services/kurser-service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Ramschema } from '../../services/ramschema-service';

@Component({
  selector: 'app-kurser',
  standalone: true,
  imports: [Header, CommonModule],
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
  }
}