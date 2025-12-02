// frontend/src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { App } from './app';
import { CourseListComponent } from './components/course_list/course-list.component';

@NgModule({
  declarations: [
    App,
    CourseListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule // <-- Ditambahkan di sini
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }