import { Component, Input } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { NgForOf } from '@angular/common';
import { Game } from '../../models/game';


@Component({
  selector: 'app-player',
  standalone: true,
  imports: [GameComponent,NgForOf],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() game: Game = new Game();
  @Input() name:string|undefined;
  @Input() image:any = "1.png";
  @Input() index:number = 0;
  @Input() activePlayer:boolean = false;
}
