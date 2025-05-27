import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {PortafolioService} from '../../services/PorfafolioService';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-portafolio-create-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    FormsModule,
    MatDialogActions,
    MatOption,
    MatSelect,
  ],
  templateUrl: './portafolio-create-dialog.component.html',
  styleUrl: './portafolio-create-dialog.component.css'
})
export class PortafolioCreateDialogComponent {
  data: any = {
    titulo: '',
    descripcion: '',
    tipoArchivo: '',
    urlArchivo: '',
    urlImagen: '',
    descripcionImagen: '',
    etiquetas: [],
    nombreUsuario: ''
  };

  etiquetasTexto: string = '';

  constructor(
    private dialogRef: MatDialogRef<PortafolioCreateDialogComponent>,
    private portafolioService: PortafolioService,
    @Inject(MAT_DIALOG_DATA) public injectedUsername: string
  ) {
    this.data.nombreUsuario = injectedUsername;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    this.data.etiquetas = this.etiquetasTexto
      ? this.etiquetasTexto.split(',').map(e => e.trim())
      : null;

    // Limpiar campos opcionales si están vacíos
    if (!this.data.descripcion?.trim()) {
      this.data.descripcion = null;
    }
    if (!this.data.tipoArchivo?.trim()) {
      this.data.tipoArchivo = null;
    }
    if (!this.data.urlArchivo?.trim()) {
      this.data.urlArchivo = null;
    }
    if (!this.data.urlImagen?.trim()) {
      this.data.urlImagen = null;
    }
    if (!this.data.descripcionImagen?.trim()) {
      this.data.descripcionImagen = null;
    }

    this.portafolioService.createPortafolio(this.data).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

}
