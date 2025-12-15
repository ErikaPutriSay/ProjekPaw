import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.services';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './Login.component.html',
  imports: [FormsModule]
})
export class LoginComponent {
  username = 'admin';
  password = 'admin';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Username atau password salah';
    }
  }
}
