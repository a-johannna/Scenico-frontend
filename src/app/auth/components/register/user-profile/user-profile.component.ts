import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';
import { UserService } from '../../../services/UserService';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Portafolio} from "../../../models/portafolio";
import {PortafolioService} from "../../../services/PorfafolioService";
import {ProfileEditDialogComponent} from "../../profile-edit-dialog/profile-edit-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import {AdvancedSettingsDialogComponent} from "../../advanced-settings-dialog/advanced-settings-dialog.component";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {PortafolioCreateDialogComponent} from "../../portafolio-create-dialog/portafolio-create-dialog.component";
import {PortafolioEditDialogComponent} from '../../portafolio-edit-dialog/portafolio-edit-dialog.component';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [
    NgIf,
    NgOptimizedImage,
    NgForOf,
    MatButton
  ],
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: Usuario | null = null;
  uuid: string = '';
  portafolios:Portafolio[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private portafolioService: PortafolioService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener UUID desde la URL, si se está navegando con parámetro
    this.uuid = this.route.snapshot.paramMap.get('uuid') || '';

    if (this.uuid) {
      this.userService.getUserByUuid(this.uuid).subscribe({
        next: data => this.user = data,
        error: err => console.error('Error al cargar perfil de usuario', err)
      });
      this.portafolioService.getPortafoliosByUserUuid(this.uuid).subscribe({
        next: data => this.portafolios = data,
        error: err => console.error('Error al cargar portafolios del usuario', err)
      });

    }
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(ProfileEditDialogComponent, {
      width: '400px',
      data: { ...this.user }, // copia del objeto actual
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit(); // recarga perfil
      }
    });
  }
  openAdvancedSettings(): void {
    this.dialog.open(AdvancedSettingsDialogComponent, {
      width: '400px',
      data: this.user?.uuid || this.user?.username // asegúrate de pasar el identificador correcto
    });
  }


  abrirFormularioPortafolio(): void {
    const dialogRef = this.dialog.open(PortafolioCreateDialogComponent, {
      width: '400px',
      data: this.user?.username
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit(); // recargar lista de portafolios
      }
    });
  }

  editarPortafolio(portafolio: Portafolio) {
    const dialogRef = this.dialog.open(PortafolioEditDialogComponent, {
      width: '500px',
      data: portafolio
    });

    dialogRef.afterClosed().subscribe((result: Portafolio | undefined) => {
      if (result) {
        this.portafolioService.updatePortfolio(result.idPortafolio, result).subscribe({
          next: () => {
            console.log('Actualizado correctamente');
            this.cargarPortafolios(); // o refresca la vista
          },
          error: err => console.error('Error actualizando:', err)
        });
      }
    });
  }

  eliminarPortafolio(id: number): void {
    if (confirm('¿Deseas eliminar este portafolio?')) {
      this.portafolioService.deletePortafolio(id).subscribe({
        next: () => {
          // Elimina el portafolio del arreglo local tras éxito
          this.portafolios = this.portafolios.filter(p => p.idPortafolio !== id);
          console.log(`Portafolio con id ${id} eliminado.`);
        },
        error: err => {
          console.error('Error al eliminar el portafolio:', err);
          alert('Ocurrió un error al intentar eliminar el portafolio.');
        }
      });
    }
  }

  cargarPortafolios(): void {
    this.portafolioService.getPortafoliosByUserUuid(this.uuid!).subscribe({
      next: data => this.portafolios = data,
      error: err => console.error('Error al cargar portafolios:', err)
    });
  }

  explorarPortafolios(): void {
    this.router.navigate(['/explorar']);
  }

}
