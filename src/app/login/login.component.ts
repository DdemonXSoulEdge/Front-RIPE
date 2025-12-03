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
    { username: 'law',  passwordHash: '7d3ea98b27659b2f45f9a1ab6f6b5bbec1a2bb8f1a77a22fce6473f1d7226c97' }, 
    { username: 'zoro', passwordHash: 'f2f98ee8f06c7e75bfe9a1e4a2d48ce2af2bff8d5c9c5b1df8b93bb5c0a8f6c5' }
  ];

  constructor(private router: Router) {}

  async login() {

    const inputHash = await this.hashPassword(this.password);

    const validUser = this.users.find(
      u =>
        u.username === this.username &&
        u.passwordHash === inputHash
    );

    if (validUser) {
      console.log('Login correcto (password protegida)');
      this.router.navigateByUrl('/dashboard');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
