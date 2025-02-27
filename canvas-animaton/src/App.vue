<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent<{
  // animation: ReturnType<typeof createFlip> | null;
  layout: number;
  onClick: (e: MouseEvent) => void;
}>({
  data() {
    return {
      layout: 1,
      animation: null,
    };
  },
  methods: {
    onClick() {
      this.layout = this.layout === 7 ? 1 : this.layout + 1;
      // this.animation?.flip();
    },
  },
  async mounted() {
    //
  },
});
</script>

<template>
  <canvas />
</template>

<style></style>
