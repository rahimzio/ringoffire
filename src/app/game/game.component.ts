import { CommonModule, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
import { Firestore, collection, doc, getDoc, getDocs, onSnapshot, updateDoc ,addDoc, Unsubscribe} from '@angular/fire/firestore';
import { ActivatedRoute ,RouterModule} from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';



export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,NgStyle,PlayerComponent,MatButtonModule,MatIconModule,MatDialogModule,GameDescriptionComponent,NgStyle],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  game: Game = new Game();
 firestore:Firestore = inject(Firestore);
 onlineGameRef:any;
 gameId:string ='';
 onlineGameCards:any;
 gameRoute:string= '';
 collectionRef:any;
 test:any[]= [];
 gameOver:boolean = false;
 private unsubscribeOnlineGame: Unsubscribe | null = null;

 
 constructor(public dialog: MatDialog, private route:ActivatedRoute,private cdr: ChangeDetectorRef){}
 
  blankId:string ='';
  ngOnInit(): void {
  this.onlineGameRef = collection(this.firestore, 'games');
  this.unsubscribeOnlineGame = this.subOnlineGame();
  this.getGameLobbyId(); // Die Lobby-ID des Spiels abrufen
  this.getGameData(); // Die Spiel-Daten abrufen
  //this.newGame(); // Ein neues Spiel initialisieren
  //this.onlineGameRef.subscribe();
  this.onlineGameRef = collection(this.firestore ,'games'); // Firestore-Referenz für Spiele initialisieren
   // this.subOnlineGame()
  this.gameId += this.getGameId(); // Die Spiel-ID abrufen und zur Spiel-ID-Variable hinzufügen
  //this.addGameField(); // Das Spielfeld aktualisieren
  this.updateGame(this.game); // Das Spiel in der Firestore-Datenbank aktualisieren
  // this.addNewGame(); // Diese Funktion ist auskommentiert, möglicherweise nicht benötigt
  this.setLocalGameToOnlineGame(this.game);
  }

// Diese Funktion ruft die Daten des Spiels aus Firestore ab und gibt sie in der Konsole aus, wenn das Dokument existiert.
  getGameData(){
  const docRef = doc(this.firestore, 'games', this.gameRoute);
  onSnapshot(docRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const gameData = docSnapshot.data() as Partial<Game>;
      this.game.players = gameData.players || [];
      this.game.currentPlayer = gameData.currentPlayer || 0;
      this.game.stack = gameData.stack || [];
      this.game.playerProfilPicture = gameData.playerProfilPicture || [];
      this.game.playedCards = gameData.playedCards || [];
      this.game.newI = gameData.newI || "3";
      this.game.currentCard = gameData.currentCard || '';
      this.game.reavealCardAnimation = gameData.reavealCardAnimation || false;

      this.cdr.detectChanges();
    } else {
      //console.log('No such document!');
    }
    this.game = { ...this.game };
  });
  }

  //Diese Funktion wird aufgerufen, um die Spiel-ID aus den Routenparametern zu extrahieren.
  getGameLobbyId(){
    this.route.params.subscribe((params)=>{
    this.gameId = params['gameId'];
    this.gameRoute = params['gameId'];
  })
  }

  //Diese Funktion abonniert auf Änderungen in der Firestore-Sammlung "games" und aktualisiert das test-Array jedes Mal, wenn sich Daten ändern.
    async addGameField(){
    onSnapshot(this.getGames(), (list) => {
        list.forEach((note) => this.test.push((this.setGame(note.data())))
        );
      });
  }
  getGames(){return collection(this.firestore ,'games');}
  setGame(game:any){return game.playedCards}
  
  
 //Diese Funktion fügt ein neues Spiel zur Firestore-Datenbank hinzu. 
  addNewGame(){
  addDoc(this.onlineGameRef, this.getCleanJson(this.game))
  .then((docRef) => {
    //console.log('Document written with ID:', docRef.id);
    this.blankId = docRef.id ;
    //console.log(this.blankId)
  })
  .catch((error) => {
    console.error('Error adding document:', error);
  });
 }
 // Diese Funktion abonniert Änderungen in der Firestore-Sammlung "games" und gibt eine Unsubscribe-Funktion zurück.
  subOnlineGame(){
    let unsubscribe = onSnapshot(this.onlineGameRef, (games:any) => {
        games.forEach(
          (game:any) => ((game.data()))
        );
      });
      return () => unsubscribe();
    };

    //get single or multiple game Id to connect with firebase
    //Die Funktion abonniert Änderungen in der Firestore-Sammlung "games" und gibt die ID des Spiels zurück.
    getGameId(){
      return onSnapshot(this.onlineGameRef, (games:any) => {
        games.forEach(
          (game:any) =>  game.id
        );
      });
    }

    
    //uptading current game values to firebase
   async updateGame(game:Game){
    
    if(game){
      let docRef = this.getSingleDocRef('games',this.gameRoute);
      let JsonGame = this.getCleanJson(game);
      let doc = await getDoc(docRef);
  
      if (doc.exists()) {
        //console.log(JsonGame)
      await updateDoc( docRef,JsonGame).catch(
     (err)=> (console.log(err)))}
      }
     }

     //Erstellt eine Firestore-Referenz für ein einzelnes Dokument in einer bestimmten Sammlung.
     getSingleDocRef(callId:'games', docId:string){
      if (!docId) {
        throw new Error('Invalid document ID');
      }else{
      return doc(collection(this.firestore, callId),docId );
      }
     }

     //spiel daten werden in ein JSON umgewandelt
     getCleanJson(game:Game):{}{
      return {
      players: game.players,
      stack:game.stack,
      playedCards:game.playedCards,
      playerProfilPicture: game.playerProfilPicture,
      currentPlayer: game.currentPlayer,
      newI:game.newI,
      currentCard:game.currentCard,
      reavealCardAnimation:game.reavealCardAnimation,
      }
     }

  setLocalGameToOnlineGame(game:{}){

  }


  //neues Spiel wird erschaffen
  newGame(){
    //this.game = new Game();
  }


  //durch die funktion wird eine Spielkarte offenbart
  reavealCard(){
    if(this.game.stack.length >= 0){
    if(!this.game.reavealCardAnimation){
    this.game.reavealCardAnimation = true;
    this.updateGame(this.game);
    const poppedCard = this.game.stack.pop();
    if (poppedCard !== undefined) {
      this.game.currentCard = poppedCard;
    }
    
    this.game.currentPlayer ++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.updateGame(this.game);

    setTimeout(() => {
      if (this.game.currentCard !== undefined) {
        this.game.playedCards.push(this.game.currentCard);
        this.game.reavealCardAnimation = false;
        this.updateGame(this.game);
      }
      
    }, 1000);
  }else{
    this.gameOver = true;
  }
  
    
  }
}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerComponent, {
      
    });

    dialogRef.afterClosed().subscribe(name => {
      if(name != undefined && name.length>0){
      this.game.players.push(name);
      this.game.playerProfilPicture.push("1.png");
      this.updateGame(this.game);
      }
    });
  }

  ngOnDestroy() {
    // Beim Zerstören der Komponente das Firestore-Abonnement beenden
    if (this.unsubscribeOnlineGame) {
      this.unsubscribeOnlineGame();
    }
  }

  editPlayer(player:string,i:number){
   // console.log(player,i);
    const dialogRef = this.dialog.open(EditPlayerComponent, {
      
    });
    dialogRef.afterClosed().subscribe(change => {
    
    if(change){
      
      if(change == "DELETE"){
        this.game.players.splice(i,1);
        this.game.playerProfilPicture.splice(i,1);
        console.log("delete")
     }else{
      console.log("profilbild geändert", change)
      this.game.playerProfilPicture[i] = change;
      this.updateGame(this.game);
     }
    }
    });
  }

  restartGame() {
    this.gameOver = false;
  }
}

