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
import { useRoute, useRouter } from "vue-router";
import { UserModel } from "../models/User";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const $moralis = inject("moralis") as Moralis;
    const router = useRouter();
    const route = useRoute();
    async function metamaskLogin(): Promise<void> {
      try {
        const user = (await $moralis.Web3.authenticate({
          signingMessage: "Testing async",
        })) as UserModel;
        store.commit("User/setUser", user);
        if (route.query.redirect) {
          const { redirect } = route.query;
          router.push(redirect.toString());
        } else {
          router.push({ name: "Dashboard" });
        }
      } catch (error) {
        console.error({ error });
      }
    }
    return {
      metamaskLogin,
    };
  },
});
</script>

<style scoped></style>
