<template>
  <div class="container p-3">
    <button class="btn btn-danger float-end" @click.prevent="logout">
      Logout
    </button>
    <!-- <h3>Logged In as {{ user.id }}</h3> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  methods: {
    async logout(): Promise<void> {
      await this.$moralis.User.logOut();
      this.$router.push({ name: "Login" });
    },
  },
});
</script>
