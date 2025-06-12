import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOption} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {OportunidadService} from '../../services/OportunidadesService';
import {CommonModule} from "@angular/common";
import {Usuario} from '../../models/usuario';


export enum EstadoOportunidad {
  ABIERTO = 'ABIERTO',
  CERRADO = 'CERRADO'
}

@Component({
  selector: 'app-oportunidad-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOption,
    FormsModule
  ],
  templateUrl: './oportunidad-create-dialog.component.html',
  styleUrl: './oportunidad-create-dialog.component.css'
})
export class OportunidadCreateDialogComponent {
  oportunidadForm: FormGroup;
  usuarioEmpresa: Usuario;
  uuid: string;
  estados = Object.values(EstadoOportunidad);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OportunidadCreateDialogComponent>,
    private oportunidadesService: OportunidadService,
    @Inject(MAT_DIALOG_DATA) public dialogData: { uuid: string, usuarioEmpresa: Usuario }
  ) {
    this.usuarioEmpresa= dialogData.usuarioEmpresa;
    this.uuid = dialogData.uuid;


    this.oportunidadForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2000)]],
      categoria: ['', [Validators.required, Validators.pattern('^[A-Za-zÁ-ÿ\\s]{3,50}$')]],
      requisitos: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      estado: [null, [Validators.required]],
      ubicacion: ['', [Validators.required]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    // Se verifica si el formulario es válido antes de enviarlo.
    if (this.oportunidadForm.invalid) {
      // Marca todos los campos como "tocados" para mostrar los mensajes de error.
      this.oportunidadForm.markAllAsTouched();
      return;
    }

    this.oportunidadesService.createOportunidad(this.oportunidadForm.value).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
