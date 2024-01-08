<template>
  <div class="gameboard">
    <table class="table">
        <tr v-for="row in rows" :key="row">
            <td v-for="col in cols" :key="col"></td>
        </tr>
    </table>
  </div>
 
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const rows = ref(3); 
    const cols = ref(3); 

    return { rows, cols };

  },
};
</script>

  
<style scoped>
  table{
    border: solid 2px white;
  }
  td{
    border: solid 2px white;
  }
  td:hover{
    background-color: #141414;
  }
  
</style>
