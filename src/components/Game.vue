<template>
  <div>
    <h2 v-if="winner">Winner: {{ winnerName }} </h2>
    <h2 v-else>Players Move: {{ playerName }}</h2>
    <button @click="reset" class="btn primaryColor">Reset</button>
    <div class="boardGame">
      <table class="table">
        <tr v-for="(_ , x) in 3" :key="x" class="rows">
          <td v-for="(_ , y) in 3" :key="y" :id="'gameField'+ (x * 3 + y)" class="col-3 board" 
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
        winnerFields.classList.add('hithere');
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
      squares: [
        ['','',''],
        ['','',''],
        ['','','']
      ]
    }
  },
  created() {
    this.playerName = this.nickname;
  },
  computed: {
    ...mapState(['nickname']),
    winner() {
      return calcWinner(this.squares.flat())
    }
  },
  methods: {
    move(x, y) {
      if(this.winner || this.squares[x][y]) return
        this.squares[x][y] = this.player
        this.playerName = this.player === 'O' ? this.nickname : 'Computer'
        this.player = this.player === 'O' ? 'X' : 'O'
        this.winnerName = this.player === 'O' ? this.nickname : 'Computer'
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
        resetWinner.classList.remove('hithere');
      });
      this.playerName = this.nickname
    }
  }
};
</script>

<style scoped>
  table td{
    border: solid 2px white;
  }
  td:hover{
    background-color: #141414;
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
  .hithere {
 
  animation: hithere 1s ease infinite;
}
@keyframes hithere {
  30% { transform: scale(1.2); }
  40%, 60% { transform: rotate(-20deg) scale(1.2); }
  50% { transform: rotate(20deg) scale(1.2); }
  70% { transform: rotate(0deg) scale(1.2); }
  100% { transform: scale(1); }
}
</style>