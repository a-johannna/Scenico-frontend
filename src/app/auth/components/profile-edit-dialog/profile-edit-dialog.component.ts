import {Component, Inject} from '@angular/core';
import {UserService} from '../../services/UserService';
import {Usuario} from '../../models/usuario';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import { MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-profile-edit-dialog',
  imports: [
    MatDialogContent,
    MatLabel,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatFormField,
    MatButton,
    MatDialogActions,
    FormsModule,
    NgIf,
  ],
  templateUrl: './profile-edit-dialog.component.html',
  styleUrl: './profile-edit-dialog.component.css'
})
export class ProfileEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProfileEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private userService: UserService
  ) {}

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      // Generar preview
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }


  actulizarPhoto(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('uuid', this.data.uuid!);


      this.userService.uploadPhoto(formData).subscribe(() => {
        this.onSave();
      });
    } else {
      this.onSave();
    }
  }

  onSave(): void {
    this.userService.updateUser(this.data.uuid!, this.data).subscribe(() => {
      this.dialogRef.close(true);
    });
  }



  onCancel(): void {
    this.dialogRef.close();
  }

}
