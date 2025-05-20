import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/UserService';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-advanced-settings-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogActions
  ],
  templateUrl: './advanced-settings-dialog.component.html',
  styleUrl: './advanced-settings-dialog.component.css'
})
export class AdvancedSettingsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AdvancedSettingsDialogComponent>,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public userId: string
  ) {}

  cerrarSesion() {
    this.authService.logout(); // limpia token y sesión
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

  eliminarCuenta() {
    if (confirm('¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.userService.deleteUser(this.userId).subscribe(() => {
        this.authService.logout();
        this.dialogRef.close();
        this.router.navigate(['/login']);
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }

}
