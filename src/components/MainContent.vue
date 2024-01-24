<template>
  <div class="">
    <input type="text" placeholder="Nickname" v-model="nickname">
    <button class="btn primaryColor" @click="goToGame">PLAY!</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const nickname = ref('')
    const router = useRouter()

    const goToGame = () => {
      router.push({
        name: 'Game',
        params: { nickname: nickname.value }
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