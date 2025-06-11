import { Component, OnInit } from '@angular/core';
import { Portafolio } from '../../models/portafolio';
import {PortafolioService} from '../../services/PorfafolioService';
import {NgForOf, NgIf} from '@angular/common';
import {UserProfileComponent} from '../register/user-profile/user-profile.component';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AdvancedSettingsDialogComponent} from '../advanced-settings-dialog/advanced-settings-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-explorar-portafolios',
  templateUrl: './explorar-portafolios.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./explorar-portafolios.component.css']
})
export class ExplorarPortafoliosComponent implements OnInit {
  portafolios: Portafolio[] = [];

  constructor(private portafolioService: PortafolioService, private router: Router, private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.portafolioService.getAllPortafolios().subscribe({
      next: data => this.portafolios = data,
      error: err => console.error('Error cargando portafolios', err)
    });
  }



  protected readonly UserProfileComponent = UserProfileComponent;

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
  explorarOportunidades(): void {
    this.router.navigate(['/castings']);
  }


}
