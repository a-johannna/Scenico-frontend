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
import {Oportunidades} from '../../../models/oportunidades';
import {OportunidadService} from '../../../services/OportunidadesService';
import {OportunidadEditDialogComponent} from '../../oportunidad-edit-dialog/oportunidad-edit-dialog.component';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [
    NgIf,
    NgOptimizedImage,
    NgForOf,
    MatButton,

  ],
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: Usuario | null = null;
  uuid: string = '';
  portafolios:Portafolio[] = [];
  oportunidades:Oportunidades[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private portafolioService: PortafolioService,
    private oportunidadesService: OportunidadService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener UUID desde la URL, si se está navegando con parámetro (environment)
    this.uuid = this.route.snapshot.paramMap.get('uuid') || '';

    if (this.uuid) {
      this.userService.getUserByUuid(this.uuid).subscribe({
        next: data => {
          console.log('Usuario recibido en perfil:', data);
          this.user = data;
          if (data.typeUser === 'ENTERPRISE') {
            this.cargarOportunidades();
          }

        },
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
      data: this.user?.uuid || this.user?.username //pasa el uuid como identificador
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

  explorarOportunidades(): void {
    this.router.navigate(['/castings']);
  }

  cargarOportunidades(): void {
    this.oportunidadesService.getOportunidadesByEmpresaId(this.uuid!).subscribe({
      next: (data) => {
        this.oportunidades = data;
        console.log('Oportunidades cargadas:', data);
      },
      error: (err) => {
        console.error('Error al cargar oportunidades:', err);
      }
    });
  }

  editarOportunidad(oportunidad: Oportunidades) {
    const dialogRef = this.dialog.open(OportunidadEditDialogComponent, {
      width: '500px',
      data: oportunidad
    });

    dialogRef.afterClosed().subscribe((result: Oportunidades | undefined) => {
      if (!result) {
        return;
      }

      // Llamamos al servicio pasando el UUID de la oportunidad actualizada
      this.oportunidadesService.updateOportunidad(result.id, result).subscribe({
        next: () => {
          console.log('Oportunidad actualizada correctamente');
          this.cargarOportunidades(); // refrescamos la lista tras la actualización
        },
        error: (err) => console.error('Error actualizando oportunidad:', err)
      });
    });
  }

  eliminarOportunidad(id: number): void {
    if (confirm('¿Deseas eliminar este casting?')) {
      this.oportunidadesService.deleteOportunidad(id).subscribe({
        next: () => {
          // Elimina el portafolio del arreglo local tras éxito
          this.oportunidades= this.oportunidades.filter(o => o.id !== id);
          console.log(`Casting con id ${id} eliminado.`);
        },
        error: err => {
          console.error('Error al eliminar el casting:', err);
          alert('Ocurrió un error al intentar eliminar el casting.');
        }
      });
    }
  }

}
