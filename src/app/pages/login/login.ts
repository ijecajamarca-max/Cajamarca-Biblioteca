import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {
  correo = '';
  password = '';
  mensaje = '';
  constructor(private router: Router) {}
  iniciarSesion(): void {
    if (this.correo === 'ije.cajamarca@yavirac.edu.ec' &&
        this.password === '123456') {
      this.router.navigate(['/inicio']);
    } else {
      this.mensaje = 'Correo o contraseña incorrectos';
    }
  }
}
