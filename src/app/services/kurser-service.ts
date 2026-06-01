import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/kurser-model';

@Injectable({
  providedIn: 'root'
})
export class KurserService {

  constructor(private http: HttpClient) {}

  // Funktion för att hämta kurser från JSON-filen
  getCourses() {
    return this.http.get<Course[]>('/miun-courses.json');
  }
}
