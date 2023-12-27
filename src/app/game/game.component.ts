import { CommonModule, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddPlayerComponent } from '../add-player/add-player.component';
import { GameDescriptionComponent } from '../game-description/game-description.component';


export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,NgStyle,PlayerComponent,MatButtonModule,MatIconModule,MatDialogModule,GameDescriptionComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  game: Game = new Game();
  currentCard:string = '';

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {
    this.newGame()
  }
  newGame(){
    this.game = new Game();
    console.log(this.game)
  }
  reavealCardAnimation = false;
  reavealCard(){
    if(!this.reavealCardAnimation){
    this.reavealCardAnimation = true;

    const poppedCard = this.game.stack.pop();
    if (poppedCard !== undefined) {
      this.currentCard = poppedCard;
    }
    
    this.game.currentPlayer ++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    
    setTimeout(() => {
      if (this.currentCard !== undefined) {
        this.game.playedCards.push(this.currentCard);
      }
      this.reavealCardAnimation = false;
    }, 1000);
  
  }
}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerComponent, {
      
    });

    dialogRef.afterClosed().subscribe(name => {
      if(name != undefined && name.length>0){
      this.game.players.push(name);
      }
    });
  }

}
