<template>
  <div class="container text-center">
    <h2 v-if="winner">Winner: {{ winner }} </h2>
    <h2 v-else>Players Move {{ player }}</h2>
    <button @click="reset" class="btn primaryColor">Reset</button>
    <div class="boardGame">
      <table class="table">
        <tr v-for="(_ , x) in 3" :key="x" class="rows">
          <td v-for="(_ , y) in 3" :key="y" class="col-3 board" @click="move(x,y)">{{ squares[x][y] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { computed } from "vue";
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
      return squares[a]
    }
  }
  return null
}
export default {
  setup() {

    const player = ref("X")
    const squares = ref([
      ['','',''],
      ['','',''],
      ['','','']
    ])
    const winner = computed(() => calcWinner(squares.value.flat()))

    const move = (x, y) => {
      if(winner.value || squares.value[x][y]) return
      squares.value[x][y] = player.value
      player.value = player.value === 'O' ? 'X' : 'O'
    }

    const reset = () => {
      player.value = 'X'
      squares.value = [
        ['','',''],
        ['','',''],
        ['','','']
      ]
    }
    return {winner, player, squares, move, reset };

  },
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
  
</style>
