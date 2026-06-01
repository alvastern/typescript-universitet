import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { Ramschema as RamschemaService } from '../../services/ramschema-service';
import { Course } from '../../models/kurser-model';

@Component({
  selector: 'app-ramschema',
  standalone: true,
  imports: [Header, CommonModule],
  templateUrl: './ramschema.html',
  styleUrl: './ramschema.scss'
})

export class Ramschema {
  constructor(private ramschemaService: RamschemaService) {}

  courses: Course[] = [];

  message = '';

  ngOnInit() {
    this.courses = this.ramschemaService.getCourses();
  }

  // Funktion för att ta bort en kurs från ramschemat
  removeCourse(course: Course) {
    this.ramschemaService.removeCourse(course.courseCode);
    this.courses = this.ramschemaService.getCourses();

    // Meddelande som visas när en kurs tas bort
    this.message = `Kursen ${course.courseName} är borttagen från ramschemat`;
  }

  // Get för att beräkna den totala poängen i ramschemat
  get totalPoints() {
    return this.courses.reduce(
      (sum, course) => sum + course.points,
      0
    );
  }
}