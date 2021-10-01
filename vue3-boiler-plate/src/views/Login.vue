<template>
  <div class="container">
    <h4>Login Page</h4>

    <button @click.prevent="metamaskLogin" class="btn btn-success">
      Login with metamask
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { UserModel } from "../models/User";
import { userModule } from "../store/user";

@Options({})
export default class Login extends Vue {
  async metamaskLogin(): Promise<void> {
    try {
      const user: UserModel = await this.$moralis.Web3.authenticate();
      userModule.SET_USER(user);
      console.log(user);
      this.$router.push({ name: "Home" });
    } catch (error) {
      console.log({ error });
    }
  }
}
</script>

<style scoped></style>
