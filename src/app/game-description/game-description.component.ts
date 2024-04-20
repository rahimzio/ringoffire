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

  cardActionDE1 = [
      { title: 'Wasserfall', description: 'Alle müssen gleichzeitig mit dem Trinken beginnen. wer als letzes seine mische leer hat macht sich ne neue.' },
      { title: 'Du', description: 'Du entscheidest, wer trinkt.' },
      { title: 'Ich', description: 'Herzlichen Glückwunsch! Trinke einen Shot!' },
      { title: 'Kategorie', description: 'Überlege dir eine Kategorie (z. B. Farben,Micha Storys,eger chill spots...). Jeder Spieler muss einen Gegenstand aus dieser Kategorie aufzählen.' },
      { title: 'Wer bin Ich?', description: 'verlasse kurz den Raum und wenn du wiederkommst hast du 3Min Zeit zueratten wer du bist wenn du es schaffst müssen alle ausser du trinken' },
      { title: 'Mädels', description: 'Alle Mädchen trinken.' },
      { title: 'Himmel', description: 'Hände hoch! Der letzte Spieler trinkt!' },
      { title: 'Kumpel', description: 'Suche dir einen Kumpel aus. Dein Kumpel muss immer trinken, wenn du trinkst, und umgekehrt.' },
      { title: 'Ruhig Brauner', description: 'die "gebräunteste" Person verteilt 3 Schlücke ' },
      { title: 'Männer', description: 'Alle Männer trinken.' },
      { title: 'Geburtstags Junge Leo', description: 'Leo darf sich jemanden aussuchen der Trinken muss' },
      { title: 'Ich habe noch nie...', description: 'Sage etwas, das du noch nie gemacht hast. Jeder, der es getan hat, muss trinken.' },
      { title: 'Regel', description: 'Stelle eine Regel auf. Jeder muss trinken, wenn er gegen die Regel verstößt.' }
  ];

  cardActionDE2 = [
    { title: 'Schmiede Goat', description: 'Die Person die am aktivsten in die schmiede geht nimmt einen schluck und darf so viele schlücke verteilen wie er diese woche im gym war' },
    { title: 'Schluck (pause)', description: 'Trinke 3 strafschlücke' },
    { title: 'Schere/Stein/Papier', description: 'ihr spielt ne riesen Runde schere/stein/papier jeder Verlierer Kriegt nen strafschluck' },
    { title: 'Speifrei seid 93', description: 'wenn du seid in den letzen 12 Monaten gekotz hast trink' },
    { title: 'W bin Ich?', description: 'verlasse kurz den Raum und wenn du wiederkommst hast du 3Min Zeit zueratten wer du bist wenn du es schaffst müssen alle ausser du trinken' },
    { title: 'j', description: 'wer heute die meisten Joints geraucht hast dreht auf und darf 4 Schlücke verteilen' },
    { title: 'Filmgenies', description: 'Nennt alle filme die mit den Anfangsbuchstaben von dem spieler anfangen welchen keine mehr einfallen nimmt 2 Strafschlücke' },
    { title: 'Raucherpause', description: 'Jede Person die es geniesst Ziga/CB-Rette zurauchen nimmt 1 strafschluck' },
    { title: 'Auf Flasche gesetzt', description: 'Trink deine mische aus' },
    { title: 'k', description: 'Alle Männer trinken.' },
    { title: 'j', description: 'Leo darf sich jemanden aussuchen der Trinken muss' },
    { title: '7', description: 'Sage etwas, das du noch nie gemacht hast. Jeder, der es getan hat, muss trinken.' },
    { title: 'Regel', description: 'Stelle eine Regel auf. Jeder muss trinken, wenn er gegen die Regel verstößt.' }
];

  title = '';
  description = '';
  @Input() card: string = '';

  fiftyFifty() {
    return Math.random() < 0.5;
  }
  ngOnChanges(): void{
    if((this.card) && (this.fiftyFifty() == true) ){
    let cardNumber = +this.card.split("_")[1];
    this.title = this.cardActionDE1[cardNumber-1].title;
    this.description = this.cardActionDE1[cardNumber-1].description;
  }
  if((this.card) && (this.fiftyFifty() == false)){
  //console.log(this.card)
  let cardNumber = +this.card.split("_")[1];
  this.title = this.cardActionDE2[cardNumber-1].title;
  this.description = this.cardActionDE2[cardNumber-1].description;
}

}

}