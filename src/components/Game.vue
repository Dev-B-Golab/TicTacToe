<template>
  <div>
    <h2 v-if="winner && draw==false">Winner: {{ winnerName }} </h2>
    <h2 v-if="draw==true">Draw! Play again</h2>
    <h2 v-if="!winner && draw==false">Players Move: {{ playerName }}</h2>
    <button @click="reset" class="btn primaryColor btn-lg">Reset</button>
    <div class="boardGame">
      <table class="table">
        <tr v-for="(_ , x) in size" :key="x" class="rows">
          <td v-for="(_ , y) in size" :key="y" :id="'gameField'+ (x * size + y)" class="col-3 board" 
            :class="[squares[x][y] == 'O' ? 'computerColor': 'playerColor']" @click="move(x,y)">
            {{ squares[x][y] }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const calcWinner = squares => {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  for (let i = 0; i<lines.length; i++){
    const [a,b,c] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      for(var j=0; j<lines[i].length;j++){
        var winnerFields = document.getElementById('gameField'+lines[i][j]);
        winnerFields.classList.add('youWin');
      }
      return squares[a]
    }
  }
  return null
}
export default {
  data() {
    return {
      player: 'X',
      playerName: '',
      winnerName: '',
      btnDisabled: true,
      size: 3,
      moveCount: 0,
      draw: false,
      squares: [
        ['','',''],
        ['','',''],
        ['','','']
      ],
      lines: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ]
    }
  },
  created() {
    this.playerName = this.nickname != '' ? this.nickname : 'Player';
  },
  computed: {
    ...mapState(['nickname']),
    winner() {
      return calcWinner(this.squares.flat())
    },
  },
  methods: {
    move(x, y) {
      if(this.winner || this.squares[x][y] || this.btnDisabled == false) return
      this.disableButton()
      this.squares[x][y] = this.player
      this.player = 'O';
      this.playerName = 'Computer';
      this.moveCount++
      this.checkDraw()
      if (!this.winner && this.player === 'O' && this.moveCount < 9) {
        setTimeout( () => {
          this.winnerName = this.player === 'O' ? this.nickname : 'Computer'
            return this.computerMove(); 
        }, 500);
      }
    },
    computerMove() {
      let emptySquares = [];
      this.squares.forEach((row, i) => {
        row.forEach((square, j) => {
          if (!square) {
            emptySquares.push({i, j});
          }
        });
      });

      for (let k = 0; k < emptySquares.length; k++) {
        let {i, j} = emptySquares[k];
        this.squares[i][j] = this.player;
        if (calcWinner(this.squares.flat())) {
          return;
        }
        this.squares[i][j] = '';
      }

      for (let k = 0; k < emptySquares.length; k++) {
        let {i, j} = emptySquares[k];
        this.squares[i][j] = 'O';
        if (calcWinner(this.squares.flat())) {
          this.squares[i][j] = this.player;

        }
        this.squares[i][j] = '';
      }

      if (emptySquares.length) {
        let randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        this.squares[randomMove.i][randomMove.j] = this.player;
      }
      
      this.player = 'X';
      this.playerName = this.nickname;
      this.moveCount++
      this.disableButton();
      this.winner
      this.checkDraw()
    },

    disableButton(){
      return this.btnDisabled = !this.btnDisabled 
    },
    checkDraw(){
      if (this.moveCount >= 9) {
         this.draw = true;
         this.disableButton();
         return null
      }
    },
    reset() {
      this.player = 'X'
      this.squares = [
        ['','',''],
        ['','',''],
        ['','','']
      ]
      var winnerFieldsReset = document.querySelectorAll('.board');
      winnerFieldsReset.forEach(resetWinner => {
        resetWinner.classList.remove('youWin');
      });
      this.playerName = this.nickname
      this.btnDisabled = true
      this.draw = false
      this.moveCount = 0
    }
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