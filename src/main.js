import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

const store = createStore({
    state: {
      nickname: ''
    },
    mutations: {
      setNickname(state, nickname) {
        state.nickname = nickname
      }
    }
  })

const app = createApp(App)

app.use(router)

app.use(store)

app.mount('#app')
