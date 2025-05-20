import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UserService } from '../../../services/UserService';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Portafolio} from "../../../models/portafolio";
import {PortafolioService} from "../../../services/PorfafolioService";
import {ProfileEditDialogComponent} from "../../profile-edit-dialog/profile-edit-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import {AdvancedSettingsDialogComponent} from "../../advanced-settings-dialog/advanced-settings-dialog.component";



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  imports: [
    NgIf,
    NgOptimizedImage,
    NgForOf
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
    private dialog: MatDialog
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


}
