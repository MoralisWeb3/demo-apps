<template>
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class ProtectedPages extends Vue {}
</script>

<style scoped></style>
