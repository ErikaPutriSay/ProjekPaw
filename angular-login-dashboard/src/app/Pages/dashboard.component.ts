import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../Layout/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [NavbarComponent, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {}
