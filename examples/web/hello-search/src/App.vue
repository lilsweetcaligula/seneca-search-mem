<template>
  <div id="app">
    <input
      @change="changeInput">

    <div id="results">
    </div>

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },

  methods: {

    async changeInput(input) {
      let results = document.querySelector('#results')
      let query = input.target.value
      let out = await this.$main.seneca.post('sys:search,cmd:search', 
        {query, params: {prefix: true,}
      })
      let hits = out.data.hits

      for(let child of Array.from(results.children)) {
        child.remove()
      }
      for(let hit of hits) {
        let div = document.createElement('div')
        div.textContent = JSON.stringify(hit)
        results.append(div)
      }

      console.log(results, hits)
    },

  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
