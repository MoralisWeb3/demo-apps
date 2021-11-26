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
import Moralis from "moralis/types";
import { ref } from "vue";
import { Options, Vue } from "vue-class-component";
import { UserModel } from "../models/User";
import { userModule } from "../store/user";

export default defineComponent({
  methods: {
    async logout(): Promise<void> {
      await this.$moralis.User.logOut();
      this.$router.push({ name: "Login" });
    }
  }
})
</script>
