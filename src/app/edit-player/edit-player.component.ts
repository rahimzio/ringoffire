import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, GameComponent } from '../game/game.component';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule,GameComponent],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {
  pictures = 6;
  assets: string[] = [
    "1.png","2.png","3.png","4.png","5.png","6.png",
  ];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {}

  closeDialog(index: number): void {
    this.dialogRef.close(this.assets[index]);
  }

  closeDialogDelete(): void {
    this.dialogRef.close("DELETE");
  }
}
