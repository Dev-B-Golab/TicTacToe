<template>
  <div class="mainLayout">
    <div class="row">
      <div class="col-12">
        <input type="text" placeholder="Nickname" v-model="nickname">
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button class="btn primaryColor mt-4" @click="goToGame">PLAY!</button>
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
      this.setNickname(this.nickname)
      this.$router.push({
        name: 'Game',
      })
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