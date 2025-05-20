import {Component, Inject} from '@angular/core';
import {UserService} from '../../services/UserService';
import {Usuario} from '../../models/usuario';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import { MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

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
    FormsModule
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

  onSave(): void {
    this.userService.updateUser(this.data.uuid!, this.data).subscribe(() => {
      this.dialogRef.close(true);
    });
  }


  onCancel(): void {
    this.dialogRef.close();
  }

}
