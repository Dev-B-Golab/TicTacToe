import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

const store = createStore({
    state() {
      return {
        nickname: ''
      }
    },
    mutations: {
      setNickname(state, nickname) {
        state.nickname = nickname
      }
    },
    getters: {
      getNickname(state) {
        return state.nickname;
      }
    },
  })

const app = createApp(App)

app.use(router)

app.use(store)

app.mount('#app')
