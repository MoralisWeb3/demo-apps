<template>
  <div class="container">
    <h4>Login Page</h4>

    <button @click.prevent="metamaskLogin" class="btn btn-success">
      Login with metamask
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "@vue/runtime-core";
import Moralis from "moralis/types";
import { useRouter } from "vue-router";
import { UserModel } from "../models/User";
import { userModule } from "../store/user";

export default defineComponent({
  setup() {
    const $moralis = inject("moralis") as Moralis;
    const router = useRouter();
    async function metamaskLogin(): Promise<void> {
      try {
        const user: UserModel = await $moralis.Web3.authenticate();
        userModule.SET_USER(user);
        router.push({ name: "Home" });
      } catch (error) {
        console.log({ error });
      }
    }
    return {
      metamaskLogin,
    };
  },
});
</script>

<style scoped></style>
