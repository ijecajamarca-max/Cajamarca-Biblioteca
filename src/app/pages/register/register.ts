import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html'
})
export class Register {
  nombre = '';
  correo = '';
  password = '';
  confirmarPassword = '';
  mensaje = '';
  error = '';
  constructor(
    private router: Router
  ) {}
  registrar(): void {
    this.mensaje = '';
    this.error = '';
    if (
      !this.nombre ||
      !this.correo ||
      !this.password ||
      !this.confirmarPassword
    ) {
      this.error = 'Completa todos los campos.';
      return;
    }
    if (this.password.length < 5) {
      this.error =
        'La contraseña debe tener al menos 5 caracteres.';
      return;
    }
    if (this.password !== this.confirmarPassword) {

      this.error =
        'Las contraseñas no son iguales.';
      return;
    }
    const usuarioGuardado =
      localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      if (
        usuario.correo.toLowerCase() ===
        this.correo.toLowerCase()
      ) {
        this.error =
          'El correo ya esta registrado.';
        return;
      }
    }
    const nuevoUsuario = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password
    };
    localStorage.setItem(
      'usuario',
      JSON.stringify(nuevoUsuario)
    );
    this.mensaje =
      'Cuenta creada correctamente.';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}
