import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Course } from '../../models/kurser-model';
import { KurserService } from '../../services/kurser-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kurser',
  standalone: true,
  imports: [Header, CommonModule],
  templateUrl: './kurser.html',
  styleUrl: './kurser.scss'
})

export class Kurser {

  constructor(private courseService: KurserService) {}

  courses: Course[] = [];

  // Hämtar kurser när komponenten initieras
  ngOnInit() {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }
}