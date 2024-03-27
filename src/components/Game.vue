<template>
  <div>
    <h2 v-if="winner && draw==false">Winner: {{ winnerName }} </h2> 
    <h2 v-if="draw==true">Draw! Play again</h2>
    <h2 v-if="!winner && draw==false">Players Move: {{ playerName }}</h2>
    <button @click="reset" class="btn primaryColor btn-lg">Reset</button>
    <div class="boardGame">
      <table class="table">
        <tr v-for="(row, x) in squares" :key="x" class="rows">
          <td v-for="(cell, y) in row" :key="y" class="col-3 board" @click="move(x,y)"
          :class="{ computerColor: squares[x][y] == 'O', playerColor: squares[x][y] == 'X'}">
            {{ squares[x][y] }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      playerMark: 'X',
      playerName: 'Player',
      winnerName: '',
      winner: false,
      btnDisabled: true,
      moveCount: 0,
      draw: false,
      squares: [
        ['','',''],
        ['','',''],
        ['','','']
      ],
      playerMoves:[],
      computerMoves:[],
      checkTable: null,
    }
  },
  created() {
    this.playerName = this.nickname != '' ? this.nickname : 'Player';
  },
  computed: {
    ...mapState(['nickname']),
  },
  methods: {
    move(x,y){
      if(this.squares[x][y] || this.btnDisabled == false) return
      this.squares[x][y] = this.playerMark
      this.disableButton()
      this.playerMark == 'X' ? this.playerMove(x,y) : this.computerMove(x,y);
      this.playerMark = this.playerMark == 'X' ? 'O' : 'X'
      this.moveCount++;

      
      this.checkDraw();

      //computer move unlock buttons
      setTimeout( () => {
            return this.disableButton(); 
        }, 500);
      
    },

    playerMove(x,y){
      this.playerMoves.push({x,y})
      this.checkWinner(this.playerMoves);
      this.playerName = 'Computer'
    },

    computerMove(x,y){
      this.computerMoves.push({x,y})
      this.checkWinner(this.computerMoves);
      this.playerName = this.nickname != '' ? this.nickname : 'Player'
    },

    checkWinner(markTable, boardSize=3) {
      const winningConditions = [];

      // Sprawdzenie pionowych linii
      for (let i = 0; i < boardSize; i++) {
        const condition = [];
        for (let j = 0; j < boardSize; j++) {
          condition.push([j, i]);
        }
        winningConditions.push(condition);
      }

      // Sprawdzenie poziomych linii
      for (let i = 0; i < boardSize; i++) {
        const condition = [];
        for (let j = 0; j < boardSize; j++) {
          condition.push([i, j]);
        }
        winningConditions.push(condition);
      }

      // Sprawdzenie przekątnych
      const diagonal1 = [];
      const diagonal2 = [];
      for (let i = 0; i < boardSize; i++) {
        diagonal1.push([i, i]);
        diagonal2.push([i, boardSize - 1 - i]);
      }
      winningConditions.push(diagonal1, diagonal2);

      for (const condition of winningConditions) {
        let winnerFound = true;
        let prevValue = null;
        for (const [x, y] of condition) {
          const cell = markTable.find(cell => cell.x === x && cell.y === y);
          if (!cell || (prevValue && prevValue !== cell.value)) {
            winnerFound = false;
            break;
          }
          prevValue = cell.value;
        }
        if (winnerFound) {
          this.disableButton();
          this.winner = true;
          this.winnerName = this.playerName;
          return;
        }
      }
    },

    checkDraw(){
      if (this.moveCount >= 9 && this.winner == false) {
         this.draw = true;
         this.disableButton();
         return null
      }
    },

      disableButton(){
      return this.btnDisabled = !this.btnDisabled 
    },

    reset(){
      this.playerMark = 'X'
      this.playerName = this.nickname != '' ? this.nickname : 'Player';
      this.squares = [
        ['','',''],
        ['','',''],
        ['','','']
      ]
      this.btnDisabled = true
      this.draw = false
      this.playerMoves=[],
      this.computerMoves=[],
      this.moveCount = 0
      this.winner = false;
    },
  }
};
</script>

<style scoped>
  table td{
    border: solid 3px var(--primary-color);
  }
  td:hover{
    background-color: #2B3A48;
    cursor:pointer;
  }
  .board{
    max-width: 250px;
    max-height: 250px;
    min-height: 100px;
    min-width: 100px;
    height: 33%;
    height:200px;
    aspect-ratio: 1/1;
    font-size: 125px;
  }
  .boardGame{
    height:400px;
  }
  .youWin {
  animation: youWin 1s ease infinite;
}

@keyframes youWin {
  50% {  color: var(--winner-color); }
}
</style>