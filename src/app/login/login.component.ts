import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  users = [
    { username: 'law', password: 'corazon' },
    { username: 'zoro', password: 'kuina' }
  ];

  constructor(private router: Router) {}

  login() {
    console.log('Intento login:', this.username, this.password);

    const validUser = this.users.find(
      u => u.username === this.username && u.password === this.password
    );

    if (validUser) {
      console.log('Login correcto');
      this.router.navigateByUrl('/dashboard');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
