import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-portafolio-edit-dialog',
  standalone: true,
  templateUrl: './portafolio-edit-dialog.component.html',
  styleUrls: ['./portafolio-edit-dialog.component.css'],
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class PortafolioEditDialogComponent implements OnInit {

  etiquetasTexto: string = '';

  constructor(
    public dialogRef: MatDialogRef<PortafolioEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      titulo: string;
      descripcion: string;
      tipoArchivo: string;
      urlArchivo: string;
      urlImagen: string;
      descripcionImagen: string;
      etiquetas: string[];
      nombreUsuario?: string;
    }
  ) {}

  ngOnInit(): void {
    this.etiquetasTexto = this.data.etiquetas?.join(', ') || '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.data.etiquetas = this.etiquetasTexto
      .split(',')
      .map(e => e.trim())
      .filter(e => e !== '');
    this.dialogRef.close(this.data);
  }
}
