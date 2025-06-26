<template>
  <div class="mb-4">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Search songs..."
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
/* Optional: scoped styles or use Tailwind */
</style>
