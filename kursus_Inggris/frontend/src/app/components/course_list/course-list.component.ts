import { Component } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {
  courses = [] as any[];

  constructor() {
    // placeholder data for development
    this.courses = [
      { id: 1, title: 'Basic English', description: 'Introduction to English' },
      { id: 2, title: 'Intermediate English', description: 'Grammar and conversation' }
    ];
  }
}
