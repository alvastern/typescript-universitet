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

  ngOnInit() {
    this.courses = this.ramschemaService.getCourses();
  }

  // Funktion för att ta bort en kurs från ramschemat
  removeCourse(courseCode: string) {
    this.ramschemaService.removeCourse(courseCode);
    this.courses = this.ramschemaService.getCourses();
  }

  // Get för att beräkna den totala poängen i ramschemat
  get totalPoints() {
    return this.courses.reduce(
      (sum, course) => sum + course.points,
      0
    );
  }
}
