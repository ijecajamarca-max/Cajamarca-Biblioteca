import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html'
})
export class Login {
  correo = '';
  password = '';
  mensaje = '';
  constructor(
    private router: Router
  ) {}
  iniciarSesion(): void {
    this.mensaje = '';
    const usuarioGuardado =
      localStorage.getItem('usuario');
    if (!usuarioGuardado) {
      this.mensaje =
        'No existe ninguna cuenta registrada.';
      return;
    }
    const usuario = JSON.parse(usuarioGuardado);
    if (
      usuario.correo.toLowerCase() ===
      this.correo.toLowerCase() &&
      usuario.password === this.password
    ) {
      this.router.navigate(['/inicio']);
    } else {
      this.mensaje =
        'El correo o la contraseña son incorrectos.';
    }
  }
}
