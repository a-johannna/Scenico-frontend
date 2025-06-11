import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {UserProfileComponent} from '../register/user-profile/user-profile.component';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {AdvancedSettingsDialogComponent} from '../advanced-settings-dialog/advanced-settings-dialog.component';
import {Oportunidades} from '../../models/oportunidades';
import {OportunidadService} from '../../services/OportunidadesService';

@Component({
  selector: 'app-explorar-oportunidades',
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './explorar-oportunidades.component.html',
  styleUrl: './explorar-oportunidades.component.css'
})
export class ExplorarOportunidadesComponent implements OnInit {
  oportunidades: Oportunidades[] = [];

  constructor(private oportunidadesService: OportunidadService, private router: Router, private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.oportunidadesService.getAllOportunidades().subscribe({
      next: data => this.oportunidades = data,
      error: err => console.error('Error cargando portafolios', err)
    });
  }



  protected readonly UserProfileComponent = UserProfileComponent;

  explorarPortafolios(): void {
    this.router.navigate(['/explorar']);
  }

  volver(): void {
    const uuid = this.authService.getCurrentUserUuid();
    if (uuid) {
      this.router.navigate([`/uuid/${uuid}`]);
    } else {
      console.error('UUID no encontrado');
    }
  }

  salir(): void {
    const dialogRef = this.dialog.open(AdvancedSettingsDialogComponent, {
      width: '400px',
      data: { modo: 'salir' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    });
  }

}
