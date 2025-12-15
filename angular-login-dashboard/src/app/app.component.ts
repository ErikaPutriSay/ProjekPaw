// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule], // <-- Tambahkan di sini
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {}