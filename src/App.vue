<script setup>
console.log(import.meta.env.VITE_APP_API_BASE)
</script>
<template>
  <router-view />
</template>


<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #f5f5f5;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
</style>
