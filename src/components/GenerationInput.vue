<template>
  <input type="number" :min="min" :value="value"
    @change="onChange(($event.target as HTMLInputElement).value)">
  <button @click="$emit('update:dataValue', value)">Generate</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component({
  components: {},
  emits: ['update:dataValue'],
})

export default class GenerationInput extends Vue {
  @Prop() min!: number;
  @Prop() initialValue: number | undefined;

  dataValue: number;

  get value() {
    return this.dataValue;
  }

  mounted() {
    this.dataValue = this.initialValue ?? this.min;
  }

  onChange(value: number) {
    this.dataValue = value;
  }
}
</script>

<style scoped>
</style>
