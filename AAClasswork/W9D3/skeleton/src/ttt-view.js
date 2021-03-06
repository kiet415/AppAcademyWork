//const script = require('../ttt_node/playScript.js');

class View {
  constructor(game, el) {
    this.game = game;
    this.el = el;
    this.setupBoard();
    //this.handleClick = this.handleClick.bind(this);
    
  }

  setupBoard() {
    const grid = document.createElement('ul');

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement('li');
        cell.dataset.pos = JSON.stringify([i,j]);
        grid.append(cell);
        
      }
    }
    this.el.append(grid);
    this.bindEvents();
  }
  
  bindEvents() {
    this.el.addEventListener("click",this.handleClick)
  }

  handleClick = (e) => {
    //debugger
    const el = e.target;
    this.makeMove(el);
  }
  
  makeMove(cell) {
    let game = this.game
    let pos = JSON.parse(cell.dataset.pos);
    let player = game.currentPlayer;
    //console.log(pos)
    cell.className = player;
    game.playMove(pos);
    
    if(game.isOver()) {
      console.log("game over");
      if(game.winner()) {
        alert("WINNER IS " + game.winner());
        const h1 = document.createElement('h1');
        this.el.append(h1);
        h1.append("WINNER IS " + game.winner());
      } else {
        alert("TIE GAME");
        const h1 = document.createElement('h1');
        this.el.append(h1);
        h1.append("TIE GAME");
      }
      this.el.removeEventListener("click", this.handleClick);
      //script.completion();
    }
  }
}

module.exports = View;
