export class Game{
    public players:string[] = [];
    public stack:string[] = [];
    public playedCards:string[] = [];
    public playerProfilPicture:string[]=[];
    public currentPlayer:number = 0;
    public newI:string = '';
    public currentCard:string = '';
    public reavealCardAnimation = false;

    constructor(){
        for(let i = 1; i < 14 ; i ++){
            this.stack.push('hearts_'+i);
            this.stack.push('ace_'+i);
            this.stack.push('clubs_'+i);
            this.stack.push('diamonds_'+i);
        }
        shuffle(this.stack);

        for(let i = 1; i < 4 ; i ++){
            this.newI = String(i);
            this.playerProfilPicture.push(this.newI);
        }
        shuffle(this.playerProfilPicture)
    }
}

function shuffle(array:string[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }