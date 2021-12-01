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
import Moralis from "../moralis";
import { useRouter } from "vue-router";
import { UserModel } from "../models/User";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const $moralis = inject("moralis") as Moralis;
    const router = useRouter();
    async function metamaskLogin(): Promise<void> {
      try {
        const user = (await $moralis.Web3.authenticate({
          signingMessage: "Testing async",
        })) as UserModel;
        console.log(user.get("ethAddress"));
        store.commit("User/setUser", user);
        router.push({ name: "Home" });
        console.log(store.state.User.user);
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
