import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password.html'
})
export class ForgotPassword {
  correo = '';
  nuevaPassword = '';
  confirmarPassword = '';
  usuarioEncontrado = false;
  mensaje = '';
  error = '';
  constructor(
    private router: Router
  ) {}
  buscarCuenta(): void {
    this.mensaje = '';
    this.error = '';
    if (!this.correo) {
      this.error =
        'Introduce tu correo electrónico.';
      return;
    }
    const usuarioGuardado =
      localStorage.getItem('usuario');
    if (!usuarioGuardado) {
      this.error =
        'No existe ninguna cuenta registrada.';
      return;
    }
    const usuario =
      JSON.parse(usuarioGuardado);
    if (
      usuario.correo.toLowerCase() ===
      this.correo.toLowerCase()
    ) {
      this.usuarioEncontrado = true;
      this.mensaje =
        'Cuenta encontrada. Ahora puedes crear una nueva contraseña.';
    } else {
      this.error =
        'No encontramos una cuenta asociada a este correo.';
    }
  }
  cambiarPassword(): void {
    this.mensaje = '';
    this.error = '';
    if (
      !this.nuevaPassword ||
      !this.confirmarPassword
    ) {
      this.error =
        'Completa los dos campos de contraseña.';
      return;
    }
    if (this.nuevaPassword.length < 6) {
      this.error =
        'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
    if (
      this.nuevaPassword !==
      this.confirmarPassword
    ) {
      this.error =
        'Las contraseñas no coinciden.';
      return;
    }
    const usuarioGuardado =
      localStorage.getItem('usuario');
    if (!usuarioGuardado) {
      this.error =
        'No existe ninguna cuenta registrada.';
      return;
    }
    const usuario =
      JSON.parse(usuarioGuardado);
    usuario.password =
      this.nuevaPassword;
    localStorage.setItem(
      'usuario',
      JSON.stringify(usuario)
    );
    this.mensaje =
      'Contraseña actualizada correctamente.';
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}
