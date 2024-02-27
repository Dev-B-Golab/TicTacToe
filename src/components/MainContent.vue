<template>
  <div class="mainLayout">
    <div class="row">
      <div class="col-12">
        <input type="text" class="col-sm-4 col-sm-offset-4" required maxlength="15" placeholder="Nickname" @keyup.enter="goToGame()" v-model="nickname">
        <p id="errorText" class="error" style="display:none">You need to enter your nickname</p>
      </div>
    </div>
    <div class="row">
      <p>Choose borad size</p>
      <div class="form-check form-check-inline">

        <input type="radio" class="btn-check" name="boardSize" id="size3x3" autocomplete="off">
        <label class="btn btn-outline-success" for="boardSize">3x3</label>

        <input type="radio" class="btn-check" name="boardSize" id="size4x4" autocomplete="off">
        <label class="btn btn-outline-success" for="boardSize">4x4</label>

        <input type="radio" class="btn-check" name="boardSize" id="size5x5" autocomplete="off">
        <label class="btn btn-outline-success" for="boardSize">5x5</label>

      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button class="btn primaryColor mt-4 btn-lg" @click="goToGame">PLAY!</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      nickname: ''
    }
  },
  methods: {
    ...mapMutations(['setNickname']),
    goToGame() {
      if(this.nickname != ""){
        this.setNickname(this.nickname)
        this.$router.push({
          name: 'Game',
        })
      }
      else{
        document.getElementById('errorText').style.display = 'block';
      }
    }
  }
}
</script>

<style scoped>
input{
  background-color: var(--primary-color);
  color: var(--text-color);
  border-radius: 10px;
  text-align: center;
}
</style>