<template>
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
});
</script>

<style scoped></style>
