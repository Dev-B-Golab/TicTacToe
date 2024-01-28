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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    const nickname = ref('')
    const router = useRouter()
    const store = useStore()

    const goToGame = () => {
      store.commit('setNickname', nickname.value)
      router.push({
        name: 'Game',
      })
    }

    return {
      nickname,
      goToGame
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