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
    console.log({ $moralis });
    const router = useRouter();
    async function metamaskLogin(): Promise<void> {
      try {
        const user = (await $moralis.Web3.authenticate({
          signingMessage: "Testing async",
        })) as UserModel;
        console.log(user.get("ethAddress"));
        router.push({ name: "Home" });
        store.commit("user/setUser", user);
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
