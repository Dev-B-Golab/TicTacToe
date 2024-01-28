<template>
  <div class="">
    <input type="text" placeholder="Nickname" v-model="nickname">
    <button class="btn primaryColor" @click="goToGame">PLAY!</button>
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

</style>