import { Component, Input, OnChanges } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { GameComponent } from '../game/game.component';


@Component({
  selector: 'app-game-description',
  standalone: true,
  imports: [MatCardModule,GameComponent],
  templateUrl: './game-description.component.html',
  styleUrl: './game-description.component.scss'
})
export class GameDescriptionComponent implements OnChanges{
  cardActionEn = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: '' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: '' },
    { title: 'Never have i ever...', description: 'Say something you nnever did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  cardActionDE = [
      { title: 'Wasserfall', description: 'Alle müssen gleichzeitig mit dem Trinken beginnen. Sobald Spieler 1 aufhört zu trinken, darf Spieler 2 aufhören zu trinken. Spieler 3 darf aufhören, sobald Spieler 2 aufgehört hat zu trinken, und so weiter.' },
      { title: 'Du', description: 'Du entscheidest, wer trinkt.' },
      { title: 'Ich', description: 'Herzlichen Glückwunsch! Trinke einen Shot!' },
      { title: 'Kategorie', description: 'Überlege dir eine Kategorie (z. B. Farben). Jeder Spieler muss einen Gegenstand aus dieser Kategorie aufzählen.' },
      { title: 'Bust a Jive', description: 'Spieler 1 macht einen Tanzschritt. Spieler 2 wiederholt den Tanzschritt und fügt einen zweiten hinzu.' },
      { title: 'Mädels', description: 'Alle Mädchen trinken.' },
      { title: 'Himmel', description: 'Hände hoch! Der letzte Spieler trinkt!' },
      { title: 'Kumpel', description: 'Suche dir einen Kumpel aus. Dein Kumpel muss immer trinken, wenn du trinkst, und umgekehrt.' },
      { title: 'Daumenmeister', description: '' },
      { title: 'Männer', description: 'Alle Männer trinken.' },
      { title: 'Quizmeister', description: '' },
      { title: 'Ich habe noch nie...', description: 'Sage etwas, das du noch nie gemacht hast. Jeder, der es getan hat, muss trinken.' },
      { title: 'Regel', description: 'Stelle eine Regel auf. Jeder muss trinken, wenn er gegen die Regel verstößt.' }
  ];

  title = '';
  description = '';
  @Input() card: string = '';
  ngOnChanges(): void{
    if(this.card){
    let cardNumber = +this.card.split("_")[1];
    this.title = this.cardActionEn[cardNumber-1].title;
    this.description = this.cardActionEn[cardNumber-1].description;
  }
}
}
