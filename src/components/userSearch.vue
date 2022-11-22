<template>
  <form @submit.prevent="searchSubmit">
    <input
      type="text"
      class="input"
      v-model="text"
      placeholder="Search User ..."
    />
  </form>
</template>

<script>
export default {
  name: "userSearch",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    searchSubmit() {
      this.$emit("search-user", this.text);
      this.text = "";
    },
  },
};
</script>

<style scoped>
.input {
  background-color: rgba(243, 220, 187, 0.886);
  border: 3px solid brown;
  outline: none;
  padding: 5px;
  text-transform: capitalize;
  width: 100%;
}
</style>
