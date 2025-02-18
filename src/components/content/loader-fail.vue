<template>
  <div id="app">
    <section class="w-full">
      <article class="p-4 max-w-lg w-full mx-auto">
        <div class="animate-pulse grid gap-4">
          <header class="grid gap-1">
            <h1 class="bg-gray-600 h-8 w-full rounded"></h1>
            <h2 class="bg-gray-200 h-4 w-1/2 mx-auto rounded"></h2>
          </header>

          <section class="grid gap-4">
            <div v-for="n in 4" :key="n" class="grid gap-1">
              <p class="bg-gray-400 h-4 w-full rounded"></p>
              <p class="bg-gray-400 h-4 w-5/6 rounded"></p>
            </div>
          </section>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Welcome to Vue!"
    };
  },
  methods: {
    doSomething() {
      alert("Hello!");
    }
  }
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a,
button {
  color: #4fc08d;
}

button {
  background: none;
  border: solid 1px;
  border-radius: 2em;
  font: inherit;
  padding: 0.75em 2em;
}
</style>
