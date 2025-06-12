import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Oportunidades } from '../../models/oportunidades';
import { CreateOportunidadDto } from '../register/user-profile/dtos/CreateOportunidadDto';
import { OportunidadService } from '../../services/OportunidadesService';

@Component({
  selector: 'app-oportunidad-edit-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './oportunidad-edit-dialog.component.html',
  styleUrls: ['./oportunidad-edit-dialog.component.css']
})
export class OportunidadEditDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private oportunidadService: OportunidadService,
    public dialogRef: MatDialogRef<OportunidadEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Oportunidades
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo:      [this.data.titulo,      [Validators.required]],
      descripcion: [this.data.descripcion, [Validators.required]],
      categoria:   [this.data.categoria,   [Validators.required]],
      requisitos:  [this.data.requisitos,  [Validators.required]],
      ubicacion:   [this.data.ubicacion,   [Validators.required]],
      estado:      [this.data.estado]
      // fechaCierre: [this.data.fechaCierre?.slice(0,10), [Validators.required]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.invalid) {
      return;
    }

    const dto: CreateOportunidadDto = {
      titulo:      this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      categoria:   this.form.value.categoria,
      requisitos:  this.form.value.requisitos,
      ubicacion:   this.form.value.ubicacion,
      estado:      this.form.value.estado,
      // fechaCierre: this.form.value.fechaCierre
    };

    this.oportunidadService
      .updateOportunidad(this.data.id, dto)
      .subscribe({
        next: updated => this.dialogRef.close(updated),
        error: err     => {
          console.error('Error actualizando oportunidad', err);
        }
      });
  }
}
