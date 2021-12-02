<template>
    <button class="btn btn-danger float-end" @click.prevent="logout">
      Logout
    </button>
  <div>{{ message }}</div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      message: "Hello from ProtectedPages",
    };
  },
  methods: {
    async logout(): Promise<void> {
      await this.$moralis.User.logOut();
      this.$router.push({ name: "Login" });
    },
  },
});
</script>

<style scoped></style>
