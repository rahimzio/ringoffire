import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../../models/game';


@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
game:Game = new Game();
onlineGameRef;
blankId:string ='';
  
  constructor(private router:Router,private firestore:Firestore){
    this.onlineGameRef = collection(this.firestore ,'games');
  }

newGame(){

    addDoc(this.onlineGameRef, this.getCleanJson(this.game))
    .then((docRef) => {
     // console.log(docRef);
      //console.log('Document written with ID:', docRef.id);
      this.router.navigateByUrl('/game/'+docRef.id);
      this.blankId = docRef.id ;
      //console.log(this.blankId)
    })
    .catch((error) => {
      console.error('Error adding document:', error);
    });
}


   getCleanJson(game:Game):{}{
  return {
  players: game.players,
  stack:game.stack,
  playedCards:game.playedCards,
  playerProfilPicture: game.playerProfilPicture,
  currentPlayer: game.currentPlayer,
  newI:game.newI,
  }
 }
}
