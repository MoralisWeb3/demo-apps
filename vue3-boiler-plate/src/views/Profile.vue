<template>
  <div class="container p-3">
    <div>
      <h3>Profile Page</h3>
      address: {{ user.attributes.ethAddress }}
      <pre>
      {{ user.attributes }}
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { useStore } from "vuex";

export default defineComponent({
  name: "Dashboard",
  setup() {
    const store = useStore();
    return {
      user: store.state.User.user,
    };
  },
});
</script>
