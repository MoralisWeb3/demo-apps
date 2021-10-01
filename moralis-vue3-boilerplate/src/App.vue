<template>
  <div class="text-moralis-gray">
    <img alt="Moralis logo" src="./assets/logo.svg">
    <div class="mt-4">
      <div class="text-xl font-semibold">Moralis starter boilerplate</div>
      <div class="text-sm mt-1 text-moralis-green font-semibold">Powered by Vue.js</div>
    </div>
    <div class="mt-10">
      <template v-if="isAuthenticated">
        {{ user.get('ethAddress') }} <button @click="logout">Logout</button>
      </template>
      <template v-else>
        <button @click="login">Connect wallet</button>
      </template>
    </div>
  </div>
</template>

<script>
import { onMounted, inject, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const $moralis = inject('$moralis')

    const setUser = (payload) => store.commit('setUser', payload)
    
    const login = async () => {
      const user = await $moralis.Web3.authenticate()
      setUser(user)
    }

    const logout = async () => {
      await $moralis.User.logOut()
      setUser({})
    }

    const handleCurrentUser = () => {
      const user = $moralis.User.current()
      if (user) {
        setUser(user)
      }
    }

    onMounted(() => {
      handleCurrentUser()
    })

    return {
      login,
      logout,
      isAuthenticated: computed(() => Object.keys(store.state.user).length > 0),
      user: computed(() => store.state.user)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  box-sizing: border-box;
}
html,
body,
#app {
  height: 100%;
}

.text-center { text-align: center; }
.text-moralis-green { color: #b7e803; }
.text-moralis-gray { color: #041836; }
.mt-4 { margin-top: 20px }
.mt-1 { margin-top: 4px }
.mt-10 { margin-top: 40px }
.text-xl { font-size: 28px; }
.text-base { font-size: 16px; }
.font-semibold { font-weight: 600; }

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
